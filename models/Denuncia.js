const mongoose = require('mongoose');

const DenunciaSchema = new mongoose.Schema({
    denunciante_id: { type: String, required: true }, // Firebase UID para o usuário denunciante
    denunciado_id: { type: String, required: false }, // Firebase UID para o usuário denunciado
    comentario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Comentario', required: false },
    evento_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Eventos', required: false },
    org_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Organizacao', required: false },
    motivo: { type: [String], required: true }, // Motivos como array de tags
    descricao: { type: String, required: true },
    data: { type: Date, default: Date.now }, // Somente dia, mês e ano são salvos
});

module.exports = mongoose.model('Denuncia', DenunciaSchema);
