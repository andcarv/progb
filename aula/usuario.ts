// Enumeração para o papel do usuário
export enum Role {
    Admin = 'admin',
    Usuario = 'usuario'
}


// Classe Usuário
export class Usuario {

    private id: number;
    private name: string;
    private email: string;
    private role: Role;
    
    public constructor(id:number, name:string, email:string, role:Role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;

    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number){
        this.id = id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string){
        this.name = name;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string){
        this.email = email;
    }

    public getRole(): Role {
        return this.role;
    }

    public setRole(role: Role){
        this.role = role;
    }

}
