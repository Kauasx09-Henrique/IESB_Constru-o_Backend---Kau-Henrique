const express = require('express')
const router = express.Router()
const FuncionarioModel = require('../models/FuncionarioModel')
const { validarNovoFuncionario, validarID } = require('../validators/IDValidator')

router.post('/funcionarios', validarNovoFuncionario, async (req, res) => {
  const funcionario = req.body
  const funcionarioCadastrado = await FuncionarioModel.create(funcionario)
  res.status(201).json(funcionarioCadastrado)
})

router.get('/funcionarios', async (req, res) => {
  const funcionarios = await FuncionarioModel.find()
  res.status(200).json(funcionarios)
})

router.get('/funcionarios/:id', validarID, async (req, res) => {
  const id = req.params.id
  const funcionarioEncontrado = await FuncionarioModel.findById(id)
  if (!funcionarioEncontrado) {
    return res.status(404).json({ message: 'Funcionário não encontrado' })
  }
  res.status(200).json(funcionarioEncontrado)
})

router.put('/funcionarios/:id', validarID, async (req, res) => {
  const id = req.params.id
  const novosDados = req.body
  const funcionarioAtualizado = await FuncionarioModel.findByIdAndUpdate(id, novosDados, { new: true })
  if (!funcionarioAtualizado) {
    return res.status(404).json({ message: 'Funcionário não encontrado' })
  }
  res.status(200).json(funcionarioAtualizado)
})

router.delete('/funcionarios/:id', validarID, async (req, res) => {
  const id = req.params.id
  const funcionarioDeletado = await FuncionarioModel.findByIdAndDelete(id)
  if (!funcionarioDeletado) {
    return res.status(404).json({ message: 'Funcionário não encontrado' })
  }
  res.status(200).json(funcionarioDeletado)
})

module.exports = router
