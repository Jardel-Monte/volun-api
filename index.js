console.log("Iniciando o servidor...");

const express = require('express');
const app = express();
const usuariosRoute = require('./routes/usuarios');

app.use(express.json());

// Rotas
app.use('/usuarios', usuariosRoute);

// Configuração do servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
