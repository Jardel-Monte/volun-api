const mongoose = require('mongoose');

const AdvertenciaSchema = new mongoose.Schema({
  moderador_id: {type: String,required: true,},
  usuario_id: { type: String, required: true,},
  motivo: { type: String, required: true},
  data: { type: Date,  default: Date.now },
});

module.exports = mongoose.model('Advertencia', AdvertenciaSchema);
