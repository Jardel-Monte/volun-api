const Denuncia = require('../models/Denuncia');

// Criar uma nova denúncia
exports.criarDenuncia = async (req, res) => {
  try {
    // Cria uma nova denúncia com os dados recebidos do body
    const novaDenuncia = new Denuncia(req.body);

    // Salva a denúncia no banco de dados
    await novaDenuncia.save();

    res.status(201).json({ message: 'Denúncia criada com sucesso!', denuncia: novaDenuncia });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar denúncia', error });
  }
};

// Obter todas as denúncias
exports.obterDenuncias = async (req, res) => {
  try {
    const denuncias = await Denuncia.find()
      // Popula apenas campos que são ObjectId (comentario_id, evento_id, org_id)
      .populate('comentario_id')
      .populate('evento_id')
      .populate('org_id');

    res.status(200).json(denuncias);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter denúncias', error: error.message });
  }
};

// Obter uma denúncia específica pelo ID
exports.obterDenunciaPorId = async (req, res) => {
  try {
    const denuncia = await Denuncia.findById(req.params.id)
      .populate('comentario_id')
      .populate('evento_id')
      .populate('org_id');
    
    if (!denuncia) {
      return res.status(404).json({ message: 'Denúncia não encontrada' });
    }

    res.status(200).json(denuncia);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter denúncia', error: error.message });
  }
};


// Deletar uma denúncia pelo ID
exports.deletarDenuncia = async (req, res) => {
  try {
    const denuncia = await Denuncia.findByIdAndDelete(req.params.id);
    
    if (!denuncia) {
      return res.status(404).json({ message: 'Denúncia não encontrada' });
    }

    res.status(200).json({ message: 'Denúncia deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar denúncia', error });
  }
};
