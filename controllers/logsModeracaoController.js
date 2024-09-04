const { db }= require('../config/firebase-config');

// Função auxiliar para validar a existência de um log de moderação
const validateLogModeracaoExistence = async (id) => {
  const doc = await db.collection('logs_moderacao').doc(id).get();
  if (!doc.exists) {
    return 'Log de moderação não encontrado.';
  }
  return null;
};

// Cria um novo log de moderação
exports.createLogModeracao = async (req, res) => {
  try {
    const data = req.body;
    if (!data || typeof data !== 'object') {
      return res.status(400).send('Dados inválidos para criar log de moderação.');
    }
    await db.collection('logs_moderacao').add(data);
    res.status(201).send('Log de moderação criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar log de moderação:', error);
    res.status(500).send(`Erro ao criar log de moderação: ${error.message}`);
  }
};

// Retorna todos os logs de moderação com paginação
exports.getLogsModeracao = async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const page = parseInt(req.query.page) || 1;

    const snapshot = await db.collection('logs_moderacao')
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .get();

    const logsModeracao = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(logsModeracao);
  } catch (error) {
    console.error('Erro ao buscar logs de moderação:', error);
    res.status(500).send(`Erro ao buscar logs de moderação: ${error.message}`);
  }
};

// Retorna um log de moderação específico
exports.getLogModeracaoById = async (req, res) => {
  try {
    const id = req.params.id;
    const validationError = await validateLogModeracaoExistence(id);
    if (validationError) {
      return res.status(404).send(validationError);
    }

    const doc = await db.collection('logs_moderacao').doc(id).get();
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Erro ao buscar log de moderação:', error);
    res.status(500).send(`Erro ao buscar log de moderação: ${error.message}`);
  }
};

// Atualiza um log de moderação
exports.updateLogModeracao = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const validationError = await validateLogModeracaoExistence(id);
    if (validationError) {
      return res.status(404).send(validationError);
    }

    if (!data || typeof data !== 'object') {
      return res.status(400).send('Dados inválidos para atualizar log de moderação.');
    }

    await db.collection('logs_moderacao').doc(id).update(data);
    res.status(200).send('Log de moderação atualizado com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar log de moderação:', error);
    res.status(500).send(`Erro ao atualizar log de moderação: ${error.message}`);
  }
};

// Deleta um log de moderação
exports.deleteLogModeracao = async (req, res) => {
  try {
    const id = req.params.id;

    const validationError = await validateLogModeracaoExistence(id);
    if (validationError) {
      return res.status(404).send(validationError);
    }

    await db.collection('logs_moderacao').doc(id).delete();
    res.status(200).send('Log de moderação deletado com sucesso!');
  } catch (error) {
    console.error('Erro ao deletar log de moderação:', error);
    res.status(500).send(`Erro ao deletar log de moderação: ${error.message}`);
  }
};
