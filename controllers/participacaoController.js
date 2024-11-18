const Participacao = require('../models/Participacao');

// Cria uma nova participação
exports.createParticipacao = async (req, res) => {
  try {
    const novaParticipacao = new Participacao(req.body);
    await novaParticipacao.save();
    res.status(201).json(novaParticipacao);
  } catch (error) {
    console.error('Erro ao criar participação:', error);
    res.status(500).send(`Erro ao criar participação: ${error.message}`);
  }
};

// Retorna todas as participações, populando informações do evento
exports.getParticipacoes = async (req, res) => {
  try {
    const participacoes = await Participacao.find().populate('evento_id', 'titulo descricao data_inicio imagem vaga_limite');
    res.status(200).json(participacoes);
  } catch (error) {
    console.error('Erro ao buscar participações:', error);
    res.status(500).send(`Erro ao buscar participações: ${error.message}`);
  }
};

// Retorna participações por usuario_id, populando informações do evento
exports.getParticipacoesByUsuario = async (req, res) => {
  try {
    const participacoes = await Participacao.find({ usuario_id: req.params.usuario_id })
      .populate('evento_id', 'titulo descricao data_inicio imagem vaga_limite');

    if (participacoes.length === 0) {
      return res.status(404).send('Nenhuma participação encontrada para o usuário fornecido.');
    }
    res.status(200).json(participacoes);
  } catch (error) {
    console.error('Erro ao buscar participações por usuário:', error);
    res.status(500).send(`Erro ao buscar participações: ${error.message}`);
  }
};

// Retorna participações por evento_id, populando informações do evento
exports.getParticipacoesByEvento = async (req, res) => {
  try {
    const participacoes = await Participacao.find({ evento_id: req.params.evento_id })
      .populate('evento_id', 'titulo descricao data_inicio imagem vaga_limite');

    if (participacoes.length === 0) {
      return res.status(404).send('Nenhuma participação encontrada para o evento fornecido.');
    }
    res.status(200).json(participacoes);
  } catch (error) {
    console.error('Erro ao buscar participações por evento:', error);
    res.status(500).send(`Erro ao buscar participações: ${error.message}`);
  }
};

// Retorna participações por status, populando informações do evento
exports.getParticipacoesByStatus = async (req, res) => {
  try {
    const participacoes = await Participacao.find({ status: req.params.status })
      .populate('evento_id', 'titulo descricao data_inicio imagem vaga_limite');

    if (participacoes.length === 0) {
      return res.status(404).send('Nenhuma participação encontrada com o status fornecido.');
    }
    res.status(200).json(participacoes);
  } catch (error) {
    console.error('Erro ao buscar participações por status:', error);
    res.status(500).send(`Erro ao buscar participações: ${error.message}`);
  }
};

// Atualiza uma participação
exports.updateParticipacao = async (req, res) => {
  try {
    const participacaoAtualizada = await Participacao.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('evento_id', 'titulo descricao data_inicio imagem vaga_limite');

    if (!participacaoAtualizada) {
      return res.status(404).send('Participação não encontrada.');
    }

    res.status(200).json(participacaoAtualizada);
  } catch (error) {
    console.error('Erro ao atualizar participação:', error);
    res.status(500).send(`Erro ao atualizar participação: ${error.message}`);
  }
};

// Exclui uma participação
exports.deleteParticipacao = async (req, res) => {
  try {
    const participacaoRemovida = await Participacao.findByIdAndDelete(req.params.id);

    if (!participacaoRemovida) {
      return res.status(404).send('Participação não encontrada.');
    }

    res.status(200).json({ message: 'Participação removida com sucesso!' });
  } catch (error) {
    console.error('Erro ao excluir participação:', error);
    res.status(500).send(`Erro ao excluir participação: ${error.message}`);
  }
};

// Retorna uma participação específica com base no usuario_id e evento_id
exports.getParticipacaoByUsuarioAndEvento = async (req, res) => {
  try {
    const { usuario_id, evento_id } = req.params;

    // Busca uma participação com base no usuario_id e evento_id
    const participacao = await Participacao.findOne({ usuario_id, evento_id })
      .populate('evento_id', 'titulo descricao data_inicio imagem vaga_limite');

    if (!participacao) {
      return res.status(404).send('Participação não encontrada para os parâmetros fornecidos.');
    }

    res.status(200).json(participacao);
  } catch (error) {
    console.error('Erro ao buscar participação por usuário e evento:', error);
    res.status(500).send(`Erro ao buscar participação: ${error.message}`);
  }
};
