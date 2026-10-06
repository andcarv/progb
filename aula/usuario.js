// Enumeração para o papel do usuário
export var Role;
(function (Role) {
    Role["Admin"] = "admin";
    Role["Usuario"] = "usuario";
})(Role || (Role = {}));
// Classe Usuário
export class Usuario {
    id;
    name;
    email;
    role;
    constructor(id, name, email, role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getEmail() {
        return this.email;
    }
    setEmail(email) {
        this.email = email;
    }
    getRole() {
        return this.role;
    }
    setRole(role) {
        this.role = role;
    }
}
