const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        nome: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        telefone: { type: String, required: true },
data_admissao: { type: Date, required: true },
data_nascimento: { type: Date, required: true },
genero: { type: String, required: true },
endereco: {
            cep: { type: String },
            logradouro: { type: String },
            numero: { type: String },
            complemento: { type: String },
            bairro: { type: String },
            cidade: { type: String },
            uf: { type: String }
        },
       cargo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cargos',
            required: true
        },
        departamento: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Departamentos',
            required: true
        }
    }, { timestamps: true });

    const FuncionarioModel = mongoose.model('Funcionarios', schema);

    module.exports = FuncionarioModel;