import {Usuario, Role} from  './usuario.js';

let title: string = 'a';
let description: string = 'b';
let locations:string  = 'c';
let data = new Date();
let capaticy: number = 1000;

const user = new Usuario(1,'André','andre@dcomp.ufs.br',Role.Admin);

console.log('Título: ' + title);

console.log(user.getName());



let evento: [string, number, boolean];
evento = ['Hackathon do DCOMP', 45, true];


let evento2: [string, string, string, Date, number];
evento2 = ['a', 'b', 'c', new Date(), 1000];

console.log(evento2[0]);

type eventoObj = {
	nome_evento: string;
	capacidade: number;
	inscricoesAbertas: boolean;
};

let evento3: eventoObj = {nome_evento: 'Hackathon do DCOMP', capacidade: 1000, inscricoesAbertas:true};

console.log(evento3);

/**
 * Cálculo das vagas disponíveis no evento
 * @param capacidade Capacidade máxima do evento
 * @param confirmados Número de confirmados
 * @returns Vagas disponíveis
 */
function calcularVagasRestantes(capacidade: number, confirmados: number = 0): number {
    return capacidade - confirmados;
}

let calcularVagasRestantesArrow = (capacidade: number, confirmados: number = 0): number => {
    return capacidade - confirmados;
}

console.log(calcularVagasRestantesArrow(10000));
console.log(calcularVagasRestantes(1000));

let participantesAprovados: number = 0;
const vagas: number = 5;

while (participantesAprovados < vagas) {
    participantesAprovados++;
    console.log(`Aprovando participante da lista de espera... Total: ${participantesAprovados}`);
}


// Inicialização; Condição de parada; Incremento
for (let participantesAprovados: number = 0; participantesAprovados < vagas; participantesAprovados++) {
    console.log(`Aprovando participante... Total: ${participantesAprovados + 1}`);
}

type minhaFuncao = (arg0: number, arg1:number) => number;

function nomeFuncao(f: minhaFuncao) {
    console.log(f.name);
}

nomeFuncao(calcularVagasRestantes);


let arr: string[][] = [[]];

