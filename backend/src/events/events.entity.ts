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
   this._id = id ?? 0; //Pode vir do banco, mas caso ainda não tenho sido inserido e setado como 0
   this._createdAt = createdAt ?? new Date();//Se valor não existe, pega a data atual
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


 // --- SETTERS ---
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
}
