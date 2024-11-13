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

// Retorna todas as participações
exports.getParticipacoes = async (req, res) => {
  try {
    const participacoes = await Participacao.find();
    res.status(200).json(participacoes);
  } catch (error) {
    console.error('Erro ao buscar participações:', error);
    res.status(500).send(`Erro ao buscar participações: ${error.message}`);
  }
};

// Retorna participações por usuario_id
exports.getParticipacoesByUsuario = async (req, res) => {
  try {
    const participacoes = await Participacao.find({ usuario_id: req.params.usuario_id });
    if (participacoes.length === 0) {
      return res.status(404).send('Nenhuma participação encontrada para o usuário fornecido.');
    }
    res.status(200).json(participacoes);
  } catch (error) {
    console.error('Erro ao buscar participações por usuário:', error);
    res.status(500).send(`Erro ao buscar participações: ${error.message}`);
  }
};

// Retorna participações por eventos_id
exports.getParticipacoesByEvento = async (req, res) => {
  try {
    const participacoes = await Participacao.find({ eventos_id: req.params.eventos_id });
    if (participacoes.length === 0) {
      return res.status(404).send('Nenhuma participação encontrada para o evento fornecido.');
    }
    res.status(200).json(participacoes);
  } catch (error) {
    console.error('Erro ao buscar participações por evento:', error);
    res.status(500).send(`Erro ao buscar participações: ${error.message}`);
  }
};



// Retorna participações por status
exports.getParticipacoesByStatus = async (req, res) => {
  try {
    const participacoes = await Participacao.find({ status: req.params.status });
    if (participacoes.length === 0) {
      return res.status(404).send('Nenhuma participação encontrada com o status fornecido.');
    }
    res.status(200).json(participacoes);
  } catch (error) {
    console.error('Erro ao buscar participações por status:', error);
    res.status(500).send(`Erro ao buscar participações: ${error.message}`);
  }
};