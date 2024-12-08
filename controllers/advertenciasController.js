const Advertencia = require('../models/Advertencia');

// Cria uma nova advertência
exports.createAdvertencia = async (req, res) => {
  try {
    const { moderador_id, usuario_id, motivo } = req.body;

    const novaAdvertencia = new Advertencia({
      moderador_id,
      usuario_id,
      motivo,
    });

    await novaAdvertencia.save();
    res.status(201).json(novaAdvertencia);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar advertência', error });
  }
};

// Recupera todas as advertências
exports.getAdvertencias = async (req, res) => {
  try {
    const advertencias = await Advertencia.find();
    res.status(200).json(advertencias);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar advertências', error });
  }
};

// Recupera uma advertência pelo ID
exports.getAdvertenciaById = async (req, res) => {
  try {
    const { id } = req.params;
    const advertencia = await Advertencia.findById(id);

    if (!advertencia) {
      return res.status(404).json({ message: 'Advertência não encontrada' });
    }

    res.status(200).json(advertencia);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar advertência', error });
  }
};

// Atualiza uma advertência pelo ID
exports.updateAdvertencia = async (req, res) => {
  try {
    const { id } = req.params;
    const { motivo, expiracao, detalhes } = req.body;

    const advertenciaAtualizada = await Advertencia.findByIdAndUpdate(
      id,
      { motivo, expiracao, detalhes },
      { new: true } // Retorna o documento atualizado
    );

    if (!advertenciaAtualizada) {
      return res.status(404).json({ message: 'Advertência não encontrada' });
    }

    res.status(200).json(advertenciaAtualizada);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar advertência', error });
  }
};

// Exclui uma advertência pelo ID
exports.deleteAdvertencia = async (req, res) => {
  try {
    const { id } = req.params;

    const advertenciaDeletada = await Advertencia.findByIdAndDelete(id);

    if (!advertenciaDeletada) {
      return res.status(404).json({ message: 'Advertência não encontrada' });
    }

    res.status(200).json({ message: 'Advertência excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir advertência', error });
  }
};
