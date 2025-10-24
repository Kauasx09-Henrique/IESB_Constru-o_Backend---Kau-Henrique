const yup = require('yup');

// Esquema de validação para Pessoa
const pessoaSchema = yup.object().shape(
    {
        nome: yup.string().required('Nome é obrigatório'),
        cpf: yup.string().required('CPF é obrigatório'),
        email: yup.string().email('Email inválido').required('Email é obrigatório'),
        telefone: yup.string(),
        dataNascimento: yup.date().required('Data de nascimento é obrigatória'),
        genero: yup.string().required('Gênero é obrigatório'),

    }

)

async function validarNovapessoa(req, res, next) {
    try {
        await pessoaSchema.validate(req.body, { abortEarly: false });
        next(); // prosseguir para o próximo middleware ou rota
    } catch (err) {
        res.status(400).json({ errors: err.errors });
    }

}



// middleware de validação




// exporta o middleware
module.exports = {
    validarNovapessoa
}