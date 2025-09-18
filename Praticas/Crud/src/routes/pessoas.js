const express = require('express')
const router = express.Router()


// Lista de pessoas

let listaPessoas = [
    {
        id: 1,
        nome: "Kauã",
        cpf: "077.111.111.12",
        email: "k@gmail.com",
        dataNascimento: "01/02/2001"

    },
    {
        id: 2,
        nome: "Pedro",
        cpf: "023.111.111.12",
        email: "p@gmail.com",
        dataNascimento: "01/07/2005"
    },
]

router.get('/pessoas', (req, res, next) => {
    res.json(listaPessoas)
})
// Mapear a logica

router.get('/pessoas/:id', (req, res, next) => {
    const id = req.params.id
    const pessoa = listaPessoas.find(pessoa => pessoa.id == id)

    if (!pessoa) {
        return res.status(404).json({ error: "Pessoa não encontrada!!!" })

    }
    res.json(pessoa)
})




module.exports = router