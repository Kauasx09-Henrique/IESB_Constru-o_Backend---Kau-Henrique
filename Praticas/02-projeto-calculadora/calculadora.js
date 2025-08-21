console.log("Rodando meu primeiro projeto em node");

// let nome = "Kauã";
// let sobre = "Henrique"

// console.log("Nome completo eh", nome +  " " + sobre  );

// let ano = 2005


// const idadeatual = (ano) => new Date().getFullYear() - ano

// console.log("sua idade eh", idadeatual(ano))

// let anovelho =2075

// const idadevelha = (ano, anovelho) =>  anovelho - ano
// console.log("sua idadem em 2075", idadevelha(ano, anovelho))


// let exercicios = 0.5;
// let trabalho = 0.5;
// let prova = 2;
// let notas = 1;

// const notac = exercicios + trabalho + prova + notas;
// console.log("Suas notas total são:", notac);


// if (notac >= 9) {
//     console.log("Parabéns, menção máxima!", notac);
// } else if (notac >= 7) {
//     console.log("Parabéns, sua menção é boa:", notac);
// } else if (notac >= 5) {
//     console.log("Parabéns, você passou com a média mínima:", notac);
// } else {
//     console.log("Infelizmente você não atingiu a média:", notac);
// }




function calcularnotaA1(exercicios, trabalho, prova){
    return exercicios + trabalho + prova
}
function calcularnotaA2(exercicios, trabalho, prova){
    return exercicios + trabalho + prova
}

function calcularnotafinal(notaA1, notaA2){
    return(notaA1 * 0.4) + (notaA2 * 0.6)
}
// exportando funções

module.exports = {
    calcularnotaA1,
    calcularnotaA2,
    calcularnotafinal,
}