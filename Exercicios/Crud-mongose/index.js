const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // se estiver usando .env

const app = express();
app.use(express.json());



require('dotenv').config();


mongoose.connect('mongodb+srv://KauaHenrique:1234@cluster0.gtjsgld.mongodb.net/CrudLivros?retryWrites=true&w=majority')
  .then(() => console.log("Conectado ao MongoDB!"))
  .catch(err => console.log("Erro ao conectar no MongoDB:", err));

const pessoaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  dataNascimento: { type: String, required: true }
});

const Pessoa = mongoose.model("Pessoa", pessoaSchema);




app.get("/pessoas", async (req, res) => {
  const pessoas = await Pessoa.find();
  res.json(pessoas);
});

// [GET] - Buscar uma pessoa por ID
app.get("/pessoas/:id", async (req, res) => {
  try {
    const pessoa = await Pessoa.findById(req.params.id);
    if (!pessoa) {
      return res.status(404).json({ error: "Pessoa não encontrada!!!" });
    }
    res.json(pessoa);
  } catch {
    res.status(400).json({ error: "ID inválido!" });
  }
});

// [POST] - Cadastrar nova pessoa
app.post("/pessoas", async (req, res) => {
  const { nome, cpf, email, dataNascimento } = req.body;

  if (!nome || !cpf || !email || !dataNascimento) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios!!!" });
  }

  try {
    const novaPessoa = new Pessoa({ nome, cpf, email, dataNascimento });
    await novaPessoa.save();
    res.status(201).json({ message: "Pessoa cadastrada com sucesso!", novaPessoa });
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).json({ error: "CPF já cadastrado!!!" });
    } else {
      res.status(500).json({ error: "Erro ao cadastrar pessoa!" });
    }
  }
});

// [PUT] - Atualizar pessoa
app.put("/pessoas/:id", async (req, res) => {
  const { nome, email, dataNascimento } = req.body;

  if (!nome || !email || !dataNascimento) {
    return res.status(400).json({ error: "nome, email e dataNascimento são obrigatórios!" });
  }

  try {
    const pessoaAtualizada = await Pessoa.findByIdAndUpdate(
      req.params.id,
      { nome, email, dataNascimento },
      { new: true }
    );
    if (!pessoaAtualizada) {
      return res.status(404).json({ error: "Pessoa não encontrada!" });
    }
    res.json({ message: "Pessoa atualizada com sucesso!", pessoaAtualizada });
  } catch {
    res.status(400).json({ error: "Erro ao atualizar!" });
  }
});

// [DELETE] - Excluir pessoa
app.delete("/pessoas/:id", async (req, res) => {
  try {
    const pessoa = await Pessoa.findByIdAndDelete(req.params.id);
    if (!pessoa) {
      return res.status(404).json({ error: "Pessoa não encontrada!" });
    }
    res.json({ message: "Pessoa excluída com sucesso!" });
  } catch {
    res.status(400).json({ error: "Erro ao excluir!" });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});


