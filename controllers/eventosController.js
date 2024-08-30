const db = require('../config/firebase-config');

// Função auxiliar para validação dos dados do evento
const validateEventoData = (data) => {
  if (!data.titulo || !data.descricao || !data.data_hora_inicio) {
    return 'Campos obrigatórios não preenchidos: título, descrição, data/hora de início.';
  }
  return null;
};

// Cria um novo evento
exports.createEvento = async (req, res) => {
  try {
    const data = req.body;

    // Validação dos dados
    const validationError = validateEventoData(data);
    if (validationError) {
      return res.status(400).send(validationError);
    }

    await db.collection('eventos').add(data);
    res.status(201).send('Evento criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    res.status(500).send(`Erro ao criar evento: ${error.message}`);
  }
};

// Retorna todos os eventos com paginação
exports.getEventos = async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const page = parseInt(req.query.page) || 1;

    const snapshot = await db.collection('eventos')
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .get();

    const eventos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(eventos);
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    res.status(500).send(`Erro ao buscar eventos: ${error.message}`);
  }
};

// Retorna um evento específico
exports.getEventoById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await db.collection('eventos').doc(id).get();

    if (!doc.exists) {
      return res.status(404).send('Evento não encontrado');
    }

    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Erro ao buscar evento:', error);
    res.status(500).send(`Erro ao buscar evento: ${error.message}`);
  }
};

// Atualiza um evento
exports.updateEvento = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    // Validação dos dados
    const validationError = validateEventoData(data);
    if (validationError) {
      return res.status(400).send(validationError);
    }

    const doc = await db.collection('eventos').doc(id).get();
    if (!doc.exists) {
      return res.status(404).send('Evento não encontrado');
    }

    await db.collection('eventos').doc(id).update(data);
    res.status(200).send('Evento atualizado com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar evento:', error);
    res.status(500).send(`Erro ao atualizar evento: ${error.message}`);
  }
};

// Deleta um evento
exports.deleteEvento = async (req, res) => {
  try {
    const id = req.params.id;

    const doc = await db.collection('eventos').doc(id).get();
    if (!doc.exists) {
      return res.status(404).send('Evento não encontrado');
    }

    await db.collection('eventos').doc(id).delete();
    res.status(200).send('Evento deletado com sucesso!');
  } catch (error) {
    console.error('Erro ao deletar evento:', error);
    res.status(500).send(`Erro ao deletar evento: ${error.message}`);
  }
};
