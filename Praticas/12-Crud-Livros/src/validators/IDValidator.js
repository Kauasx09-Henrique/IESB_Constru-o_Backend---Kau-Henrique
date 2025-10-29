const mongoose = require('mongoose');

// Valida se o ID do Mongo é válido
function validarID(req, res, next) {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }
  next();
}

function validarNovoLivro(req, res, next) {
  const { titulo, autor, editora, ano, preco } = req.body;
  if (!titulo || !autor || !editora || !ano || !preco) {
    return res.status(400).json({ message: "Preencha todos os campos obrigatórios" });
  }
  next();
}

module.exports = { validarID, validarNovoLivro };
