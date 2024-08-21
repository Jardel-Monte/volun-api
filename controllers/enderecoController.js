const db = require('../config/firebase-config');

// Cria um novo endereço
exports.createEndereco = async (req, res) => {
  try {
    const data = req.body;
    await db.collection('endereco').add(data);
    res.status(201).send('Endereço criado com sucesso!');
  } catch (error) {
    res.status(500).send(`Erro ao criar endereço: ${error.message}`);
  }
};

// Retorna todos os endereços
exports.getEnderecos = async (req, res) => {
  try {
    const snapshot = await db.collection('endereco').get();
    const enderecos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(enderecos);
  } catch (error) {
    res.status(500).send(`Erro ao buscar endereços: ${error.message}`);
  }
};

// Retorna um endereço específico
exports.getEnderecoById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await db.collection('endereco').doc(id).get();
    if (!doc.exists) {
      res.status(404).send('Endereço não encontrado');
    } else {
      res.status(200).json({ id: doc.id, ...doc.data() });
    }
  } catch (error) {
    res.status(500).send(`Erro ao buscar endereço: ${error.message}`);
  }
};

// Atualiza um endereço
exports.updateEndereco = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await db.collection('endereco').doc(id).update(data);
    res.status(200).send('Endereço atualizado com sucesso!');
  } catch (error) {
    res.status(500).send(`Erro ao atualizar endereço: ${error.message}`);
  }
};

// Deleta um endereço
exports.deleteEndereco = async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection('endereco').doc(id).delete();
    res.status(200).send('Endereço deletado com sucesso!');
  } catch (error) {
    res.status(500).send(`Erro ao deletar endereço: ${error.message}`);
  }
};
