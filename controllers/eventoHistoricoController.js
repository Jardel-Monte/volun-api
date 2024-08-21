const db = require('../config/firebase-config');

// Cria um novo histórico de evento
exports.createEventoHistorico = async (req, res) => {
  try {
    const data = req.body;
    await db.collection('evento_historico').add(data);
    res.status(201).send('Histórico de evento criado com sucesso!');
  } catch (error) {
    res.status(500).send(`Erro ao criar histórico de evento: ${error.message}`);
  }
};

// Retorna todos os históricos de evento
exports.getEventosHistorico = async (req, res) => {
  try {
    const snapshot = await db.collection('evento_historico').get();
    const historico = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(historico);
  } catch (error) {
    res.status(500).send(`Erro ao buscar históricos de evento: ${error.message}`);
  }
};

// Retorna um histórico de evento específico
exports.getEventoHistoricoById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await db.collection('evento_historico').doc(id).get();
    if (!doc.exists) {
      res.status(404).send('Histórico de evento não encontrado');
    } else {
      res.status(200).json({ id: doc.id, ...doc.data() });
    }
  } catch (error) {
    res.status(500).send(`Erro ao buscar histórico de evento: ${error.message}`);
  }
};

// Atualiza um histórico de evento
exports.updateEventoHistorico = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await db.collection('evento_historico').doc(id).update(data);
    res.status(200).send('Histórico de evento atualizado com sucesso!');
  } catch (error) {
    res.status(500).send(`Erro ao atualizar histórico de evento: ${error.message}`);
  }
};

// Deleta um histórico de evento
exports.deleteEventoHistorico = async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection('evento_historico').doc(id).delete();
    res.status(200).send('Histórico de evento deletado com sucesso!');
  } catch (error) {
    res.status(500).send(`Erro ao deletar histórico de evento: ${error.message}`);
  }
};
