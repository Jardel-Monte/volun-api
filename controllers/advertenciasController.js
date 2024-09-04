const { db } = require('../config/firebase-config');

// Função auxiliar para validação dos dados da advertência
const validateAdvertenciaData = (data) => {
  if (!data.usuarioId || !data.motivo || !data.data) {
    return 'Campos obrigatórios não preenchidos: usuarioId, motivo, data.';
  }
  if (data.usuarioId && !/^[a-zA-Z0-9]{20}$/.test(data.usuarioId)) {
    return 'ID do usuário inválido. Deve conter 20 caracteres alfanuméricos.';
  }
  return null;
};

// Cria uma nova advertência
exports.createAdvertencia = async (req, res) => {
  try {
    const data = req.body;

    // Validação dos dados
    const validationError = validateAdvertenciaData(data);
    if (validationError) {
      return res.status(400).send(validationError);
    }

    await db.collection('advertencias').add(data);
    res.status(201).send('Advertência criada com sucesso!');
  } catch (error) {
    console.error('Erro ao criar advertência:', error);
    res.status(500).send(`Erro ao criar advertência: ${error.message}`);
  }
};

// Retorna todas as advertências com paginação
exports.getAdvertencias = async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const page = parseInt(req.query.page) || 1;

    const snapshot = await db.collection('advertencias')
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .get();

    const advertencias = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(advertencias);
  } catch (error) {
    console.error('Erro ao buscar advertências:', error);
    res.status(500).send(`Erro ao buscar advertências: ${error.message}`);
  }
};

// Retorna uma advertência específica
exports.getAdvertenciaById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await db.collection('advertencias').doc(id).get();

    if (!doc.exists) {
      return res.status(404).send('Advertência não encontrada');
    }

    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Erro ao buscar advertência:', error);
    res.status(500).send(`Erro ao buscar advertência: ${error.message}`);
  }
};

// Atualiza uma advertência
exports.updateAdvertencia = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    // Validação dos dados
    const validationError = validateAdvertenciaData(data);
    if (validationError) {
      return res.status(400).send(validationError);
    }

    const doc = await db.collection('advertencias').doc(id).get();
    if (!doc.exists) {
      return res.status(404).send('Advertência não encontrada');
    }

    await db.collection('advertencias').doc(id).update(data);
    res.status(200).send('Advertência atualizada com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar advertência:', error);
    res.status(500).send(`Erro ao atualizar advertência: ${error.message}`);
  }
};

// Deleta uma advertência
exports.deleteAdvertencia = async (req, res) => {
  try {
    const id = req.params.id;

    const doc = await db.collection('advertencias').doc(id).get();
    if (!doc.exists) {
      return res.status(404).send('Advertência não encontrada');
    }

    await db.collection('advertencias').doc(id).delete();
    res.status(200).send('Advertência deletada com sucesso!');
  } catch (error) {
    console.error('Erro ao deletar advertência:', error);
    res.status(500).send(`Erro ao deletar advertência: ${error.message}`);
  }
};
