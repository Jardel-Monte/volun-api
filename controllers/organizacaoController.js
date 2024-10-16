const Organizacao = require('../models/Organizacao'); // Importa o modelo de Organização

// Cria uma nova organização
exports.createOrganizacao = async (req, res) => {
  try {
    const data = req.body;

    // Criar nova organização
    const organizacao = new Organizacao(data);
    await organizacao.save();

    res.status(201).send('Organização criada com sucesso!');
  } catch (error) {
    console.error('Erro ao criar organização:', error);
    res.status(500).send(`Erro ao criar organização: ${error.message}`);
  }
};

// Retorna todas as organizações com paginação
exports.getOrganizacoes = async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const page = parseInt(req.query.page) || 1;

    const organizacoes = await Organizacao.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.status(200).json(organizacoes);
  } catch (error) {
    console.error('Erro ao buscar organizações:', error);
    res.status(500).send(`Erro ao buscar organizações: ${error.message}`);
  }
};

// Retorna uma organização específica
exports.getOrganizacaoById = async (req, res) => {
  try {
    const id = req.params.id;
    const organizacao = await Organizacao.findById(id);

    if (!organizacao) {
      return res.status(404).send('Organização não encontrada');
    }

    res.status(200).json(organizacao);
  } catch (error) {
    console.error('Erro ao buscar organização:', error);
    res.status(500).send(`Erro ao buscar organização: ${error.message}`);
  }
};

// Atualiza uma organização
exports.updateOrganizacao = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const organizacao = await Organizacao.findById(id);
    if (!organizacao) {
      return res.status(404).send('Organização não encontrada');
    }

    // Atualizar organização
    await Organizacao.findByIdAndUpdate(id, data, { new: true });
    res.status(200).send('Organização atualizada com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar organização:', error);
    res.status(500).send(`Erro ao atualizar organização: ${error.message}`);
  }
};

// Deleta uma organização
exports.deleteOrganizacao = async (req, res) => {
  try {
    const id = req.params.id;

    const organizacao = await Organizacao.findById(id);
    if (!organizacao) {
      return res.status(404).send('Organização não encontrada');
    }

    await Organizacao.findByIdAndDelete(id);
    res.status(200).send('Organização deletada com sucesso!');
  } catch (error) {
    console.error('Erro ao deletar organização:', error);
    res.status(500).send(`Erro ao deletar organização: ${error.message}`);
  }
};
