const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express'); // Adicione isto
const swaggerDocument = require('./swagger.json'); // Adicione isto

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
const comentariosRoutes = require('./routes/comentariosRoutes');
const denunciasRoutes = require('./routes/denunciasRoutes');
const acoesModeracaoRoutes = require('./routes/acoesModeracaoRoutes');
const participacaoRoutes = require('./routes/participacaoRoutes');

// Define as rotas da API
app.use('/usuarios', usuariosRoutes);
// app.use('/advertencias', advertenciasRoutes);
app.use('/organizacao', organizacaoRoutes);
app.use('/eventos', eventosRoutes);
app.use('/endereco', enderecoRoutes);
app.use('/comentarios', comentariosRoutes);
app.use('/denuncias', denunciasRoutes);
app.use('/acoes-moderacao', acoesModeracaoRoutes);
app.use('/participacao', participacaoRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


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
