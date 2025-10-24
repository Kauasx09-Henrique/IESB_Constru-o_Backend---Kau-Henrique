
const express = require('express')
const router = express.Router()
const PessoaModel = require('../models/PessoaModel')

 // Validadores como intermediarios

const { validarNovapessoa } = require('../validators/PessoaValidator')
const { validarID } = require('../validators/IDValidator')


// Rotas do CRUD
// Create

router.post('/pessoas', validarNovapessoa, async (req, res, next) => {
    const pessoa = req.body

     const pessoacadastrada = await PessoaModel.create(pessoa)
     res.status(201).json(pessoacadastrada)
    
})

// Read

router.get('/pessoas', async (req, res, next) => {
    const pessoas = await PessoaModel.find()
    res.status(200).json(pessoas)
})



router.get('/pessoas/:id', validarID,  async (req, res, next) => {
    const id = req.params.id
    const pessoaencontrada = await PessoaModel.findById(id)
    if(!pessoaencontrada){
        res.status(404).json({message: "Pessoa não encontrada"})
    }
    return res.status(200).json(pessoaencontrada)
})


// Update

router.put('/pessoas/:id', validarID, async (req, res, next) => {
    const id = req.params.id
    const novasdados = req.body
    pessoaAtualizada = await PessoaModel.findByIdAndUpdate(id, novasdados, {new: true})
    if(!pessoaAtualizada){
        res.status(404).json({message: "Pessoa não encontrada"})
    }
    return res.status(200).json(pessoaAtualizada)
})
''
// Delete

router.delete("/pessoas/:id",  validarID , async (req, res, next) => {
    const id = req.params.id
    const pessoadeletada = await PessoaModel.findByIdAndDelete(id)
    if(!pessoadeletada){
        res.status(404).json({message: "Pessoa não encontrada"})
    }
    return res.status(200).json({message: "Pessoa deletada com sucesso"})
})


module.exports = router