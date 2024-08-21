// loginController.js
const db = require('../config/firebase-config');
const { v4: uuidv4 } = require('uuid');

const loginController = {
  // Cria um novo login
  createLogin: async (req, res) => {
    try {
      const { usuario_id, senha, email, provedor } = req.body;

      if (!usuario_id || !senha || !email || !provedor) {
        return res.status(400).send('Todos os campos são obrigatórios.');
      }

      const newLogin = {
        id: uuidv4(),
        usuario_id,
        senha,
        email,
        provedor,
        datetime: new Date().toISOString()
      };

      await db.collection('login').doc(newLogin.id).set(newLogin);
      res.status(201).send(`Login criado com ID: ${newLogin.id}`);
    } catch (error) {
      console.error('Erro ao criar login:', error);
      res.status(500).send('Erro ao criar login');
    }
  },

  // Retorna todos os logins
  getLogins: async (req, res) => {
    try {
      const loginsSnapshot = await db.collection('login').get();
      const logins = [];

      loginsSnapshot.forEach((doc) => {
        logins.push({ id: doc.id, ...doc.data() });
      });

      res.status(200).json(logins);
    } catch (error) {
      console.error('Erro ao buscar logins:', error);
      res.status(500).send('Erro ao buscar logins');
    }
  },

  // Retorna um login específico por ID
  getLoginById: async (req, res) => {
    try {
      const loginId = req.params.id;
      const loginDoc = await db.collection('login').doc(loginId).get();

      if (!loginDoc.exists) {
        return res.status(404).send('Login não encontrado');
      }

      res.status(200).json({ id: loginDoc.id, ...loginDoc.data() });
    } catch (error) {
      console.error('Erro ao buscar login:', error);
      res.status(500).send('Erro ao buscar login');
    }
  },

  // Atualiza um login existente
  updateLogin: async (req, res) => {
    try {
      const loginId = req.params.id;
      const { senha, email, provedor } = req.body;

      const loginDoc = await db.collection('login').doc(loginId).get();

      if (!loginDoc.exists) {
        return res.status(404).send('Login não encontrado');
      }

      await db.collection('login').doc(loginId).update({
        senha: senha || loginDoc.data().senha,
        email: email || loginDoc.data().email,
        provedor: provedor || loginDoc.data().provedor,
        datetime: new Date().toISOString(),
      });

      res.status(200).send('Login atualizado com sucesso');
    } catch (error) {
      console.error('Erro ao atualizar login:', error);
      res.status(500).send('Erro ao atualizar login');
    }
  },

  // Deleta um login existente
  deleteLogin: async (req, res) => {
    try {
      const loginId = req.params.id;
      const loginDoc = await db.collection('login').doc(loginId).get();

      if (!loginDoc.exists) {
        return res.status(404).send('Login não encontrado');
      }

      await db.collection('login').doc(loginId).delete();
      res.status(200).send('Login deletado com sucesso');
    } catch (error) {
      console.error('Erro ao deletar login:', error);
      res.status(500).send('Erro ao deletar login');
    }
  },
};

module.exports = loginController;