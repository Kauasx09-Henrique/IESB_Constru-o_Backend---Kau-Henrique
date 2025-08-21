let prompt = require ('prompt-sync')()

let nome = prompt("Qual é o seu nome? ")

console.log("Olá" + "" + nome)

// improtando o modulo calculadora

let {calcularnotafinal, calcularnotaA1 , calcularnotaA2}  = require('./calculadora')


let exerciciosA1= parseFloat(prompt("Qual foi a nota do exercicios A1"))
let trabalhoA1 = parseFloat(prompt ("Qual foi a nota do exercicios A1"))
let provaA1 = parseFloat(prompt("Qual foi a nota da prova A1 ? : "))

let notaA1 = calcularnotaA1(exerciciosA1, trabalhoA1 , provaA1)


console.log("### Calculo da NOTA #1")
console.log("Nota Exercicio A1:", exerciciosA1)
console.log("nota trabalho A1 :", trabalhoA1)
console.log("Nota Prova A1: ", provaA1)

console.log("Nota calculada: ", notaA1)
