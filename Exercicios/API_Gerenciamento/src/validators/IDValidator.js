// -----------------------------
// Validador para novo Departamento
// -----------------------------
const validarNovoDepartamento = (req, res, next) => {
    const { nome, sigla } = req.body;
  
    if (!nome || !sigla) {
      return res.status(400).json({
        message: "Campos obrigatórios para Departamento: nome e sigla.",
      });
    }
  
    next();
  };
  
  // -----------------------------
  // Validador para novo Cargo
  // -----------------------------
  const validarNovoCargo = (req, res, next) => {
    const { nome, salarioBase } = req.body;
  
    if (!nome || !salarioBase) {
      return res.status(400).json({
        message: "Campos obrigatórios para Cargo: nome e salarioBase.",
      });
    }
  
    if (isNaN(salarioBase) || salarioBase <= 0) {
      return res.status(400).json({
        message: "O campo salarioBase deve ser um número positivo.",
      });
    }
  
    next();
  };
  
  // -----------------------------
  // Validador para novo Funcionário
  // -----------------------------
  const validarNovoFuncionario = (req, res, next) => {
    const { nome, cargo, salario } = req.body;
  
    if (!nome || !cargo || !salario) {
      return res.status(400).json({
        message: "Campos obrigatórios para Funcionário: nome, cargo e salário.",
      });
    }
  
    if (isNaN(salario) || salario <= 0) {
      return res.status(400).json({
        message: "O campo salário deve ser um número positivo.",
      });
    }
  
    next();
  };
  
  // -----------------------------
  // Validador genérico para IDs
  // -----------------------------
  const validarID = (req, res, next) => {
    const { id } = req.params;
    const padraoMongoID = /^[0-9a-fA-F]{24}$/;
  
    if (!id || !padraoMongoID.test(id)) {
      return res.status(400).json({
        message: "ID inválido. O ID deve ter 24 caracteres hexadecimais.",
      });
    }
  
    next();
  };
  
  const validarNovoProjeto = (req, res, next) => {
    const { nome, descricao, dataInicio, dataFim } = req.body;
  
    if (!nome || !descricao) {
      return res.status(400).json({
        message: "Campos obrigatórios para Projeto: nome e descricao.",
      });
    }
  
    if (dataInicio && isNaN(Date.parse(dataInicio))) {
      return res.status(400).json({ message: "dataInicio inválida." });
    }
  
    if (dataFim && isNaN(Date.parse(dataFim))) {
      return res.status(400).json({ message: "dataFim inválida." });
    }
  
    next();
  };
  const validarNovaTarefa = (req, res, next) => {
    const { titulo, descricao, projetoId, funcionarioId, status } = req.body;
  
    if (!titulo || !descricao || !projetoId || !funcionarioId) {
      return res.status(400).json({
        message: "Campos obrigatórios para Tarefa: titulo, descricao, projetoId e funcionarioId.",
      });
    }
  
    const statusPermitidos = ["pendente", "em andamento", "concluída"];
    if (status && !statusPermitidos.includes(status.toLowerCase())) {
      return res.status(400).json({
        message: "Status inválido. Use: pendente, em andamento ou concluída.",
      });
    }
  
    next();
  };
  
  

  module.exports = {
    validarID,
    validarNovoDepartamento,
    validarNovoCargo,
    validarNovoFuncionario,
    validarNovoProjeto,
    validarNovaTarefa
  };
  