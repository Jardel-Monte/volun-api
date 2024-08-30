const db = require('../config/firebase-config');

// Função auxiliar para validar a existência de um comentário
const validateComentarioExistence = async (id) => {
  const doc = await db.collection('comentarios').doc(id).get();
  if (!doc.exists) {
    return 'Comentário não encontrado.';
  }
  return null;
};

// Cria um novo comentário
exports.createComentario = async (req, res) => {
  try {
    const data = req.body;
    if (!data || typeof data !== 'object') {
      return res.status(400).send('Dados inválidos para criar comentário.');
    }
    await db.collection('comentarios').add(data);
    res.status(201).send('Comentário criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar comentário:', error);
    res.status(500).send(`Erro ao criar comentário: ${error.message}`);
  }
};

// Retorna todos os comentários com paginação
exports.getComentarios = async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const page = parseInt(req.query.page) || 1;

    const snapshot = await db.collection('comentarios')
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .get();

    const comentarios = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(comentarios);
  } catch (error) {
    console.error('Erro ao buscar comentários:', error);
    res.status(500).send(`Erro ao buscar comentários: ${error.message}`);
  }
};

// Retorna um comentário específico
exports.getComentarioById = async (req, res) => {
  try {
    const id = req.params.id;
    const validationError = await validateComentarioExistence(id);
    if (validationError) {
      return res.status(404).send(validationError);
    }

    const doc = await db.collection('comentarios').doc(id).get();
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Erro ao buscar comentário:', error);
    res.status(500).send(`Erro ao buscar comentário: ${error.message}`);
  }
};

// Atualiza um comentário
exports.updateComentario = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const validationError = await validateComentarioExistence(id);
    if (validationError) {
      return res.status(404).send(validationError);
    }

    if (!data || typeof data !== 'object') {
      return res.status(400).send('Dados inválidos para atualizar comentário.');
    }

    await db.collection('comentarios').doc(id).update(data);
    res.status(200).send('Comentário atualizado com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar comentário:', error);
    res.status(500).send(`Erro ao atualizar comentário: ${error.message}`);
  }
};

// Deleta um comentário
exports.deleteComentario = async (req, res) => {
  try {
    const id = req.params.id;

    const validationError = await validateComentarioExistence(id);
    if (validationError) {
      return res.status(404).send(validationError);
    }

    await db.collection('comentarios').doc(id).delete();
    res.status(200).send('Comentário deletado com sucesso!');
  } catch (error) {
    console.error('Erro ao deletar comentário:', error);
    res.status(500).send(`Erro ao deletar comentário: ${error.message}`);
  }
};
