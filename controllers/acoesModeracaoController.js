const db = require('../config/firebase-config');

// Cria uma nova ação de moderação
exports.createAcaoModeracao = async (req, res) => {
  try {
    const data = req.body;
    await db.collection('acoes_moderacao').add(data);
    res.status(201).send('Ação de moderação criada com sucesso!');
  } catch (error) {
    res.status(500).send(`Erro ao criar ação de moderação: ${error.message}`);
  }
};

// Retorna todas as ações de moderação
exports.getAcoesModeracao = async (req, res) => {
  try {
    const snapshot = await db.collection('acoes_moderacao').get();
    const acoesModeracao = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(acoesModeracao);
  } catch (error) {
    res.status(500).send(`Erro ao buscar ações de moderação: ${error.message}`);
  }
};

// Retorna uma ação de moderação específica
exports.getAcaoModeracaoById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await db.collection('acoes_moderacao').doc(id).get();
    if (!doc.exists) {
      res.status(404).send('Ação de moderação não encontrada');
    } else {
      res.status(200).json({ id: doc.id, ...doc.data() });
    }
  } catch (error) {
    res.status(500).send(`Erro ao buscar ação de moderação: ${error.message}`);
  }
};

// Atualiza uma ação de moderação
exports.updateAcaoModeracao = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await db.collection('acoes_moderacao').doc(id).update(data);
    res.status(200).send('Ação de moderação atualizada com sucesso!');
  } catch (error) {
    res.status(500).send(`Erro ao atualizar ação de moderação: ${error.message}`);
  }
};

// Deleta uma ação de moderação
exports.deleteAcaoModeracao = async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection('acoes_moderacao').doc(id).delete();
    res.status(200).send('Ação de moderação deletada com sucesso!');
  } catch (error) {
    res.status(500).send(`Erro ao deletar ação de moderação: ${error.message}`);
  }
};
