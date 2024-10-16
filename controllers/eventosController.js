const Evento = require('../models/Eventos');

// Cria um novo evento
exports.createEvento = async (req, res) => {
  try {
    const { titulo, descricao, tags, data_inicio, data_fim, imagem, vaga_limite, ong_id } = req.body;

    const novoEvento = new Evento({
      titulo,
      descricao,
      tags,
      data_inicio,
      data_fim,
      imagem,
      vaga_limite,
      ong_id,
    });

    await novoEvento.save();
    res.status(201).send('Evento criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    res.status(500).send(`Erro ao criar evento: ${error.message}`);
  }
};

// Retorna todos os eventos
exports.getEventos = async (req, res) => {
  try {
    const eventos = await Evento.find().populate('ong_id');
    res.status(200).json(eventos);
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    res.status(500).send(`Erro ao buscar eventos: ${error.message}`);
  }
};

// Retorna um evento específico por ID
exports.getEventoById = async (req, res) => {
  try {
    const id = req.params.id;
    const evento = await Evento.findById(id).populate('ong_id');

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
    const id = req.params.id;
    const data = req.body;

    const evento = await Evento.findByIdAndUpdate(id, data, { new: true });

    if (!evento) {
      return res.status(404).send('Evento não encontrado');
    }

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

    const evento = await Evento.findByIdAndDelete(id);
    if (!evento) {
      return res.status(404).send('Evento não encontrado');
    }

    res.status(200).send('Evento deletado com sucesso!');
  } catch (error) {
    console.error('Erro ao deletar evento:', error);
    res.status(500).send(`Erro ao deletar evento: ${error.message}`);
  }
};
