const db = require('../config/firebase-config');

// Função auxiliar para validar a existência de uma ação de moderação
const validateAcaoModeracaoExistence = async (id) => {
  const doc = await db.collection('acoes_moderacao').doc(id).get();
  if (!doc.exists) {
    return 'Ação de moderação não encontrada.';
  }
  return null;
};

// Cria uma nova ação de moderação
exports.createAcaoModeracao = async (req, res) => {
  try {
    const data = req.body;
    if (!data || typeof data !== 'object') {
      return res.status(400).send('Dados inválidos para criar ação de moderação.');
    }
    await db.collection('acoes_moderacao').add(data);
    res.status(201).send('Ação de moderação criada com sucesso!');
  } catch (error) {
    console.error('Erro ao criar ação de moderação:', error);
    res.status(500).send(`Erro ao criar ação de moderação: ${error.message}`);
  }
};

// Retorna todas as ações de moderação com paginação
exports.getAcoesModeracao = async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const page = parseInt(req.query.page) || 1;

    const snapshot = await db.collection('acoes_moderacao')
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .get();

    const acoesModeracao = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(acoesModeracao);
  } catch (error) {
    console.error('Erro ao buscar ações de moderação:', error);
    res.status(500).send(`Erro ao buscar ações de moderação: ${error.message}`);
  }
};

// Retorna uma ação de moderação específica
exports.getAcaoModeracaoById = async (req, res) => {
  try {
    const id = req.params.id;
    const validationError = await validateAcaoModeracaoExistence(id);
    if (validationError) {
      return res.status(404).send(validationError);
    }

    const doc = await db.collection('acoes_moderacao').doc(id).get();
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Erro ao buscar ação de moderação:', error);
    res.status(500).send(`Erro ao buscar ação de moderação: ${error.message}`);
  }
};

// Atualiza uma ação de moderação
exports.updateAcaoModeracao = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const validationError = await validateAcaoModeracaoExistence(id);
    if (validationError) {
      return res.status(404).send(validationError);
    }

    if (!data || typeof data !== 'object') {
      return res.status(400).send('Dados inválidos para atualizar ação de moderação.');
    }

    await db.collection('acoes_moderacao').doc(id).update(data);
    res.status(200).send('Ação de moderação atualizada com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar ação de moderação:', error);
    res.status(500).send(`Erro ao atualizar ação de moderação: ${error.message}`);
  }
};

// Deleta uma ação de moderação
exports.deleteAcaoModeracao = async (req, res) => {
  try {
    const id = req.params.id;

    const validationError = await validateAcaoModeracaoExistence(id);
    if (validationError) {
      return res.status(404).send(validationError);
    }

    await db.collection('acoes_moderacao').doc(id).delete();
    res.status(200).send('Ação de moderação deletada com sucesso!');
  } catch (error) {
    console.error('Erro ao deletar ação de moderação:', error);
    res.status(500).send(`Erro ao deletar ação de moderação: ${error.message}`);
  }
};
