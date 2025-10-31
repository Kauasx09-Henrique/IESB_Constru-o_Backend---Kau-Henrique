const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
{
        nome: { type: String, required: true },
        descricao: { type: String, required: true },
        salario: { type: Number, required: true },
    },
    
{ timestamps: true }
)

const Cargo = mongoose.model("Cargo", Schema);

module.exports = Cargo;