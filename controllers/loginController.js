const { auth } = require('../config/firebase-config'); // Importando auth

// Cria um novo usuário no Firebase Authentication (Etapa 1)
exports.createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Criação do usuário no Firebase Authentication
    const userRecord = await auth.createUser({
      email,
      password,
    });

    res.status(201).json({
      uid: userRecord.uid,
      email: userRecord.email,
    });
  } catch (error) {
    res.status(500).send(`Erro ao criar usuário: ${error.message}`);
  }
};

// Retorna dados do Firebase Authentication pelo UID
exports.getUserByUID = async (req, res) => {
  try {
    const uid = req.params.uid;
    const userRecord = await auth.getUser(uid);

    res.status(200).json({
      uid: userRecord.uid,
      email: userRecord.email,
      provider: userRecord.providerData.map(provider => provider.providerId),
      creationDate: userRecord.metadata.creationTime,
      lastSignInDate: userRecord.metadata.lastSignInTime,
    });
  } catch (error) {
    res.status(404).send(`Usuário não encontrado: ${error.message}`);
  }
};

// Atualiza dados do Firebase Authentication
exports.updateUser = async (req, res) => {
  try {
    const uid = req.params.uid;
    const { email, password } = req.body;

    const userRecord = await auth.updateUser(uid, { email, password });

    res.status(200).json({
      uid: userRecord.uid,
      email: userRecord.email,
    });
  } catch (error) {
    res.status(500).send(`Erro ao atualizar usuário: ${error.message}`);
  }
};

// Deleta um usuário no Firebase Authentication
exports.deleteUser = async (req, res) => {
  try {
    const uid = req.params.uid;

    // Deleta o usuário no Firebase Authentication
    await auth.deleteUser(uid);

    res.status(200).send('Usuário deletado com sucesso!');
  } catch (error) {
    res.status(500).send(`Erro ao deletar usuário: ${error.message}`);
  }
};
