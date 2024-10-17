const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    tags: [{ type: String, default: null}],
    data_inicio: { type: Date, required: true },
    data_fim: { type: Date, required: true },
    imagem: { type: String, required: true },
    vaga_limite: { type: Number, required: true },
    ong_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Organizacao', required: true }
  }, { timestamps: true });

  module.exports = mongoose.model('Eventos', eventoSchema);  