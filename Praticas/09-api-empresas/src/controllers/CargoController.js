const express = require("express");
const router = express.Router();

const Cargo = require("../models/CargoModel");
const { validateCargo } = require("../validators/CargoValidator");

// Listar todos os cargos

router.get("/cargos", async (req, res) => {
    try {
        const cargos = await Cargo.find();
        res.json(cargos);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar cargos!" });
    }
});

// Cadastrar novo cargo

router.post("/cargos", validateCargo, async (req, res) => {
    const { nome, descricao, salario } = req.body;

    try {
        const novoCargo = new Cargo({ nome, descricao, salario });
        await novoCargo.save();
        res.status(201).json({ message: "Cargo cadastrado com sucesso!", novoCargo });
    } catch (err) {
        res.status(500).json({ error: "Erro ao cadastrar cargo!" });
    }
});

// Atualizar cargo
router.put("/cargos/:id", validateCargo, async (req, res) => {
    const { nome, descricao, salario } = req.body;

    try {
        const cargoAtualizado = await Cargo.findByIdAndUpdate(
            req.params.id,
            { nome, descricao, salario },
            { new: true }
        );
        if (!cargoAtualizado) return res.status(404).json({ error: "Cargo não encontrado!" });
        res.json({ message: "Cargo atualizado com sucesso!", cargoAtualizado });
    } catch (err) {
        res.status(400).json({ error: "ID inválido!" });
    }
});

// Deletar cargo

router.delete("/cargos/:id", async (req, res) => {
    try {
        const cargoDeletado = await Cargo.findByIdAndDelete(req.params.id);
        if (!cargoDeletado) return res.status(404).json({ error: "Cargo não encontrado!" });
        res.json({ message: "Cargo deletado com sucesso!" });
    } catch (err) {
        res.status(400).json({ error: "ID inválido!" });
    }
});