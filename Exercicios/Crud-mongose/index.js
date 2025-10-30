// index.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json()); // Para ler JSON do corpo da requisição

// Variáveis de ambiente
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const PORT = process.env.PORT || 3000;

// Conexão com MongoDB Atlas
const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(uri)
  .then(() => console.log("Conectado ao MongoDB Atlas!"))
  .catch(err => console.log("Erro ao conectar no MongoDB:", err));

// Schema e model do Livro
const livroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  editora: { type: String, required: true },
  ano: { type: Number, required: true },
  preco: { type: Number, required: true }
});

const Livro = mongoose.model("Livro", livroSchema);

// ================= CRUD ==================

// Listar todos os livros
app.get("/livros", async (req, res) => {
  try {
    const livros = await Livro.find();
    res.json(livros);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar livros!" });
  }
});

// Buscar livro por ID
app.get("/livros/:id", async (req, res) => {
  try {
    const livro = await Livro.findById(req.params.id);
    if (!livro) return res.status(404).json({ error: "Livro não encontrado!" });
    res.json(livro);
  } catch (err) {
    res.status(400).json({ error: "ID inválido!" });
  }
});

// Cadastrar novo livro
app.post("/livros", async (req, res) => {
  const { titulo, autor, editora, ano, preco } = req.body;

  if (!titulo || !autor || !editora || !ano || !preco) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
  }

  try {
    const novoLivro = new Livro({ titulo, autor, editora, ano, preco });
    await novoLivro.save();
    res.status(201).json({ message: "Livro cadastrado com sucesso!", novoLivro });
  } catch (err) {
    console.log(err); // Mostra o erro real no terminal
    res.status(500).json({ error: "Erro ao cadastrar livro!" });
  }
});

// Atualizar livro
app.put("/livros/:id", async (req, res) => {
  const { titulo, autor, editora, ano, preco } = req.body;

  if (!titulo || !autor || !editora || !ano || !preco) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
  }

  try {
    const livroAtualizado = await Livro.findByIdAndUpdate(
      req.params.id,
      { titulo, autor, editora, ano, preco },
      { new: true }
    );
    if (!livroAtualizado) return res.status(404).json({ error: "Livro não encontrado!" });
    res.json({ message: "Livro atualizado com sucesso!", livroAtualizado });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Erro ao atualizar livro!" });
  }
});


// Excluir livro
app.delete("/livros/:id", async (req, res) => {
  try {
    const livro = await Livro.findByIdAndDelete(req.params.id);
    if (!livro) return res.status(404).json({ error: "Livro não encontrado!" });
    res.json({ message: "Livro excluído com sucesso!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Erro ao excluir livro!" });
  }
});

// ================= INICIAR SERVIDOR ==================
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
