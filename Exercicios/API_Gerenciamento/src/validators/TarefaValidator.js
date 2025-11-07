const mongoose = require('mongoose');
const yup = require('yup');

const TarefaValidator = yup.object().shape({
    titulo: yup.string().required('O título da tarefa é obrigatório').min(3, 'O título da tarefa deve ter pelo menos 3 caracteres').max(100, 'O título da tarefa deve ter no máximo 100 caracteres'),
    descricao: yup.string().required('A descrição da tarefa é obrigatória').min(10, 'A descrição da tarefa deve ter pelo menos 10 caracteres').max(500, 'A descrição da tarefa deve ter no máximo 500 caracteres'),
dataInicio: yup.date().required('A data de início da tarefa é obrigatória').min(new Date(), 'A data de início da tarefa deve ser uma data futura'),
dataTermino: yup.date().min(
        yup.ref('dataInicio'),
        'A data de término deve ser maior que a data de início'
    ).notRequired(),
funcionario : yup.string().test('is-objectid', 'ID do funcionário inválido', value => mongoose.Types.ObjectId.isValid(value)).required('O ID do funcionário é obrigatório'),
projeto : yup.string().test('is-objectid', 'ID do projeto inválido', value => mongoose.Types.ObjectId.isValid(value)).required('O ID do projeto é obrigatório'),
});

const validateTarefa = async (req, res, next) => {
    try {
        await TarefaValidator.validate(req.body, { abortEarly: false });
        next();
    } catch (err) {
        const errors = err.inner.map(e => e.message);
        res.status(400).json({ errors });
    }
}
module.exports = {
    validateTarefa
}