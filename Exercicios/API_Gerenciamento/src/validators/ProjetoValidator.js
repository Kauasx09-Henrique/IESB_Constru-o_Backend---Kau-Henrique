const mongoose = require('mongoose');
const yup = require('yup');

const schema = yup.object().shape({
    nome: yup.string().required().min(3).max(100),
    descricao: yup.string().required().min(10).max(500),
    dataInicio: yup.date().required(),
    dataTermino: yup.date().min(
        yup.ref('dataInicio'),
        'Data de término deve ser maior que a data de início'
    ).notRequired(),
    orcamento: yup.number().required().min(0),
});
async function validateProjeto(req, res, next) {
    try {
        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch (err) {
        const errors = err.inner.map(e => e.message);
        res.status(400).json({ errors });
    }
}
module.exports = {
    validateProjeto
}