const Evento = require('../models/Eventos');
const index = require('../services/algoliaConfig');
const mapearEventoParaAlgolia = require('../models/AlgoliaMapper');
const Comentario = require('../models/Comentario');
const Participacao = require('../models/Participacao');

// Cria um novo evento
exports.createEvento = async (req, res) => {
  try {
    const novoEvento = new Evento(req.body);
    await novoEvento.save();

    let eventoMapeado;
    try {
      eventoMapeado = await mapearEventoParaAlgolia(novoEvento);
    } catch (error) {
      if (error.message === 'Organização não encontrada' || error.message === 'Endereço não encontrado') {
        return res.status(404).send(error.message);
      }
      throw error;
    }

    // Envia o novo evento para o Algolia
    await index.saveObject(eventoMapeado);

    res.status(201).send('Evento criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    res.status(500).send(`Erro ao criar evento: ${error.message}`);
  }
};

// Retorna todos os eventos
exports.getEventos = async (req, res) => {
  try {
    const eventos = await Evento.find().populate('ong_id').populate('endereco_id'); // Popula todos os campos de 'ong_id' e 'endereco_id'
    res.status(200).json(eventos);
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    res.status(500).send(`Erro ao buscar eventos: ${error.message}`);
  }
};

// Retorna um evento específico por ID
exports.getEventoById = async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id).populate('ong_id').populate('endereco_id'); // Popula 'ong_id' e 'endereco_id'
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

    // Mapeia o evento atualizado para o formato do Algolia
    let eventoMapeado;
    try {
      eventoMapeado = await mapearEventoParaAlgolia(evento);
    } catch (error) {
      if (error.message === 'Organização não encontrada' || error.message === 'Endereço não encontrado') {
        return res.status(404).send(error.message);
      }
      throw error;
    }

    // Atualiza o evento no Algolia
    await index.partialUpdateObject(eventoMapeado);

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

    await Comentario.deleteMany({ evento_id: id });
    await Participacao.deleteMany({ evento_id: id });

    // Deleta o evento do Algolia
    await index.deleteObject(evento._id.toString());

    res.status(200).send('Evento deletado com sucesso!');
  } catch (error) {
    console.error('Erro ao deletar evento:', error);
    res.status(500).send(`Erro ao deletar evento: ${error.message}`);
  }
};

// Retorna eventos por ong_id
exports.getEventosByOngId = async (req, res) => {
  try {
    const { ong_id } = req.params; // Obtém o ID da ONG dos parâmetros da rota
    const eventos = await Evento.find({ ong_id }).populate('ong_id').populate('endereco_id'); // Busca os eventos com o ID da ONG e popula os campos relacionados

    if (!eventos || eventos.length === 0) {
      return res.status(404).send('Nenhum evento encontrado para esta ONG.');
    }

    res.status(200).json(eventos);
  } catch (error) {
    console.error('Erro ao buscar eventos por ong_id:', error);
    res.status(500).send(`Erro ao buscar eventos por ong_id: ${error.message}`);
  }
};

