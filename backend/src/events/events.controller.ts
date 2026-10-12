import { Request, Response, NextFunction } from "express";
import * as eventsService from "./events.service";
import { Event } from "./events.entity";



export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    // O controller recebe o array de objetos da classe Event
      const events: Event[] = await eventsService.listAll();
      
      // Aqui ocorre a conversão técnica para JSON e o envio pela rede
      res.json(events);

  } catch (err) {
    next(err);
  }
}

