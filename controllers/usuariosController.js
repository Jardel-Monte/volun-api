const db = require('../config/firebase-config');

// Cria um novo usuário
exports.createUsuario = async (req, res) => {
  try {
    const data = req.body;
    await db.collection('usuarios').add(data);
    res.status(201).send('Usuário criado com sucesso!');
  } catch (error) {
    res.status(500).send(`Erro ao criar usuário: ${error.message}`);
  }
};

// Retorna todos os usuários
exports.getUsuarios = async (req, res) => {
  try {
    const snapshot = await db.collection('usuarios').get();
    const usuarios = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).send(`Erro ao buscar usuários: ${error.message}`);
  }
};

// Retorna um usuário específico
exports.getUsuarioById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await db.collection('usuarios').doc(id).get();
    if (!doc.exists) {
      res.status(404).send('Usuário não encontrado');
    } else {
      res.status(200).json({ id: doc.id, ...doc.data() });
    }
  } catch (error) {
    res.status(500).send(`Erro ao buscar usuário: ${error.message}`);
  }
};

// Atualiza um usuário
exports.updateUsuario = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await db.collection('usuarios').doc(id).update(data);
    res.status(200).send('Usuário atualizado com sucesso!');
  } catch (error) {
    res.status(500).send(`Erro ao atualizar usuário: ${error.message}`);
  }
};

// Deleta um usuário
exports.deleteUsuario = async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection('usuarios').doc(id).delete();
    res.status(200).send('Usuário deletado com sucesso!');
  } catch (error) {
    res.status(500).send(`Erro ao deletar usuário: ${error.message}`);
  }
};
