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
enderecoSchema.post('save', async function (doc) {
  if (doc.evento_id) {
    try {
      // Buscar o evento correspondente ao evento_id do endereço
      const Evento = require('./Eventos');
      const evento = await Evento.findById(doc.evento_id);

      if (evento) {
        // Mapear o evento atualizado para o Algolia e atualizar o Algolia
        const eventoMapeado = await mapearEventoParaAlgolia(evento);
        await index.saveObject(eventoMapeado);
      }
    } catch (error) {
      console.error('Erro ao atualizar Algolia após modificação do endereço:', error);
    }
  }
});

module.exports = mongoose.model('Endereco', enderecoSchema);
