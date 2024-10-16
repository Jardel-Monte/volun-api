const mongoose = require('mongoose');

const enderecoSchema = new mongoose.Schema({
  logradouro: { type: String, required: true },
  bairro: { type: String, required: true },
  cep: { type: String, required: true },
  cidade: { type: String, required: true },
  estado: { type: String, required: true },
  numero: { type: String, default: '' }, 
  usuario_id: { type: String, default: null }, 
  org_id: { type: String, default: null }, 
}, { timestamps: true }); 

module.exports = mongoose.model('Endereco', enderecoSchema);
