const EventosHistorico = require('../models/eventosHistorico');
// const verificarOuCriarHistoricoEAssociarEventos = require('../utils/utils');

// Cria um novo registro de histórico de eventos
exports.createEventosHistorico = async (req, res) => {
    try {
        const novoHistorico = new EventosHistorico(req.body);
        await novoHistorico.save();
        res.status(201).json(novoHistorico);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar o histórico de eventos.' });
    }
};

exports.getAllEventosHistorico = async (req, res) => {
  try {
      // await verificarOuCriarHistoricoEAssociarEventos();
      const historicos = await EventosHistorico.find()
          .populate('eventos_id', 'titulo descricao data_inicio imagem vaga_limite')
          .populate('ong_id', 'nome img_logo');
      res.status(200).json(historicos);
  } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar o histórico de eventos.' });
  }
};


// Busca um registro específico de histórico de eventos pelo ID
exports.getEventosHistoricoById = async (req, res) => {
    try {
        const historico = await EventosHistorico.findById(req.params.id)
            .populate('eventos_id', 'titulo descricao data_inicio imagem vaga_limite')
            .populate('ong_id', 'nome img_logo');
        if (!historico) {
            return res.status(404).json({ error: 'Histórico de eventos não encontrado.' });
        }
        res.status(200).json(historico);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o histórico de eventos.' });
    }
};

// Atualiza um registro específico de histórico de eventos pelo ID
exports.updateEventosHistorico = async (req, res) => {
    try {
        const historicoAtualizado = await EventosHistorico.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
            .populate('eventos_id', 'titulo descricao data_inicio imagem vaga_limite')
            .populate('ong_id', 'nome img_logo');
        if (!historicoAtualizado) {
            return res.status(404).json({ error: 'Histórico de eventos não encontrado.' });
        }
        res.status(200).json(historicoAtualizado);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar o histórico de eventos.' });
    }
};

// Exclui um registro específico de histórico de eventos pelo ID
exports.deleteEventosHistorico = async (req, res) => {
    try {
        const historicoExcluido = await EventosHistorico.findByIdAndDelete(req.params.id);
        if (!historicoExcluido) {
            return res.status(404).json({ error: 'Histórico de eventos não encontrado.' });
        }
        res.status(200).json({ message: 'Histórico de eventos excluído com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir o histórico de eventos.' });
    }
};

// Busca por histórico de eventos com base no usuario_id
exports.getEventosHistoricoByUsuarioId = async (req, res) => {
    try {
        const historicos = await EventosHistorico.find({ usuario_id: req.params.usuario_id })
            .populate('eventos_id', 'titulo descricao data_inicio imagem vaga_limite')
            .populate('ong_id');
        res.status(200).json(historicos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o histórico de eventos pelo usuario_id.' });
    }
};

// Busca por histórico de eventos com base no ong_id
exports.getEventosHistoricoByOrgId = async (req, res) => {
    try {
        const historicos = await EventosHistorico.find({ ong_id: req.params.ong_id })
            .populate('eventos_id', 'titulo descricao data_inicio imagem vaga_limite')
            .populate('ong_id', 'nome img_logo');
        res.status(200).json(historicos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o histórico de eventos pelo ong_id.' });
    }
};
