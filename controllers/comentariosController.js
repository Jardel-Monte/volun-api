const db = require('../config/firebase-config');

// Cria um novo comentário
exports.createComentario = async (req, res) => {
  try {
    const data = req.body;
    await db.collection('comentarios').add(data);
    res.status(201).send('Comentário criado com sucesso!');
  } catch (error) {
    res.status(500).send(`Erro ao criar comentário: ${error.message}`);
  }
};

// Retorna todos os comentários
exports.getComentarios = async (req, res) => {
  try {
    const snapshot = await db.collection('comentarios').get();
    const comentarios = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(comentarios);
  } catch (error) {
    res.status(500).send(`Erro ao buscar comentários: ${error.message}`);
  }
};

// Retorna um comentário específico
exports.getComentarioById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await db.collection('comentarios').doc(id).get();
    if (!doc.exists) {
      res.status(404).send('Comentário não encontrado');
    } else {
      res.status(200).json({ id: doc.id, ...doc.data() });
    }
  } catch (error) {
    res.status(500).send(`Erro ao buscar comentário: ${error.message}`);
  }
};

// Atualiza um comentário
exports.updateComentario = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await db.collection('comentarios').doc(id).update(data);
    res.status(200).send('Comentário atualizado com sucesso!');
  } catch (error) {
    res.status(500).send(`Erro ao atualizar comentário: ${error.message}`);
  }
};

// Deleta um comentário
exports.deleteComentario = async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection('comentarios').doc(id).delete();
    res.status(200).send('Comentário deletado com sucesso!');
  } catch (error) {
    res.status(500).send(`Erro ao deletar comentário: ${error.message}`);
  }
};
