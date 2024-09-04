const { db } = require('../config/firebase-config');

// Função auxiliar para validar a existência de um histórico de evento
const validateEventoHistoricoExistence = async (id) => {
  const doc = await db.collection('evento_historico').doc(id).get();
  if (!doc.exists) {
    return 'Histórico de evento não encontrado.';
  }
  return null;
};

// Cria um novo histórico de evento
exports.createEventoHistorico = async (req, res) => {
  try {
    const data = req.body;
    if (!data || typeof data !== 'object') {
      return res.status(400).send('Dados inválidos para criar histórico de evento.');
    }
    await db.collection('evento_historico').add(data);
    res.status(201).send('Histórico de evento criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar histórico de evento:', error);
    res.status(500).send(`Erro ao criar histórico de evento: ${error.message}`);
  }
};

// Retorna todos os históricos de evento com paginação
exports.getEventosHistorico = async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const page = parseInt(req.query.page) || 1;

    const snapshot = await db.collection('evento_historico')
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .get();

    const historico = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(historico);
  } catch (error) {
    console.error('Erro ao buscar históricos de evento:', error);
    res.status(500).send(`Erro ao buscar históricos de evento: ${error.message}`);
  }
};

// Retorna um histórico de evento específico
exports.getEventoHistoricoById = async (req, res) => {
  try {
    const id = req.params.id;
    const validationError = await validateEventoHistoricoExistence(id);
    if (validationError) {
      return res.status(404).send(validationError);
    }

    const doc = await db.collection('evento_historico').doc(id).get();
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Erro ao buscar histórico de evento:', error);
    res.status(500).send(`Erro ao buscar histórico de evento: ${error.message}`);
  }
};

// Atualiza um histórico de evento
exports.updateEventoHistorico = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const validationError = await validateEventoHistoricoExistence(id);
    if (validationError) {
      return res.status(404).send(validationError);
    }

    if (!data || typeof data !== 'object') {
      return res.status(400).send('Dados inválidos para atualizar histórico de evento.');
    }

    await db.collection('evento_historico').doc(id).update(data);
    res.status(200).send('Histórico de evento atualizado com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar histórico de evento:', error);
    res.status(500).send(`Erro ao atualizar histórico de evento: ${error.message}`);
  }
};

// Deleta um histórico de evento
exports.deleteEventoHistorico = async (req, res) => {
  try {
    const id = req.params.id;

    const validationError = await validateEventoHistoricoExistence(id);
    if (validationError) {
      return res.status(404).send(validationError);
    }

    await db.collection('evento_historico').doc(id).delete();
    res.status(200).send('Histórico de evento deletado com sucesso!');
  } catch (error) {
    console.error('Erro ao deletar histórico de evento:', error);
    res.status(500).send(`Erro ao deletar histórico de evento: ${error.message}`);
  }
};
