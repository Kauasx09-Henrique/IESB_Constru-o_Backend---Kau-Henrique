const mongoose = require("mongoose");

const schema = yup.object().shape({
    nome: yup.string().required("O nome do cargo é obrigatório").min(3, "O nome deve ter pelo menos 3 caracteres"),
    descricao: yup.string().required("A descrição do cargo é obrigatória").min(10, "A descrição deve ter pelo menos 10 caracteres"),
    salario: yup.number().required("O salário do cargo é obrigatório").positive("O salário deve ser um número positivo"),
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