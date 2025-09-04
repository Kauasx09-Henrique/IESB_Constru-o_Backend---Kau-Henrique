const express = require('express')

// Crio uma instância
const app = express()
const porta = 3000 

// Middleware de log
app.use((req, res, next) => {
    console.log("TIME: ", new Date().toLocaleString())
    console.log("MÉTODO: ", req.method)
    console.log("ROTA: ", req.url)
    next()
})

// Rota de teste
app.get('/teste', (req, res, next) => {
    res.send("Resposta!!!!!")
})

// Rota de pessoas
app.get('/pessoas', (req, res, next) => {
    const pessoas = [
        {
            id: 1,
            nome: "Pedro",
            idade: 18
        }
    ]
    console.log("Pessoas")
    res.json(pessoas) // <- envia a resposta em JSON
})

// Inicializando servidor
app.listen(porta, () => {
    console.log(`Aplicação rodando em http://localhost:${porta}`)
})
