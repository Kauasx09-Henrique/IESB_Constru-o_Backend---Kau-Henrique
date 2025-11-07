const mongoose = require('mongoose');
const yup = require('yup');

const schema = yup.object().shape({
    nome: yup.string().required('O nome do cargo é obrigatório').min(3, 'O nome do cargo deve ter pelo menos 3 caracteres').max(100, 'O nome do cargo deve ter no máximo 100 caracteres'),
    descricao: yup.string().required('A descrição do cargo é obrigatória').min(10, 'A descrição do cargo deve ter pelo menos 10 caracteres').max(500, 'A descrição do cargo deve ter no máximo 500 caracteres'),
    salario: yup.number().required('O salário do cargo é obrigatório').min(0, 'O salário do cargo deve ser um valor positivo').max(
        1.518, 'O salário do cargo deve ser um valor razoável'),
});

async function validateCargo(req, res, next) {
    try {
        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch (err) {
        const errors = err.inner.map(e => e.message);
        res.status(400).json({ errors });
    }
}
module.exports = {
    validateCargo
}