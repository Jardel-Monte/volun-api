const { db } = require('../config/firebase-config');

// Adiciona informações adicionais de um usuário
exports.addUsuarioInfo = async (req, res) => {
  try {
    const { uid } = req.params;
    const { nome, sobrenome, cpf, data_nascimento, ddd, telefone, foto_perfil } = req.body;

    // // Verifica se todos os campos obrigatórios estão presentes
    // if (!nome || !sobrenome || !cpf || !data_nascimento || !ddd || !telefone || !foto_perfil) {
    //   return res.status(400).send('Todos os campos obrigatórios devem ser preenchidos.');
    // }

    const userData = {
      nome,
      sobrenome,
      cpf,
      data_nascimento,
      ddd,
      telefone,
      foto_perfil
    };

    // Adiciona os dados à collection 'usuarios' com o UID como ID do documento
    await db.collection('usuarios').doc(uid).set(userData);

    res.status(201).send('Informações do usuário adicionadas com sucesso!');
  } catch (error) {
    res.status(500).send(`Erro ao adicionar informações do usuário: ${error.message}`);
  }
};


// Retorna todos os usuários da coleção 'usuarios'
exports.getUsuarios = async (req, res) => {
  try {
    const snapshot = await db.collection('usuarios').get();
    const usuarios = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).send(`Erro ao buscar usuários: ${error.message}`);
  }
};

// Retorna um usuário específico da coleção 'usuarios'
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

// Atualiza informações do usuário na coleção 'usuarios'
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

// Deleta um usuário na coleção 'usuarios'
exports.deleteUsuario = async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection('usuarios').doc(id).delete();
    res.status(200).send('Usuário deletado com sucesso!');
  } catch (error) {
    res.status(500).send(`Erro ao deletar usuário: ${error.message}`);
  }
};

