import * as eventsRepository from "./events.repository";

export async function listAll() {
  return eventsRepository.findAll();
}


/*import { EventoRepository } from "./evento.repository";

export class EventoService {
  constructor(private repository: EventoRepository) {}

  async listAll(): Promise<Event[]> {
    // Retorna o array de instâncias tipadas para quem o chamou
    const eventos = await this.repository.findAll();
    return eventos;
  }
}*/