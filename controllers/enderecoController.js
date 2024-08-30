const db = require('../config/firebase-config');

// Função auxiliar para validação dos dados do endereço
const validateEnderecoData = (data) => {
  if (!data.logradouro || !data.bairro || !data.cep || !data.cidade || !data.estado) {
    return 'Campos obrigatórios não preenchidos: logradouro, bairro, CEP, cidade, estado.';
  }
  return null;
};

// Cria um novo endereço
exports.createEndereco = async (req, res) => {
  try {
    const data = req.body;

    // Validação dos dados
    const validationError = validateEnderecoData(data);
    if (validationError) {
      return res.status(400).send(validationError);
    }

    await db.collection('endereco').add(data);
    res.status(201).send('Endereço criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar endereço:', error);
    res.status(500).send(`Erro ao criar endereço: ${error.message}`);
  }
};

// Retorna todos os endereços com paginação
exports.getEnderecos = async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const page = parseInt(req.query.page) || 1;

    const snapshot = await db.collection('endereco')
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .get();

    const enderecos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
    const doc = await db.collection('endereco').doc(id).get();

    if (!doc.exists) {
      return res.status(404).send('Endereço não encontrado');
    }

    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Erro ao buscar endereço:', error);
    res.status(500).send(`Erro ao buscar endereço: ${error.message}`);
  }
};

// Atualiza um endereço
exports.updateEndereco = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    // Validação dos dados
    const validationError = validateEnderecoData(data);
    if (validationError) {
      return res.status(400).send(validationError);
    }

    const doc = await db.collection('endereco').doc(id).get();
    if (!doc.exists) {
      return res.status(404).send('Endereço não encontrado');
    }

    await db.collection('endereco').doc(id).update(data);
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

    const doc = await db.collection('endereco').doc(id).get();
    if (!doc.exists) {
      return res.status(404).send('Endereço não encontrado');
    }

    await db.collection('endereco').doc(id).delete();
    res.status(200).send('Endereço deletado com sucesso!');
  } catch (error) {
    console.error('Erro ao deletar endereço:', error);
    res.status(500).send(`Erro ao deletar endereço: ${error.message}`);
  }
};
