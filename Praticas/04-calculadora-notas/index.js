const express = require('express')
const app = express()

app.use(express.json()) // precisa para ler JSON no body

app.use((req, res, next) => {
    console.log("########### --- ##############")
    console.log("TEMPO:", new Date().toLocaleString())
    console.log("MÉTODO:", req.method)
    console.log("ROTA:", req.url)
    next()
})

app.get('/nome', (req, res, next) => {
    const primeiroNome = req.body.primeiroNome 
    const sobreNome = req.body.sobreNome
    res.send("Olá " + primeiroNome + " " + sobreNome + "!!!")
    console.log(primeiroNome, sobreNome)
})

app.listen(3000, () => {
    console.log("Aplicativo rodando em http://localhost:3000")
})
