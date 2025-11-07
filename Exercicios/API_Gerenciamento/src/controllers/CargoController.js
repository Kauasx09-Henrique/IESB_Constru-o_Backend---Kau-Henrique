const express = require('express');
const router = express.Router();
const CargoModel = require('../models/CargoModel');

// Validadores como intermediarios
const { validarNovoCargo, validarID } = require('../validators/IDValidator');

// Rotas do CRUD

// Criar

router.post('/cargos', validarNovoCargo, async (req, res, next) => {
    const cargo = req.body;

    const cargocadastrado = await CargoModel.create(cargo);
    res.status(201).json(cargocadastrado);
});

// Ler

router.get('/cargos', async (req, res, next) => {
    const cargos = await CargoModel.find();
    res.status(200).json(cargos);
});

router.get('/cargos/:id', validarID,  async (req, res, next) => {
    const id = req.params.id;
    const cargoencontrado = await CargoModel.findById(id);
    if(!cargoencontrado){
        res.status(404).json({message: "Cargo não encontrado"});
    }
    return res.status(200).json(cargoencontrado);
});

// Atualizar

router.put('/cargos/:id', validarID, async (req, res, next) => {    
    const id = req.params.id;
    const novasdados = req.body;
    cargoAtualizado = await CargoModel.findByIdAndUpdate(id, novasdados, {new: true});
    if(!cargoAtualizado){
        res.status(404).json({message: "Cargo não encontrado"});
    }
    return res.status(200).json(cargoAtualizado);
});

// Deletar
router.delete("/cargos/:id",  validarID , async (req, res, next) => {   
    const id = req.params.id;
    const cargodeletado = await CargoModel.findByIdAndDelete(id);
    if(!cargodeletado){
        res.status(404).json({message: "Cargo não encontrado"});
    }
    return res.status(200).json(cargodeletado);
});

module.exports = router;