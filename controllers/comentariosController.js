const Comentario = require('../models/comentario');

// Cria um novo comentário
exports.createComentario = async (req, res) => {
  try {
    const { evento_id, usuario_id, conteudo } = req.body;

    const novoComentario = new Comentario({
      evento_id,
      usuario_id,
      conteudo,
      data_criacao: new Date(),
    });

    await novoComentario.save();
    res.status(201).send('Comentário criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar comentário:', error);
    res.status(500).send(`Erro ao criar comentário: ${error.message}`);
  }
};

// Retorna todos os comentários
exports.getComentarios = async (req, res) => {
  try {
    const comentarios = await Comentario.find().populate('evento_id').populate('usuario_id');
    res.status(200).json(comentarios);
  } catch (error) {
    console.error('Erro ao buscar comentários:', error);
    res.status(500).send(`Erro ao buscar comentários: ${error.message}`);
  }
};

// Retorna um comentário específico
exports.getComentarioById = async (req, res) => {
  try {
    const id = req.params.id;
    const comentario = await Comentario.findById(id).populate('evento_id').populate('usuario_id');

    if (!comentario) {
      return res.status(404).send('Comentário não encontrado');
    }

    res.status(200).json(comentario);
  } catch (error) {
    console.error('Erro ao buscar comentário:', error);
    res.status(500).send(`Erro ao buscar comentário: ${error.message}`);
  }
};

// Atualiza um comentário
exports.updateComentario = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const comentario = await Comentario.findByIdAndUpdate(id, data, { new: true });

    if (!comentario) {
      return res.status(404).send('Comentário não encontrado');
    }

    res.status(200).send('Comentário atualizado com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar comentário:', error);
    res.status(500).send(`Erro ao atualizar comentário: ${error.message}`);
  }
};

// Deleta um comentário
exports.deleteComentario = async (req, res) => {
  try {
    const id = req.params.id;

    const comentario = await Comentario.findByIdAndDelete(id);
    if (!comentario) {
      return res.status(404).send('Comentário não encontrado');
    }

    res.status(200).send('Comentário deletado com sucesso!');
  } catch (error) {
    console.error('Erro ao deletar comentário:', error);
    res.status(500).send(`Erro ao deletar comentário: ${error.message}`);
  }
};
