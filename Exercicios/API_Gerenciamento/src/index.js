const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();


app.use(express.json());


const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(url)
  .then(() => {
    console.log("✅ Conectado ao MongoDB");
  })
  .catch(err => {
    console.log("❌ Erro ao conectar no MongoDB:", err);
  });


const DepartamentoController = require('./controllers/DepartamentoController');
const CargoController = require('./controllers/CargoController');
const FuncionarioController = require('./controllers/FuncionarioController');
const ProjetoController = require('./controllers/ProjetoController');
const TarefaController = require('./controllers/TarefaController');

app.use('/api/departamentos', DepartamentoController);
app.use('/api/cargos', CargoController);
app.use('/api/funcionarios', FuncionarioController);
app.use('/api/projetos', ProjetoController);
app.use('/api/tarefas', TarefaController);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API-EMPRESAS rodando em http://localhost:${PORT}`);
});
