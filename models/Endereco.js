const mongoose = require('mongoose');
const mapearEventoParaAlgolia = require('./AlgoliaMapper');
const index = require('../services/algoliaConfig');

const enderecoSchema = new mongoose.Schema({
  logradouro: { type: String, required: true },
  bairro: { type: String, required: true },
  cep: { type: String, required: true },
  cidade: { type: String, required: true },
  estado: { type: String, required: true },
  numero: { type: String, default: '' }, 
  usuario_id: { type: String, default: null }, 
  org_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Organizacao', default: null },
  evento_id: { type: String, default: null },
}, { timestamps: true }); 

// Middleware para atualizar Algolia ao modificar evento_id
enderecoSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();
  
  if (update && update.evento_id) {
    try {
      // Buscar o novo evento_id no update
      const Evento = require('./Eventos');
      const evento = await Evento.findById(update.evento_id);

      if (evento) {
        // Mapear o evento atualizado para o Algolia e atualizar o Algolia
        const eventoMapeado = await mapearEventoParaAlgolia(evento);
        await index.saveObject(eventoMapeado);
      }
    } catch (error) {
      console.error('Erro ao atualizar Algolia após modificação do evento_id no endereço:', error);
    }
  }

  next();
});

module.exports = mongoose.model('Endereco', enderecoSchema);
