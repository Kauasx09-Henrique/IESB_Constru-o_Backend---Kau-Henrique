const express = require('express');
const router = express.Router();
const DepartamentoModel = require('../models/DepartamentoModel');

// Validadores como intermediarios

const { validarNovoDepartamento, validarID } = require('../validators/IDValidator');

// Rotas do CRUD

// Criar
router.post('/departamentos', validarNovoDepartamento, async (req, res, next) => {
    const departamento = req.body;

    const departamentocadastrado = await DepartamentoModel.create(departamento);
    res.status(201).json(departamentocadastrado);
});

// Ler

router.get('/departamentos', async (req, res, next) => {
    const departamentos = await DepartamentoModel.find();
    res.status(200).json(departamentos);
});

router.get('/departamentos/:id', validarID, async (req, res, next) => {
    const id = req.params.id
    const departamentoencontrado = await DepartamentoModel.findById(id)
    if(!departamentoencontrado){
        res.status(404).json({message: "Departamento não encontrado"});
    }
    return res.status(200).json(departamentoencontrado)
});























// Atualizar
router.put('/departamentos/:id', validarID, async (req, res, next) => {
    const id = req.params.id;
    const novasdados = req.body;
    departamentoAtualizado = await DepartamentoModel.findByIdAndUpdate(id, novasdados, {new: true});
    if(!departamentoAtualizado){
        res.status(404).json({message: "Departamento não encontrado"});
    }
    return res.status(200).json(departamentoAtualizado);
});

// Deletar

router.delete("/departamentos/:id",  validarID , async (req, res, next) => {
    const id = req.params.id;
    const departamentodeletado = await DepartamentoModel.findByIdAndDelete(id);
    if(!departamentodeletado){
        res.status(404).json({message: "Departamento não encontrado"});
    }
    return res.status(200).json(departamentodeletado);
});

module.exports = router;