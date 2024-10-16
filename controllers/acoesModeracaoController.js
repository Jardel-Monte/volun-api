const AcoesModeracao = require('../models/AcoesModeracao');

// Cria uma nova ação de moderação
exports.createAcaoModeracao = async (req, res) => {
  try {
    const data = req.body;

    // Validação de dados obrigatórios
    if (!data.moderador_id || !data.alvo_tipo || !data.alvo_id || !data.acao) {
      return res.status(400).send('Campos obrigatórios não preenchidos: moderador_id, alvo_tipo, alvo_id, acao');
    }

    const novaAcao = new AcoesModeracao(data);
    await novaAcao.save();
    res.status(201).send('Ação de moderação criada com sucesso!');
  } catch (error) {
    console.error('Erro ao criar ação de moderação:', error);
    res.status(500).send(`Erro ao criar ação de moderação: ${error.message}`);
  }
};


// Obtém todas as ações de moderação com paginação
exports.getAcoesModeracao = async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const page = parseInt(req.query.page) || 1;

    const acoes = await AcoesModeracao.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.status(200).json(acoes);
  } catch (error) {
    console.error('Erro ao buscar ações de moderação:', error);
    res.status(500).send(`Erro ao buscar ações de moderação: ${error.message}`);
  }
};


// Obtém uma ação de moderação específica por ID
exports.getAcaoModeracaoById = async (req, res) => {
  try {
    const id = req.params.id;
    const acao = await AcoesModeracao.findById(id);

    if (!acao) {
      return res.status(404).send('Ação de moderação não encontrada');
    }

    res.status(200).json(acao);
  } catch (error) {
    console.error('Erro ao buscar ação de moderação:', error);
    res.status(500).send(`Erro ao buscar ação de moderação: ${error.message}`);
  }
};


// Retorna ações de moderação associadas a um moderador específico
exports.getAcoesByModeradorId = async (req, res) => {
  try {
    const moderador_id = req.params.moderador_id;
    
    const acoes = await AcoesModeracao.find({ moderador_id });

    if (acoes.length === 0) {
      return res.status(404).send('Nenhuma ação de moderação encontrada para este moderador.');
    }

    res.status(200).json(acoes);
  } catch (error) {
    console.error('Erro ao buscar ações de moderação pelo moderador_id:', error);
    res.status(500).send(`Erro ao buscar ações de moderação: ${error.message}`);
  }
};



// Atualiza uma ação de moderação
exports.updateAcaoModeracao = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const acao = await AcoesModeracao.findById(id);
    if (!acao) {
      return res.status(404).send('Ação de moderação não encontrada');
    }

    await AcoesModeracao.findByIdAndUpdate(id, data, { new: true });
    res.status(200).send('Ação de moderação atualizada com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar ação de moderação:', error);
    res.status(500).send(`Erro ao atualizar ação de moderação: ${error.message}`);
  }
};

// Deleta uma ação de moderação
exports.deleteAcaoModeracao = async (req, res) => {
  try {
    const id = req.params.id;

    const acao = await AcoesModeracao.findById(id);
    if (!acao) {
      return res.status(404).send('Ação de moderação não encontrada');
    }

    await AcoesModeracao.findByIdAndDelete(id);
    res.status(200).send('Ação de moderação deletada com sucesso!');
  } catch (error) {
    console.error('Erro ao deletar ação de moderação:', error);
    res.status(500).send(`Erro ao deletar ação de moderação: ${error.message}`);
  }
};
