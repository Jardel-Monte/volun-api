const Endereco = require('../models/Endereco');

// Cria um novo endereço
exports.createEndereco = async (req, res) => {
  try {
    const enderecoData = req.body;

    // Validação dos dados obrigatórios
    if (!enderecoData.logradouro || !enderecoData.bairro || !enderecoData.cep || !enderecoData.cidade || !enderecoData.estado) {
      return res.status(400).send('Campos obrigatórios não preenchidos: logradouro, bairro, CEP, cidade, estado.');
    }

    // Cria e salva o novo endereço
    const novoEndereco = new Endereco(enderecoData);
    const enderecoSalvo = await novoEndereco.save();

    // Retorna o objeto do endereço criado
    res.status(201).json({
      message: 'Endereço criado com sucesso!',
      endereco: enderecoSalvo, // Inclui todos os dados do endereço, incluindo o _id
    });
  } catch (error) {
    console.error('Erro ao criar endereço:', error);
    res.status(500).send(`Erro ao criar endereço: ${error.message}`);
  }
};


// Retorna todos os endereços
exports.getEnderecos = async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const page = parseInt(req.query.page) || 1;

    const enderecos = await Endereco.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.status(200).json(enderecos);
  } catch (error) {
    console.error('Erro ao buscar endereços:', error);
    res.status(500).send(`Erro ao buscar endereços: ${error.message}`);
  }
};

// Retorna um endereço específico
exports.getEnderecoById = async (req, res) => {
  try {
    const id = req.params.id;
    const endereco = await Endereco.findById(id);

    if (!endereco) {
      return res.status(404).send('Endereço não encontrado');
    }

    res.status(200).json(endereco);
  } catch (error) {
    console.error('Erro ao buscar endereço:', error);
    res.status(500).send(`Erro ao buscar endereço: ${error.message}`);
  }
};

// Retorna endereços associados a um usuario_id específico
exports.getEnderecoByUsuarioId = async (req, res) => {
  try {
    const usuario_id = req.params.usuario_id;
    const enderecos = await Endereco.find({ usuario_id });

    if (!enderecos.length) {
      return res.status(404).send('Nenhum endereço encontrado para este usuário.');
    }

    res.status(200).json(enderecos);
  } catch (error) {
    console.error('Erro ao buscar endereços pelo usuario_id:', error);
    res.status(500).send(`Erro ao buscar endereços: ${error.message}`);
  }
};

// Retorna endereços associados a um usuario_id específico
exports.getEnderecoByEventoId = async (req, res) => {
  try {
    const evento_id = req.params.evento_id;
    const enderecos = await Endereco.find({ evento_id });

    if (!enderecos.length) {
      return res.status(404).send('Nenhum endereço encontrado para este evento.');
    }

    res.status(200).json(enderecos);
  } catch (error) {
    console.error('Erro ao buscar endereços pelo evento_id:', error);
    res.status(500).send(`Erro ao buscar endereços: ${error.message}`);
  }
};

// Retorna endereços associados a um org_id específico
exports.getEnderecoByOrgId = async (req, res) => {
  try {
    const org_id = req.params.org_id;
    const enderecos = await Endereco.find({ org_id });

    if (!enderecos.length) {
      return res.status(404).send('Nenhum endereço encontrado para esta organização.');
    }

    res.status(200).json(enderecos);
  } catch (error) {
    console.error('Erro ao buscar endereços pelo org_id:', error);
    res.status(500).send(`Erro ao buscar endereços: ${error.message}`);
  }
};

// Atualiza um endereço
exports.updateEndereco = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const endereco = await Endereco.findByIdAndUpdate(id, data, { new: true });

    if (!endereco) {
      return res.status(404).send('Endereço não encontrado');
    }

    res.status(200).send('Endereço atualizado com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar endereço:', error);
    res.status(500).send(`Erro ao atualizar endereço: ${error.message}`);
  }
};

// Deleta um endereço
exports.deleteEndereco = async (req, res) => {
  try {
    const id = req.params.id;

    const endereco = await Endereco.findByIdAndDelete(id);

    if (!endereco) {
      return res.status(404).send('Endereço não encontrado');
    }

    res.status(200).send('Endereço deletado com sucesso!');
  } catch (error) {
    console.error('Erro ao deletar endereço:', error);
    res.status(500).send(`Erro ao deletar endereço: ${error.message}`);
  }
};
