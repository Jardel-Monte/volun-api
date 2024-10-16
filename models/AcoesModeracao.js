const mongoose = require('mongoose');

const acoesModeracaoSchema = new mongoose.Schema({
    moderador_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }, // Moderador que tomou a ação
    alvo_tipo: { type: String, required: true },  // 'usuario', 'evento', 'comentario', etc.
    alvo_id: { type: mongoose.Schema.Types.ObjectId, required: true }, // ID do objeto alvo da ação (usuário, evento, etc.)
    acao: { type: String, required: true },  // 'excluir', 'restringir', 'advertir', etc.
    descricao: { type: String },  // Detalhes da ação (ex: motivo da exclusão, natureza da restrição, etc.)
    data: { type: Date, default: Date.now },  // Quando a ação foi realizada
  });

  module.exports = mongoose.model('AcoesModeracao', acoesModeracaoSchema);

