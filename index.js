const express = require('express');
const mongoose = require('mongoose');  // Pacote mongoose para lidar com o MongoDB
const app = require('./App'); // Importando o app do seu projeto

mongoose.set('strictQuery', false);

// Porta do servidor
const PORT = process.env.PORT || 3000;

// Conectar ao MongoDB
const mongoUri = 'mongodb+srv://volunzinho:S8EXiRDrAwejYDO0@volun-api.dqoev.mongodb.net/'

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao MongoDB com sucesso');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB', err);
  });

module.exports = app;

// volunzinho 
// S8EXiRDrAwejYDO0
