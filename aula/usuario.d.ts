export declare enum Role {
    Admin = "admin",
    Usuario = "usuario"
}
export declare class Usuario {
    private id;
    private name;
    private email;
    private role;
    constructor(id: number, name: string, email: string, role: Role);
    getId(): number;
    setId(id: number): void;
    getName(): string;
    setName(name: string): void;
    getEmail(): string;
    setEmail(email: string): void;
    getRole(): Role;
    setRole(role: Role): void;
}
//# sourceMappingURL=usuario.d.ts.map