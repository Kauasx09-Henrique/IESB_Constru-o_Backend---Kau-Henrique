const mongoose = require('mongoose');
const yup = require('yup');

const FuncionarioValidator = yup.object().shape({
    nome: yup.string().required('O nome do funcionário é obrigatório').min(3, 'O nome do funcionário deve ter pelo menos 3 caracteres').max(100, 'O nome do funcionário deve ter no máximo 100 caracteres'),
    email: yup.string().required('O email do funcionário é obrigatório').email('O email do funcionário deve ser válido'),
    telefone: yup.string().required('O telefone do funcionário é obrigatório').min(10, 'O telefone do funcionário deve ter pelo menos 10 caracteres').max(15, 'O telefone do funcionário deve ter no máximo 15 caracteres'),
    cargoId: yup.string().required('O ID do cargo é obrigatório').test('is-objectid', 'O ID do cargo deve ser um ObjectId válido', value => mongoose.Types.ObjectId.isValid(value)),
    departamentoId: yup.string().required('O ID do departamento é obrigatório').test('is-objectid', 'O ID do departamento deve ser um ObjectId válido', value => mongoose.Types.ObjectId.isValid(value)),
});
async function validateFuncionario(req, res, next) {
    try {
        await FuncionarioValidator.validate(req.body, { abortEarly: false });
        next();
    } catch (err) {
        const errors = err.inner.map(e => e.message);
        res.status(400).json({ errors });
    }
}
module.exports = {
    validateFuncionario
}