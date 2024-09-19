const { db } = require('../config/firebase-config');
const algoliasearch = require('algoliasearch');

// Inicializa o cliente Algolia
const client = algoliasearch('JUIX37JGYV', 'fef86dcef0788abd2239d85843e8565c');
const index = client.initIndex('eventos');

// Função auxiliar para validação dos dados do evento
const validateEventoData = (data) => {
  if (!data.titulo || !data.descricao || !data.data_hora_inicio) {
    return 'Campos obrigatórios não preenchidos: título, descrição, data/hora de início.';
  }
  if (!Array.isArray(data.tags)) {
    return 'O campo "tags" deve ser um array de strings.';
  }
  return null;
};

// Cria um novo evento e o indexa no Algolia
exports.createEvento = async (req, res) => {
  try {
    const data = req.body;

    // Log dos dados recebidos
    console.log('Dados recebidos:', data);

    // Validação dos dados
    const validationError = validateEventoData(data);
    if (validationError) {
      return res.status(400).send(validationError);
    }

    const docRef = await db.collection('eventos').add(data);
    const evento = { id: docRef.id, ...data };

    // Indexa o evento no Algolia
    await index.saveObject(evento, { autoGenerateObjectIDIfNotExist: true });

    res.status(201).send('Evento criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    res.status(500).send(`Erro ao criar evento: ${error.message}`);
  }
};

// Retorna todos os eventos
exports.getEventos = async (req, res) => {
  try {
    const snapshot = await db.collection('eventos').get();
    if (snapshot.empty) {
      return res.status(404).send('Nenhum evento encontrado');
    }

    const eventos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(eventos);
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    res.status(500).send(`Erro ao buscar eventos: ${error.message}`);
  }
};

// Retorna eventos por título com busca avançada no Algolia
exports.getEventosByTitulo = async (req, res) => {
  try {
    const titulo = req.query.titulo;
    if (!titulo) {
      return res.status(400).send('O parâmetro "titulo" é obrigatório');
    }

    // Busca no Algolia
    const { hits } = await index.search(titulo, {
      attributesToRetrieve: ['id', 'titulo', 'descricao'],
      hitsPerPage: 10,
    });

    if (hits.length === 0) {
      return res.status(404).send('Nenhum evento encontrado com esse título');
    }

    res.status(200).json(hits);
  } catch (error) {
    console.error('Erro ao buscar eventos por título:', error);
    res.status(500).send(`Erro ao buscar eventos por título: ${error.message}`);
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

    // Atualiza o evento no Algolia
    const evento = { id, ...data };
    await index.saveObject(evento);

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

    // Remove o evento do Algolia
    await index.deleteObject(id);

    res.status(200).send('Evento deletado com sucesso!');
  } catch (error) {
    console.error('Erro ao deletar evento:', error);
    res.status(500).send(`Erro ao deletar evento: ${error.message}`);
  }
};
