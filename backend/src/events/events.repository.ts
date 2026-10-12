import { pool } from "../db";
import { Event } from "./events.entity";

export async function findAll(){
  const result = await pool.query(`
    SELECT
      e.id,
      e.title,
      e.description,
      e.location,
      e.date,
      e.capacity,
      e.created_at,
      e.organizer_id
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