const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware para parsing do body em JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors()); // Permite requisições de qualquer origem

// Importa as rotas
const usuariosRoutes = require('./routes/usuariosRoutes');
// const advertenciasRoutes = require('./routes/advertenciasRoutes');
const organizacaoRoutes = require('./routes/organizacaoRoutes');
const eventosRoutes = require('./routes/eventosRoutes');
const enderecoRoutes = require('./routes/enderecoRoutes');
const eventoHistoricoRoutes = require('./routes/eventoHistoricoRoutes');
const comentariosRoutes = require('./routes/comentariosRoutes');
const denunciasRoutes = require('./routes/denunciasRoutes');
const acoesModeracaoRoutes = require('./routes/acoesModeracaoRoutes');

// Define as rotas da API
app.use('/usuarios', usuariosRoutes);
// app.use('/advertencias', advertenciasRoutes);
app.use('/organizacao', organizacaoRoutes);
app.use('/eventos', eventosRoutes);
app.use('/endereco', enderecoRoutes);
app.use('/evento-historico', eventoHistoricoRoutes);
app.use('/comentarios', comentariosRoutes);
app.use('/denuncias', denunciasRoutes);
app.use('/acoes-moderacao', acoesModeracaoRoutes);


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
