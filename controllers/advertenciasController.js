const db = require('../config/firebase-config');

// Cria uma nova advertência
exports.createAdvertencia = async (req, res) => {
  try {
    const data = req.body;
    await db.collection('advertencias').add(data);
    res.status(201).send('Advertência criada com sucesso!');
  } catch (error) {
    res.status(500).send(`Erro ao criar advertência: ${error.message}`);
  }
};

// Retorna todas as advertências
exports.getAdvertencias = async (req, res) => {
  try {
    const snapshot = await db.collection('advertencias').get();
    const advertencias = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(advertencias);
  } catch (error) {
    res.status(500).send(`Erro ao buscar advertências: ${error.message}`);
  }
};

// Retorna uma advertência específica
exports.getAdvertenciaById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await db.collection('advertencias').doc(id).get();
    if (!doc.exists) {
      res.status(404).send('Advertência não encontrada');
    } else {
      res.status(200).json({ id: doc.id, ...doc.data() });
    }
  } catch (error) {
    res.status(500).send(`Erro ao buscar advertência: ${error.message}`);
  }
};

// Atualiza uma advertência
exports.updateAdvertencia = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await db.collection('advertencias').doc(id).update(data);
    res.status(200).send('Advertência atualizada com sucesso!');
  } catch (error) {
    res.status(500).send(`Erro ao atualizar advertência: ${error.message}`);
  }
};

// Deleta uma advertência
exports.deleteAdvertencia = async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection('advertencias').doc(id).delete();
    res.status(200).send('Advertência deletada com sucesso!');
  } catch (error) {
    res.status(500).send(`Erro ao deletar advertência: ${error.message}`);
  }
};
