const express = require('express')
const router = express.Router()
const LivroModel = require('../models/LivroModel')

// Validadores como intermediarios
const { validarNovoLivro, validarID } = require('../validators/IDValidator');

// Rotas do CRUD

// Criar

router.post('/livros', validarNovoLivro, async (req, res, next) => {
    const livro = req.body

     const livrocadastrado = await LivroModel.create(livro)
     res.status(201).json(livrocadastrado)
    
})

// Ler

router.get('/livros', async (req, res, next) => {
    const livros = await LivroModel.find()
    res.status(200).json(livros)
})

router.get('/livros/:id', validarID,  async (req, res, next) => {
    const id = req.params.id
    const livroencontrado = await LivroModel.findById(id)
    if(!livroencontrado){
        res.status(404).json({message: "Livro não encontrado"})
    }
    return res.status(200).json(livroencontrado)
})

// Atualizar

router.put('/livros/:id', validarID, async (req, res, next) => {
    const id = req.params.id
    const novasdados = req.body
    livroAtualizado = await LivroModel.findByIdAndUpdate(id, novasdados, {new: true})
    if(!livroAtualizado){
        res.status(404).json({message: "Livro não encontrado"})
    }
    return res.status(200).json(livroAtualizado)
})

// Deletar

router.delete("/livros/:id",  validarID , async (req, res, next) => {
    const id = req.params.id
    const livrodeletado = await LivroModel.findByIdAndDelete(id)
    if(!livrodeletado){
        res.status(404).json({message: "Livro não encontrado"})
    }
    return res.status(200).json(livrodeletado)
})

module.exports = router