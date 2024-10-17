const Usuario = require('../models/Usuario');

exports.addUsuarioInfo = async (req, res) => {
  try {
    const { uid } = req.params; // O 'uid' é recebido como parte da URL
    const { nome, sobrenome, cpf, data_nascimento, ddd, telefone } = req.body;

    // Verifica se o usuário já existe no MongoDB
    const existingUser = await Usuario.findById(uid);
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe!' });
    }

    // Cria um novo usuário com o 'uid' como '_id'
    const userData = new Usuario({
      _id: uid, // Definindo o 'uid' como o '_id'
      nome,
      sobrenome,
      cpf,
      data_nascimento,
      ddd,
      telefone,
    });

    // Salva os dados no MongoDB
    await userData.save();

    res.status(201).json({ message: 'Informações do usuário adicionadas com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: `Erro ao adicionar informações do usuário: ${error.message}` });
  }
};

// Retorna todos os usuários da coleção 'usuarios'
exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find(); // Busca todos os documentos
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).send(`Erro ao buscar usuários: ${error.message}`);
  }
};

// Retorna um usuário específico da coleção 'usuarios'
exports.getUsuarioById = async (req, res) => {
  try {
    const id = req.params.id; // O ID é passado como parâmetro
    const usuario = await Usuario.findById(id); // Usa o método findById para buscar o documento
    if (!usuario) {
      return res.status(404).send('Usuário não encontrado');
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).send(`Erro ao buscar usuário: ${error.message}`);
  }
};

// Atualiza informações do usuário na coleção 'usuarios'
exports.updateUsuario = async (req, res) => {
  try {
    const id = req.params.id; // O ID é passado como parâmetro
    const data = req.body;
    await Usuario.findByIdAndUpdate(id, data); // Atualiza o documento com base no ID
    res.status(200).send('Usuário atualizado com sucesso!');
  } catch (error) {
    res.status(500).send(`Erro ao atualizar usuário: ${error.message}`);
  }
};

// Deleta um usuário na coleção 'usuarios'
exports.deleteUsuario = async (req, res) => {
  try {
    const id = req.params.id; // O ID é passado como parâmetro
    await Usuario.findByIdAndDelete(id); // Deleta o documento com base no ID
    res.status(200).send('Usuário deletado com sucesso!');
  } catch (error) {
    res.status(500).send(`Erro ao deletar usuário: ${error.message}`);
  }
};
