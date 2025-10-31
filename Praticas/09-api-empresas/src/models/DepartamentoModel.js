const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
{
        nome: { type: String, required: true },
        desciracao: { type: String, required: true },

    },
    { timestamps: true }
)

const Departamento = mongoose.model("Departamento", Schema);

module.exports = Departamento;
    