const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
  evento_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Eventos', required: true }, // Referência ao evento
  usuario_id: { type: String, required: true }, // Referência ao usuário
  conteudo: { type: String, required: true },
  data_criacao: { type: Date, default: Date.now },
  data_atualizacao: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Comentario', comentarioSchema);
