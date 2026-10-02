import 'dotenv/config'; 
import { Client } from "pg";
import fs from "fs";
import path from "path";

async function migrate() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
    rejectUnauthorized: false // Permite conectar sem validar o certificado raiz da AWS
  }
  });
  await client.connect();

  //const migrationsDir = path.join(__dirname, "migrations");
  const migrationsDir = path.join(import.meta.dirname, "migrations");
  const files = fs.readdirSync(migrationsDir).sort();

  for (const file of files) {
    if (!file.endsWith(".sql")) continue;
    const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
    console.log(`Executando: ${file}`);
    await client.query(sql);
  }

  console.log("Migrations concluídas.");
  await client.end();
}

migrate().catch((err) => {
  console.error("Erro ao executar migrations:", err.message);
  process.exit(1);
});