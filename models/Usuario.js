const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  nome: { type: String, required: true },
  sobrenome: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  data_nascimento: { type: Date, required: true },
  photoUrl: {type: String, default: null},
  ddd: { type: String, required: true },
  telefone: { type: String, required: true },
  userSuspenso: { type: Boolean, default: false},
  isModerator: { type: Boolean, default: false },
}, { timestamps: true }); // O timestamps adiciona automaticamente 'createdAt' e 'updatedAt'

module.exports = mongoose.model('Usuario', usuarioSchema);
