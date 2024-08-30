const db = require('../config/firebase-config');

// Função auxiliar para validação dos dados do usuário
const validateUsuarioData = (data) => {
  if (!data.nome || !data.sobrenome || !data.email || !data.cpf) {
    return 'Campos obrigatórios não preenchidos: nome, sobrenome, email, CPF.';
  }
  if (data.cpf && !/^\d{11}$/.test(data.cpf)) {
    return 'CPF inválido. Deve conter 11 dígitos numéricos.';
  }
  return null;
};

// Cria um novo usuário
exports.createUsuario = async (req, res) => {
  try {
    const data = req.body;

    // Validação dos dados
    const validationError = validateUsuarioData(data);
    if (validationError) {
      return res.status(400).send(validationError);
    }

    await db.collection('usuarios').add(data);
    res.status(201).send('Usuário criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).send(`Erro ao criar usuário: ${error.message}`);
  }
};

// Retorna todos os usuários com paginação
exports.getUsuarios = async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const page = parseInt(req.query.page) || 1;

    const snapshot = await db.collection('usuarios')
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .get();

    const usuarios = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).send(`Erro ao buscar usuários: ${error.message}`);
  }
};

// Retorna um usuário específico
exports.getUsuarioById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await db.collection('usuarios').doc(id).get();

    if (!doc.exists) {
      return res.status(404).send('Usuário não encontrado');
    }

    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).send(`Erro ao buscar usuário: ${error.message}`);
  }
};

// Atualiza um usuário
exports.updateUsuario = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    // Validação dos dados
    const validationError = validateUsuarioData(data);
    if (validationError) {
      return res.status(400).send(validationError);
    }

    const doc = await db.collection('usuarios').doc(id).get();
    if (!doc.exists) {
      return res.status(404).send('Usuário não encontrado');
    }

    await db.collection('usuarios').doc(id).update(data);
    res.status(200).send('Usuário atualizado com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).send(`Erro ao atualizar usuário: ${error.message}`);
  }
};

// Deleta um usuário
exports.deleteUsuario = async (req, res) => {
  try {
    const id = req.params.id;

    const doc = await db.collection('usuarios').doc(id).get();
    if (!doc.exists) {
      return res.status(404).send('Usuário não encontrado');
    }

    await db.collection('usuarios').doc(id).delete();
    res.status(200).send('Usuário deletado com sucesso!');
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).send(`Erro ao deletar usuário: ${error.message}`);
  }
};
