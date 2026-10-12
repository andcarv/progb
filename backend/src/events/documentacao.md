# Documentação Técnica: Desenvolvimento de API Web com Express, TypeScript e PostgreSQL

Esta documentação compila as decisões arquiteturais, padrões de design de código e soluções de problemas discutidos para a construção de um CRUD estruturado utilizando o ecossistema Node.js.

---

## 1. Arquitetura da Aplicação (Padrão de Camadas)

A aplicação foi estruturada seguindo o princípio de **Separação de Conceitos (Separation of Concerns)**, dividindo-se em camadas bem definidas onde a inteligência de negócios é isolada da infraestrutura técnica.

```text
 [Mundo Externo / Requisição HTTP]
                 │
          ┌──────▼──────┐
          │   Routes    │ ──> Mapeamento de Endpoints e Métodos HTTP
          └─────────────┘
          ┌─────────────┐
          │ Controller  │ ──> Tradução técnica: lê HTTP (req, res), delega ao Service
          └─────────────┘
          ┌─────────────┐
          │   Service   │ ──> O Coração: Validações de Domínio e Regras de Negócio
          └─────────────┘
          ┌─────────────┐
          │ Repository  │ ──> Comunicação com a Infraestrutura: Consultas SQL (pg)
          └─────────────┘
                 │
          ┌──────▼──────┐
          │ PostgreSQL  │ ──> Banco de Dados Relacional
          └─────────────┘
```

### Papel das Camadas e Convenção de Nomes
* **Routes:** Publica e expõe os caminhos públicos da API.
* **Controller (`getAll`):** Lê o protocolo HTTP (`req`, `res`, `next`). Captura cabeçalhos, parâmetros e corpos de requisição e despacha respostas.
* **Service (`listAll`):** Agnóstico a frameworks. Pensa puramente nas regras operacionais e humanas da empresa. Recebe e retorna estruturas fortemente tipadas da Entidade (`Event[]`).
* **Repository (`findAll`):** Traduz as intenções da aplicação em instruções de banco de dados (`SELECT`, `INSERT`). O método `pool.query` da biblioteca `pg` retorna uma instância de `QueryResult`, cujo atributo `.rows` é um **array de objetos JavaScript nativos**, que são então mapeados para objetos de domínio.

---

## 2. A Camada Entity (Entidade)

A **Entity** representa o modelo de domínio do software. Optou-se por utilizar o padrão clássico corporativo da Orientação a Objetos (POO), encapsulando os dados com propriedades privadas (`private`) combinadas com métodos acessores (`get` e `set`) para validação rigorosa de consistência interna.

### `src/events/event.entity.ts`
```typescript
export interface EventProps {
  title: string;
  description: string;
  location: string;
  date: Date;
  capacity: number;
  organizerId: number;
}

export class Event {
  private _id: number;
  private _title: string;
  private _description: string;
  private _location: string;
  private _date: Date;
  private _capacity: number;
  private _createdAt: Date;
  private _organizerId: number;

  constructor(props: EventProps, id?: number, createdAt?: Date) {
    this._id = id ?? 0; // 0 sinaliza que o registro é novo e não foi persistido
    this._createdAt = createdAt ?? new Date();
    
    this._title = props.title;
    this._description = props.description;
    this._location = props.location;
    this._date = props.date;
    this._capacity = props.capacity;
    this._organizerId = props.organizerId;
  }

  // --- GETTERS ---
  public get id(): number { return this._id; }
  public get title(): string { return this._title; }
  public get description(): string { return this._description; }
  public get location(): string { return this._location; }
  public get date(): Date { return this._date; }
  public get capacity(): number { return this._capacity; }
  public get createdAt(): Date { return this._createdAt; }
  public get organizerId(): number { return this._organizerId; }

  // --- SETTERS COM VALIDAÇÕES ---
  public set title(value: string) { this._title = value; }
  public set description(value: string) { this._description = value; }
  public set location(value: string) { this._location = value; }
  public set date(value: Date) { this._date = value; }
  
  public set capacity(value: number) {
    if (value < 0) {
      throw new Error("A capacidade do evento não pode ser negativa.");
    }
    this._capacity = value;
  }
  
  public set organizerId(value: number) { this._organizerId = value; }

  // Garante a limpeza do JSON gerado automaticamente pelo res.json()
  public toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      location: this.location,
      date: this.date,
      capacity: this.capacity,
      createdAt: this.createdAt,
      organizerId: this.organizerId
    };
  }
}
```

> **Nota de Manutenibilidade:** O uso da interface `EventProps` no construtor segue o padrão de *Parâmetros Nomeados*, garantindo tipagem forte, impedindo inversão acidental de argumentos e facilitando a expansão futura da classe. O uso de propriedades privadas nativas do JavaScript (`#`) foi descartado por gerar incompatibilidades potenciais com ferramentas e ORMs do ecossistema Node.js.

---

## 3. Implementação Prática: Fluxo Vertical `GET /`

### Repositório (`src/events/repository.ts`)
```typescript
import { pool } from "../db";
import { Event } from "./event.entity";

export async function findAll(): Promise<Event[]> {
  const result = await pool.query(`
    SELECT e.id, e.title, e.description, e.location, e.date, e.capacity, e.created_at, e.organizer_id
    FROM events e
    ORDER BY e.date ASC
  `);

  return result.rows.map((row) => {
    return new Event(
      {
        title: row.title,
        description: row.description,
        location: row.location,
        date: new Date(row.date),
        capacity: Number(row.capacity),
        organizerId: Number(row.organizer_id),
      },
      Number(row.id),
      new Date(row.created_at)
    );
  });
}
```

### Serviço (`src/events/event.service.ts`)
```typescript
import { Event } from "./event.entity";
import * as eventRepository from "./repository";

export class EventService {
  async listAll(): Promise<Event[]> {
    return await eventRepository.findAll();
  }
}
```

### Controlador (`src/events/event.controller.ts`)
```typescript
import { Request, Response, NextFunction } from "express";
import { EventService } from "./event.service";
import { Event } from "./event.entity";

const eventsService = new EventService();

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const events: Event[] = await eventsService.listAll();
    // res.json() infere automaticamente o status 200 e executa a serialização JSON textória
    return res.json(events);
  } catch (err) {
    next(err); // O controller NUNCA altera o status do erro; delega para o ErrorHandler
  }
}
```

---

## 4. Gerenciamento Global de Exceções e Tratamento de Erros

O tratamento de exceções é centralizado em middlewares acionados através do callback de controle `next(err)`.

### Tratador Central de Erros (`src/errors/errorHandler.ts`)
```typescript
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

interface AppError extends Error {
  statusCode?: number;
  code?: string;
}

export const errorHandler: ErrorRequestHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  let statusCode = err.statusCode ?? 500;
  let code = err.code ?? "INTERNAL_ERROR";
  let message = err.message ?? "Erro interno do servidor.";

  // Detecção e tratamento de restrições estritas do PostgreSQL (driver pg) via SQLSTATE
  if (err.code && typeof err.code === "string" && err.code.length === 5) {
    statusCode = 400;
    switch (err.code) {
      case "23505":
        code = "DUPLICATE_ENTRY";
        message = "Já existe um registro com os dados informados.";
        break;
      case "23503":
        code = "FOREIGN_KEY_VIOLATION";
        message = "O registro referenciado não existe no sistema.";
        break;
      default:
        code = `DATABASE_ERROR_${err.code}`;
        message = "Restrição de dados no banco de dados.";
    }
  }

  console.error(" [Erro Capturado]:", err);

  return res.status(statusCode).json({
    error: { code, message },
  });
};
```

### Tratamento de Rotas Inexistentes (404 Not Found)
Middleware posicionado imediatamente após os endpoints válidos para capturar requisições sem correspondência.

```typescript
// src/middlewares/notFound.middleware.ts
import { Request, Response, NextFunction } from "express";

export function notFoundMiddleware(req: Request, res: Response, next: NextFunction) {
  const error = new Error(`Rota não encontrada: ${req.method} ${req.originalUrl}`);
  (error as any).statusCode = 404;
  (error as any).code = "ROUTE_NOT_FOUND";
  next(error);
}
```

---

## 5. Protocolo HTTP, Middlewares e Semântica REST

* **`Request`**: Subclasse de `http.IncomingMessage`. Stream de leitura que expõe o `req.body` (payload parseado), `req.params` (parâmetros dinâmicos da URL) e `req.headers` (metadados).
* **`Response`**: Subclasse de `http.ServerResponse`. Stream de escrita que expõe `res.status()` e `res.json()` para serialização final e fechamento do socket de rede TCP.
* **`NextFunction`**: Padrão de callback baseado em *Chain of Responsibility* usado para avançar na fila de middlewares ou desviar para o modo de tratamento de erros (`next(err)`).

### Resolução de Bugs Frequentes: `TypeError: argument handler must be a function`
Causado por registrar referências nulas ou indefinidas (`undefined`) no roteador. Comum ao passar métodos de instâncias de classes sem envelopar em uma *arrow function*, quebrando o escopo do operador `this`:
```typescript
