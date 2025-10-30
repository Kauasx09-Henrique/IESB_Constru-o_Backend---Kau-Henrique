const express = require ('express')
const mongoose = require ('mongoose')
const dotenv = require ('dotenv')


const app = express()

app.use(express.json())

// conectrar banco

mongoose.connect('mongodb+srv://KauaHenrique:1234@cluster0.gtjsgld.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=> {
    console.log("Conectou com banco de dados")
})
.catch(err => {
    console.log("Erro ao conectar no banco MongoDB: ", err)
})