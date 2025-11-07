const mongoose = require('mongoose');
const yup = require('yup');

const schema = yup.object().shape({
    nome: yup.string().required('O nome do departamento é obrigatório').min(3, 'O nome do departamento deve ter pelo menos 3 caracteres').max(100, 'O nome do departamento deve ter no máximo 100 caracteres'),
    descricao: yup.string().required('A descrição do departamento é obrigatória').min(10, 'A descrição do departamento deve ter pelo menos 10 caracteres').max(500, 'A descrição do departamento deve ter no máximo 500 caracteres'),
});

async function validateDepartamento(req, res, next) {
    try {
        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch (err) {
        const errors = err.inner.map(e => e.message);
        res.status(400).json({ errors });
    }
}
module.exports = {
    validateDepartamento
}