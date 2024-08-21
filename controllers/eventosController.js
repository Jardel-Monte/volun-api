const db = require('../config/firebase-config');

// Cria um novo evento
exports.createEvento = async (req, res) => {
  try {
    const data = req.body;
    await db.collection('eventos').add(data);
    res.status(201).send('Evento criado com sucesso!');
  } catch (error) {
    res.status(500).send(`Erro ao criar evento: ${error.message}`);
  }
};

// Retorna todos os eventos
exports.getEventos = async (req, res) => {
  try {
    const snapshot = await db.collection('eventos').get();
    const eventos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(eventos);
  } catch (error) {
    res.status(500).send(`Erro ao buscar eventos: ${error.message}`);
  }
};

// Retorna um evento específico
exports.getEventoById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await db.collection('eventos').doc(id).get();
    if (!doc.exists) {
      res.status(404).send('Evento não encontrado');
    } else {
      res.status(200).json({ id: doc.id, ...doc.data() });
    }
  } catch (error) {
    res.status(500).send(`Erro ao buscar evento: ${error.message}`);
  }
};

// Atualiza um evento
exports.updateEvento = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await db.collection('eventos').doc(id).update(data);
    res.status(200).send('Evento atualizado com sucesso!');
  } catch (error) {
    res.status(500).send(`Erro ao atualizar evento: ${error.message}`);
  }
};

// Deleta um evento
exports.deleteEvento = async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection('eventos').doc(id).delete();
    res.status(200).send('Evento deletado com sucesso!');
  } catch (error) {
    res.status(500).send(`Erro ao deletar evento: ${error.message}`);
  }
};
