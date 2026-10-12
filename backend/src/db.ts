import { Pool } from "pg";
import { loadConfig } from "./config";

const config = loadConfig();
export const pool = new Pool({ connectionString: process.env.DATABASE_URL,
                    ssl: {rejectUnauthorized: false }} );
