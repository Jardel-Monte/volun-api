const db = require('../config/firebase-config');

// Cria uma nova denúncia
exports.createDenuncia = async (req, res) => {
  try {
    const data = req.body;
    await db.collection('denuncias').add(data);
    res.status(201).send('Denúncia criada com sucesso!');
  } catch (error) {
    res.status(500).send(`Erro ao criar denúncia: ${error.message}`);
  }
};

// Retorna todas as denúncias
exports.getDenuncias = async (req, res) => {
  try {
    const snapshot = await db.collection('denuncias').get();
    const denuncias = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(denuncias);
  } catch (error) {
    res.status(500).send(`Erro ao buscar denúncias: ${error.message}`);
  }
};

// Retorna uma denúncia específica
exports.getDenunciaById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await db.collection('denuncias').doc(id).get();
    if (!doc.exists) {
      res.status(404).send('Denúncia não encontrada');
    } else {
      res.status(200).json({ id: doc.id, ...doc.data() });
    }
  } catch (error) {
    res.status(500).send(`Erro ao buscar denúncia: ${error.message}`);
  }
};

// Atualiza uma denúncia
exports.updateDenuncia = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await db.collection('denuncias').doc(id).update(data);
    res.status(200).send('Denúncia atualizada com sucesso!');
  } catch (error) {
    res.status(500).send(`Erro ao atualizar denúncia: ${error.message}`);
  }
};

// Deleta uma denúncia
exports.deleteDenuncia = async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection('denuncias').doc(id).delete();
    res.status(200).send('Denúncia deletada com sucesso!');
  } catch (error) {
    res.status(500).send(`Erro ao deletar denúncia: ${error.message}`);
  }
};
