const index = require('./algoliaConfig');
const Evento = require('../models/Eventos');
(async () => {
  try {
    const eventos = await Evento.find(); // Obtém todos os eventos do MongoDB

    const formattedEventos = eventos.map(evento => ({
      objectID: evento._id.toString(),
      ...evento.toObject(),
    }));

    // Faz o upload em massa para o Algolia
    await index.saveObjects(formattedEventos);

    console.log('Dados enviados com sucesso para o Algolia!');
  } catch (error) {
    console.error('Erro ao enviar dados para o Algolia:', error);
  }
})();
