const mongoose = require('mongoose');

const participacaoSchema = new mongoose.Schema({
    usuario_id: { type: String, required: true }, 
    eventos_id:  { type: mongoose.Schema.Types.ObjectId, ref: 'Eventos', required: true }, // usa os eventos
    status: {type: String, default: 'confirmado'},
    data_inscricao: {type: Date, default: Date.now}
}, { timestamps: true });

module.exports = mongoose.model('participacao', participacaoSchema);
