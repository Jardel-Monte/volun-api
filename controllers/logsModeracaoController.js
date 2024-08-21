const db = require('../config/firebase-config');

// Cria um novo log de moderação
exports.createLogModeracao = async (req, res) => {
  try {
    const data = req.body;
    await db.collection('logs_moderacao').add(data);
    res.status(201).send('Log de moderação criado com sucesso!');
  } catch (error) {
    res.status(500).send(`Erro ao criar log de moderação: ${error.message}`);
  }
};

// Retorna todos os logs de moderação
exports.getLogsModeracao = async (req, res) => {
  try {
    const snapshot = await db.collection('logs_moderacao').get();
    const logsModeracao = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(logsModeracao);
  } catch (error) {
    res.status(500).send(`Erro ao buscar logs de moderação: ${error.message}`);
  }
};

// Retorna um log de moderação específico
exports.getLogModeracaoById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await db.collection('logs_moderacao').doc(id).get();
    if (!doc.exists) {
      res.status(404).send('Log de moderação não encontrado');
    } else {
      res.status(200).json({ id: doc.id, ...doc.data() });
    }
  } catch (error) {
    res.status(500).send(`Erro ao buscar log de moderação: ${error.message}`);
  }
};

// Atualiza um log de moderação
exports.updateLogModeracao = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await db.collection('logs_moderacao').doc(id).update(data);
    res.status(200).send('Log de moderação atualizado com sucesso!');
  } catch (error) {
    res.status(500).send(`Erro ao atualizar log de moderação: ${error.message}`);
  }
};

// Deleta um log de moderação
exports.deleteLogModeracao = async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection('logs_moderacao').doc(id).delete();
    res.status(200).send('Log de moderação deletado com sucesso!');
  } catch (error) {
    res.status(500).send(`Erro ao deletar log de moderação: ${error.message}`);
  }
};
