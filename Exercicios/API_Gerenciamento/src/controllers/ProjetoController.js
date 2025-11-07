const  express = require('express');
const router = express.Router();
const ProjetoModel = require('../models/ProjetoModel');

// Validadores como intermediarios

const { validarNovoProjeto, validarID } = require('../validators/IDValidator');

// Rotas do CRUD    
// Criar
router.post('/projetos', validarNovoProjeto, async (req, res, next) => {
    const projeto = req.body;

    const projetocadastrado = await ProjetoModel.create(projeto);
    res.status(201).json(projetocadastrado);
});
// Ler
router.get('/projetos', async (req, res, next) => {
    const projetos = await ProjetoModel.find();
    res.status(200).json(projetos);
});

router.get('/projetos/:id', validarID,  async (req, res, next) => {
    const id = req.params.id;
    const projetoencontrado = await ProjetoModel.findById(id);
    if(!projetoencontrado){
        res.status(404).json({message: "Projeto não encontrado"});
    }
    return res.status(200).json(projetoencontrado);
});

// Atualizar

router.put('/projetos/:id', validarID, async (req, res, next) => {
    const id = req.params.id;
    const novasdados = req.body;
    projetoAtualizado = await ProjetoModel.findByIdAndUpdate(id, novasdados, {new: true});
    if(!projetoAtualizado){
        res.status(404).json({message: "Projeto não encontrado"});
    }
    return res.status(200).json(projetoAtualizado);
});
// Deletar

router.delete("/projetos/:id",  validarID , async (req, res, next) => {
    const id = req.params.id;
    const projetodeletado = await ProjetoModel.findByIdAndDelete(id);
    if(!projetodeletado){
        res.status(404).json({message: "Projeto não encontrado"});
    }
    return res.status(200).json(projetodeletado);
});

module.exports = router;
