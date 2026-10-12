import { Request, Response, NextFunction } from "express";

interface AppError extends Error {
  statusCode?: number;
  code?: string;
}

export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err);

  const statusCode = err.statusCode ?? 500;
  const code = err.code ?? "INTERNAL_ERROR";
  const message = err.message ?? "Erro interno do servidor.";

  res.status(statusCode).json({
    error: { code, message },
  });
}


/*

export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype); // Mantém o protótipo correto
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Registro não encontrado.") {
    super(message, 404);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}
  
// src/shared/middlewares/error.middleware.ts
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppError } from '../errors/AppError';

export const errorMiddleware: ErrorRequestHandler = (
  error: Error & Partial<AppError>,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  // Se o erro foi gerado intencionalmente por nós (AppError)
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  // Log do erro interno que o usuário não deve ver os detalhes na produção
  console.error(' [Internal Error]:', error);

  // Erros inesperados ou falhas brutas do banco de dados
  return res.status(500).json({
    status: 'error',
    message: 'Erro interno no servidor.',
  });
};


// src/modules/eventos/evento.service.ts
import { BadRequestError, NotFoundError } from '../../shared/errors/AppError';
import { Evento, CreateEventoDTO } from './evento.entity';
import { EventoRepository } from './evento.repository';

export class EventoService {
  constructor(private repository: EventoRepository) {}

  async create(data: CreateEventoDTO): Promise<Evento> {
    if (!data.title || data.title.trim() === '') {
      throw new BadRequestError("O título do evento é obrigatório.");
    }
    return await this.repository.save(data);
  }

  async getById(id: string): Promise<Evento> {
    const evento = await this.repository.findById(id);
    if (!evento) {
      throw new NotFoundError("Evento não encontrado.");
    }
    return evento;
  }
}

// src/server.ts
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { eventoRoutes } from './modules/eventos/evento.routes';
import { errorMiddleware } from './shared/middlewares/error.middleware';

const app = express();

// Middlewares Globais Essenciais
app.use(helmet());
app.use(cors());
app.use(express.json());

// Acoplamento de Módulos (Rotas)
app.use('/eventos', eventoRoutes);

// Middleware centralizado de tratamento de erros (Sempre por último)
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando ativamente na porta ${PORT}`);
});

*/
