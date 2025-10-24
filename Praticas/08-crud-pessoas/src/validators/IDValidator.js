const mongoose = require('mongoose');

// Middleware de validação para IDs do MongoDB

function validarID(req, res, next) {
    const id = req.params.id;
    const valido = mongoose.Types.ObjectId.isValid(id);
    if (!valido) {
        return res.status(400).json({ message: "ID inválido" });
    }
    next();
}













module.exports = {
    validarID
};