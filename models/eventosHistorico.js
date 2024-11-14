const mongoose = require('mongoose');

const eventosHistoricoSchema = new mongoose.Schema({
    eventos_id:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Eventos', default: null }], // array que armazena varios eventos
    ong_id:     { type: mongoose.Schema.Types.ObjectId, ref: 'Organizacao', default: null },
    
}, { timestamps: true });

module.exports = mongoose.model('eventosHistorico', eventosHistoricoSchema);
