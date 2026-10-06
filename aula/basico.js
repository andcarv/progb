import { Usuario, Role } from './usuario.js';
let title = 'a';
let description = 'b';
let locations = 'c';
let data = new Date('2026-10-01');
let capaticy = 1000;
console.log(data);
const user = new Usuario(1, 'André', 'andre@dcomp.ufs.br', Role.Admin);
console.log('Título: ' + title);
console.log(user.getName());
let evento;
evento = ['Hackathon do DCOMP', 45, true];
let evento2;
evento2 = ['a', 'b', 'c', new Date(), 1000];
console.log(evento2[0]);
let evento3 = { nome_evento: 'Hackathon do DCOMP', capacidade: 1000, inscricoesAbertas: true };
console.log(evento3);
/**
 * Cálculo das vagas disponíveis no evento
 * @param capacidade Capacidade máxima do evento
 * @param confirmados Número de confirmados
 * @returns Vagas disponíveis
 */
function calcularVagasRestantes(capacidade, confirmados = 0) {
    return capacidade - confirmados;
}
let calcularVagasRestantesArrow = (capacidade, confirmados = 0) => {
    return capacidade - confirmados;
};
console.log(calcularVagasRestantesArrow(10000));
console.log(calcularVagasRestantes(1000));
let participantesAprovados = 0;
const vagas = 5;
while (participantesAprovados < vagas) {
    participantesAprovados++;
    console.log(`Aprovando participante da lista de espera... Total: ${participantesAprovados}`);
}
// Inicialização; Condição de parada; Incremento
for (let participantesAprovados = 0; participantesAprovados < vagas; participantesAprovados++) {
    console.log(`Aprovando participante... Total: ${participantesAprovados + 1}`);
}
function nomeFuncao(f) {
    console.log(f.name);
}
nomeFuncao(calcularVagasRestantes);
let arr = [[]];
