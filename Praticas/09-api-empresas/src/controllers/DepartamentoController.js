const express = require("express");
const router = express.Router();

const Departamento = require("../models/DepartamentoModel");
const { validateDepartamento } = require("../validators/DepartamentoValidator");


// Listar todos os departamentos

router.get("/departamentos", async (req, res) => {
    try {
        const departamentos = await Departamento.find();
        res.json(departamentos);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar departamentos!" });
    }
});

// Cadastrar novo departamento
router.post("/departamentos", validateDepartamento, async (req, res) => {
    const { nome, descricao } = req.body;

    try {
        const novoDepartamento = new Departamento({ nome, descricao });
        await novoDepartamento.save();
        res.status(201).json({ message: "Departamento cadastrado com sucesso!", novoDepartamento });
    } catch (err) {
        res.status(500).json({ error: "Erro ao cadastrar departamento!" });
    }
});

// Atualizar departamento

router.put("/departamentos/:id", validateDepartamento, async (req, res) => {
    const { nome, descricao } = req.body;

    await Departamento.findByIdAndUpdate(
        req.params.id,
        { nome, descricao },
        { new: true }
    )
        .then((departamentoAtualizado) => {
            if (!departamentoAtualizado) {
                return res.status(404).json({ error: "Departamento não encontrado!" });
            }
            res.json({ message: "Departamento atualizado com sucesso!", departamentoAtualizado });
        })
        .catch((err) => {
            res.status(400).json({ error: "ID inválido!" });
        });
});

// Deletar departamento

router.delete("/departamentos/:id", async (req, res) => {

    await Departamento.findByIdAndDelete(req.params.id)
        .then((departamentoDeletado) => {
            if (!departamentoDeletado) {
                return res.status(404).json({ error: "Departamento não encontrado!" });
            }
            res.json({ message: "Departamento deletado com sucesso!" });
        })
        .catch((err) => {
            res.status(400).json({ error: "ID inválido!" });
        });
});

module.exports = router;

