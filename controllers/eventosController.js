const Evento = require('../models/Eventos');
const index = require('../services/algoliaConfig');

// Cria um novo evento
exports.createEvento = async (req, res) => {
  try {
    const novoEvento = new Evento(req.body); 
    await novoEvento.save();

    // Envia o novo evento para o Algolia
    await index.saveObject({
      objectID: novoEvento._id.toString(), // Garante que o ID do documento no MongoDB seja o objectID no Algolia
      ...req.body, // Adiciona os dados do evento
    });

    res.status(201).send('Evento criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    res.status(500).send(`Erro ao criar evento: ${error.message}`);
  }
};

// Retorna todos os eventos
exports.getEventos = async (req, res) => {
  try {
    const eventos = await Evento.find()
      .populate('ong_id'); // Popula todos os campos de 'ong_id'
    res.status(200).json(eventos);
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    res.status(500).send(`Erro ao buscar eventos: ${error.message}`);
  }
};

// Retorna um evento específico por ID
exports.getEventoById = async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id)
      .populate('ong_id'); // Popula todos os campos de 'ong_id'
    if (!evento) {
      return res.status(404).send('Evento não encontrado');
    }
    res.status(200).json(evento);
  } catch (error) {
    console.error('Erro ao buscar evento:', error);
    res.status(500).send(`Erro ao buscar evento: ${error.message}`);
  }
};

// Atualiza um evento
exports.updateEvento = async (req, res) => {
  try {
    const evento = await Evento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!evento) {
      return res.status(404).send('Evento não encontrado');
    }

    // Atualiza o evento no Algolia
    await index.partialUpdateObject({
      objectID: req.params.id,
      ...req.body, // Atualiza os dados do evento no Algolia
    });

    res.status(200).send('Evento atualizado com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar evento:', error);
    res.status(500).send(`Erro ao atualizar evento: ${error.message}`);
  }
};

// Deleta um evento
exports.deleteEvento = async (req, res) => {
  try {
    const evento = await Evento.findByIdAndDelete(req.params.id);
    if (!evento) {
      return res.status(404).send('Evento não encontrado');
    }

    // Deleta o evento do Algolia
    await index.deleteObject(req.params.id);

    res.status(200).send('Evento deletado com sucesso!');
  } catch (error) {
    console.error('Erro ao deletar evento:', error);
    res.status(500).send(`Erro ao deletar evento: ${error.message}`);
  }
};
