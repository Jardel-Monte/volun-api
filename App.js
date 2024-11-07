const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const swaggerUi = require('swagger-ui-express'); // Importa o Swagger UI
// const swaggerDocument = require('./swagger.json'); // O arquivo swagger.json
// const path = require('path');
// const fs = require('fs');

const app = express();

// Middlewares para parsing do body em JSON e CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// // Servindo o Swagger UI
// const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, 'swagger.json'), 'utf8'));

// // Rota para a documentação do Swagger em `/api-docs`
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Importa as rotas
const usuariosRoutes = require('./routes/usuariosRoutes');
const organizacaoRoutes = require('./routes/organizacaoRoutes');
const eventosRoutes = require('./routes/eventosRoutes');
const enderecoRoutes = require('./routes/enderecoRoutes');
const comentariosRoutes = require('./routes/comentariosRoutes');
const denunciasRoutes = require('./routes/denunciasRoutes');
const acoesModeracaoRoutes = require('./routes/acoesModeracaoRoutes');

// Define as rotas da API
app.use('/usuarios', usuariosRoutes);
app.use('/organizacao', organizacaoRoutes);
app.use('/eventos', eventosRoutes);
app.use('/endereco', enderecoRoutes);
app.use('/comentarios', comentariosRoutes);
app.use('/denuncias', denunciasRoutes);
app.use('/acoes-moderacao', acoesModeracaoRoutes);

// Middleware para rota não encontrada (404)
app.use((req, res, next) => {
  res.status(404).json({ message: "Rota não encontrada" });
});

module.exports = app;

