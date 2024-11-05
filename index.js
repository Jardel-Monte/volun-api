const express = require('express');
const mongoose = require('mongoose');  
const app = require('./App');

mongoose.set('strictQuery', false);

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
