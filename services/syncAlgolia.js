const mapearEventoParaAlgolia = require('../models/AlgoliaMapper');
const Evento = require('../models/Eventos');

async function sincronizarEventosComAlgolia() {
  try {
    const eventos = await Evento.find().populate('ong_id');
    const eventosMapeados = await Promise.all(eventos.map(mapearEventoParaAlgolia));
    
    await algoliaIndex.saveObjects(eventosMapeados);
    console.log("Eventos sincronizados com sucesso no Algolia!");
  } catch (error) {
    console.error("Erro ao sincronizar eventos com o Algolia:", error);
  }
}

module.exports = sincronizarEventosComAlgolia;
