const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    descricao_2: { type: String, required: false },
    tags: [{ type: String, default: null }],
    data_inicio: { type: Date, default: null },
    data_fim: { type: Date, default: null },
    imagem: { type: String, default: null },
    vaga_limite: { type: Number, required: true },
    ong_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Organizacao', default: null },
    endereco_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Endereco', default: null }  // Referência para 'Endereco'
}, { timestamps: true });

module.exports = mongoose.model('Eventos', eventoSchema);
