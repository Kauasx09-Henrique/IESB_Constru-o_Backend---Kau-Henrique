const express = require('express');
const router = express.Router();
const TarefaModel = require('../models/TarefaModel');

// Validadores como intermediarios

const { validarNovaTarefa, validarID } = require('../validators/IDValidator');

// Rotas do CRUD

// Criar

router.post('/tarefas', validarNovaTarefa, async (req, res, next) => {
    const tarefa = req.body;

    const tarefacadastrada = await TarefaModel.create(tarefa);
    res.status(201).json(tarefacadastrada);
});

// Ler

router.get('/tarefas', async (req, res, next) => {
    const tarefas = await TarefaModel.find();
    res.status(200).json(tarefas);
});

router.get('/tarefas/:id', validarID,  async (req, res, next) => {
    const id = req.params.id;
    const tarefaencontrada = await TarefaModel.findById(id);
    if(!tarefaencontrada){
        res.status(404).json({message: "Tarefa não encontrada"});
    }
    return res.status(200).json(tarefaencontrada);
});

// Atualizar

router.put('/tarefas/:id', validarID, async (req, res, next) => {
    const id = req.params.id;
    const novasdados = req.body;
    tarefasAtualizada = await TarefaModel.findByIdAndUpdate(id, novasdados, {new: true});
    if(!tarefasAtualizada){
        res.status(404).json({message: "Tarefa não encontrada"});
    }
    return res.status(200).json(tarefasAtualizada);
});

router.delete("/tarefas/:id",  validarID , async (req, res, next) => {
    const id = req.params.id;
    const tarefadeletada = await TarefaModel.findByIdAndDelete(id);
    if(!tarefadeletada){
        res.status(404).json({message: "Tarefa não encontrada"});
    }
    return res.status(200).json(tarefadeletada);
})

module.exports = router;