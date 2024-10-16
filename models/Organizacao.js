const mongoose = require('mongoose');

const organizacaoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  img_logo: { type: String, required: false },
  razao_social: { type: String, required: true },
  descricao: { type: String, required: true },
  cnpj: { type: String, required: true, unique: true },
  ddd: { type: String, required: true },
  telefone: { type: String, required: true },
  associados: [{ type: String }], // IDs de usuários que acompanham a organização
  criador_id: { type: String, required: true } // ID do usuário que criou a organização
}, { timestamps: true });

module.exports = mongoose.model('Organizacao', organizacaoSchema);
