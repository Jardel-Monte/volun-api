const express = require('express');
const mongoose = require('mongoose');  
const app = require('./App');
const sincronizarEventosComAlgolia = require('./services/syncAlgolia');
mongoose.set('strictQuery', false);

const PORT = process.env.PORT || 3000;

// Conectar ao MongoDB
const mongoUri = 'mongodb+srv://volunzinho:S8EXiRDrAwejYDO0@volun-api.dqoev.mongodb.net/'

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Conectado ao MongoDB com sucesso');

    // Sincronizar dados com Algolia após conectar ao MongoDB
    try {
      await sincronizarEventosComAlgolia();
      console.log('Sincronização com Algolia concluída com sucesso.');
    } catch (error) {
      console.error('Erro ao sincronizar com Algolia:', error);
    }

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB', err);
  });

module.exports = app;
