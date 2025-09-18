
// import Routes 
// import router from "./src/routes/pessoas"


const express = require("express")
const app = express()

const cors = require('cors')

app.use(cors())
app.use(express.json())


app.listen(3000, () => {
    console.log(`
        ┌───────────────────────────────────────────────┐
        │                                               │
        │       Servidor Rodando na porta 3000          │
        │                                               │
        │        🎉  Meus Parabéns! 🎉                 │
        │                                               │
        │       http://localhost:3000                   │
        │                                               │
        └───────────────────────────────────────────────┘`);
})


const pessoasRouter = require('./src/routes/pessoas')
app.use(pessoasRouter)

