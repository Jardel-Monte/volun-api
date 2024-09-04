const { db } = require('../config/firebase-config');

// Função auxiliar para validar a existência de uma denúncia
const validateDenunciaExistence = async (id) => {
  const doc = await db.collection('denuncias').doc(id).get();
  if (!doc.exists) {
    return 'Denúncia não encontrada.';
  }
  return null;
};

// Cria uma nova denúncia
exports.createDenuncia = async (req, res) => {
  try {
    const data = req.body;
    if (!data || typeof data !== 'object') {
      return res.status(400).send('Dados inválidos para criar denúncia.');
    }
    await db.collection('denuncias').add(data);
    res.status(201).send('Denúncia criada com sucesso!');
  } catch (error) {
    console.error('Erro ao criar denúncia:', error);
    res.status(500).send(`Erro ao criar denúncia: ${error.message}`);
  }
};

// Retorna todas as denúncias com paginação
exports.getDenuncias = async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const page = parseInt(req.query.page) || 1;

    const snapshot = await db.collection('denuncias')
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .get();

    const denuncias = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(denuncias);
  } catch (error) {
    console.error('Erro ao buscar denúncias:', error);
    res.status(500).send(`Erro ao buscar denúncias: ${error.message}`);
  }
};

// Retorna uma denúncia específica
exports.getDenunciaById = async (req, res) => {
  try {
    const id = req.params.id;
    const validationError = await validateDenunciaExistence(id);
    if (validationError) {
      return res.status(404).send(validationError);
    }

    const doc = await db.collection('denuncias').doc(id).get();
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Erro ao buscar denúncia:', error);
    res.status(500).send(`Erro ao buscar denúncia: ${error.message}`);
  }
};

// Atualiza uma denúncia
exports.updateDenuncia = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const validationError = await validateDenunciaExistence(id);
    if (validationError) {
      return res.status(404).send(validationError);
    }

    if (!data || typeof data !== 'object') {
      return res.status(400).send('Dados inválidos para atualizar denúncia.');
    }

    await db.collection('denuncias').doc(id).update(data);
    res.status(200).send('Denúncia atualizada com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar denúncia:', error);
    res.status(500).send(`Erro ao atualizar denúncia: ${error.message}`);
  }
};

// Deleta uma denúncia
exports.deleteDenuncia = async (req, res) => {
  try {
    const id = req.params.id;

    const validationError = await validateDenunciaExistence(id);
    if (validationError) {
      return res.status(404).send(validationError);
    }

    await db.collection('denuncias').doc(id).delete();
    res.status(200).send('Denúncia deletada com sucesso!');
  } catch (error) {
    console.error('Erro ao deletar denúncia:', error);
    res.status(500).send(`Erro ao deletar denúncia: ${error.message}`);
  }
};
