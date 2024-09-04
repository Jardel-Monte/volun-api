const { db } = require('../config/firebase-config');

// Função auxiliar para validação dos dados da organização
const validateOrganizacaoData = async (data) => {
  // Verificar se o endereco_id é válido
  if (data.endereco_id) {
    const enderecoDoc = await db.collection('endereco').doc(data.endereco_id.toString()).get();
    if (!enderecoDoc.exists) {
      return 'Endereço não encontrado.';
    }
  }

  // Verificar se todos os IDs em associados_array_id correspondem a usuários existentes
  if (data.associados_array_id) {
    if (!Array.isArray(data.associados_array_id)) {
      return 'associados_array_id deve ser um array de IDs de usuários.';
    }

    const invalidIds = [];
    for (const userId of data.associados_array_id) {
      const userDoc = await db.collection('usuarios').doc(userId.toString()).get();
      if (!userDoc.exists) {
        invalidIds.push(userId);
      }
    }

    if (invalidIds.length > 0) {
      return `Os seguintes IDs de usuários não foram encontrados: ${invalidIds.join(', ')}`;
    }
  }

  return null;
};

// Cria uma nova organização
exports.createOrganizacao = async (req, res) => {
  try {
    const data = req.body;

    // Validação dos dados
    const validationError = await validateOrganizacaoData(data);
    if (validationError) {
      return res.status(400).send(validationError);
    }

    // Inserir a organização
    await db.collection('organizacao').add(data);
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

    const snapshot = await db.collection('organizacao')
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .get();

    const organizacoes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
    const doc = await db.collection('organizacao').doc(id).get();

    if (!doc.exists) {
      return res.status(404).send('Organização não encontrada');
    }

    res.status(200).json({ id: doc.id, ...doc.data() });
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

    // Validação dos dados
    const validationError = await validateOrganizacaoData(data);
    if (validationError) {
      return res.status(400).send(validationError);
    }

    const doc = await db.collection('organizacao').doc(id).get();
    if (!doc.exists) {
      return res.status(404).send('Organização não encontrada');
    }

    // Atualizar a organização
    await db.collection('organizacao').doc(id).update(data);
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

    const doc = await db.collection('organizacao').doc(id).get();
    if (!doc.exists) {
      return res.status(404).send('Organização não encontrada');
    }

    await db.collection('organizacao').doc(id).delete();
    res.status(200).send('Organização deletada com sucesso!');
  } catch (error) {
    console.error('Erro ao deletar organização:', error);
    res.status(500).send(`Erro ao deletar organização: ${error.message}`);
  }
};
