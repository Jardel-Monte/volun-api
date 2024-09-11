const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware para parsing do body em JSON
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importa as rotas
const usuariosRoutes = require('./routes/usuariosRoutes');
const advertenciasRoutes = require('./routes/advertenciasRoutes');
const loginRoutes = require('./routes/loginRoutes');
const organizacaoRoutes = require('./routes/organizacaoRoutes');
const eventosRoutes = require('./routes/eventosRoutes');
const enderecoRoutes = require('./routes/enderecoRoutes');
const eventoHistoricoRoutes = require('./routes/eventoHistoricoRoutes');
const comentariosRoutes = require('./routes/comentariosRoutes');
const denunciasRoutes = require('./routes/denunciasRoutes');
const acoesModeracaoRoutes = require('./routes/acoesModeracaoRoutes');
const logsModeracaoRoutes = require('./routes/logsModeracaoRoutes');

// Define as rotas da API
app.use('/usuarios', usuariosRoutes);
app.use('/advertencias', advertenciasRoutes);
app.use('/login', loginRoutes);
app.use('/organizacao', organizacaoRoutes);
app.use('/eventos', eventosRoutes);
app.use('/endereco', enderecoRoutes);
app.use('/evento-historico', eventoHistoricoRoutes);
app.use('/comentarios', comentariosRoutes);
app.use('/denuncias', denunciasRoutes);
app.use('/acoes-moderacao', acoesModeracaoRoutes);
app.use('/logs-moderacao', logsModeracaoRoutes);

// Tratamento de rotas não encontradas (404)
app.use((req, res, next) => {
  res.status(404).send("Rota não encontrada");
});

// Tratamento de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado! Tente novamente mais tarde.');
});

module.exports = app;
