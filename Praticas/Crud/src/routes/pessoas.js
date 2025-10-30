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

router.post("/pessoas", (req, res, next) => {
    const { nome, cpf, email, dataNascimento } = req.body
    if (!nome || !cpf || !email || !dataNascimento) {
        return res.status(400).json({ error: "Nome, cpf, email e DataNascimento são obrigatórios!!!" })
    }
    // validar

    if (listaPessoas.some(pessoa => pessoa.cpf == cpf)) {
        return res.status(409).json({ error: "CPF já cadastrado!!!" })
    }
    const novaPessoas = {
        id: Date.now(),
        nome,
        cpf,
        email,
        dataNascimento
    }

    listaPessoas.push(novaPessoas)
    res.status(201).json({ message: "Pessoas cadastrada com sucessor", novaPessoas })
})

router.put("/pessoas/:id", (req, res, next) => {
    const id = req.params.id
    const pessoa = listaPessoas.find(pessoa => pessoa.id == id)

    if (!pessoa) {
        return res.status(404).json({ error: "Nenhuma pessoa encontrada" })
    }
    const { nome, email, dataNascimento } = req.body

    if (!nome || !email || !dataNascimento) {
        return res.status(400).json({ error: "nome, email, dataNascimento são obrigatorios!!" })
    }

    pessoa.nome = nome
    pessoa.email = email
    pessoa.dataNascimento = dataNascimento

    res.json({ message: " Pessoa atualizada com sucesso!!!", pessoa })
})
router.delete("/pessoas/:id", (req, res, next) => {
    const id = req.params.id
    const pessoa = listaPessoas.find(pessoa => pessoa.id == id)

    if (!pessoa) {
        return res.status(404).json({ error: "ID associada a pessoa não encontrado!!!" })
    }
    listaPessoas = listaPessoas.filter(pessoa => pessoa.id != id)
    res.status(200).json({ error: " id Excluido com sucesso" })

})





module.exports = router