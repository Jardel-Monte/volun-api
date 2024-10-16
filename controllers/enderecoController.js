const { db } = require('../config/firebase-config');

// Cria novos endereços com campos adicionais (usuario_id e org_id)
exports.createEndereco = async (req, res) => {
  try {
    const enderecos = Array.isArray(req.body) ? req.body : [req.body];

    const batch = db.batch();

    enderecos.forEach((data) => {
      // Validação dos dados obrigatórios
      if (!data.logradouro || !data.bairro || !data.cep || !data.cidade || !data.estado) {
        throw new Error('Campos obrigatórios não preenchidos: logradouro, bairro, CEP, cidade, estado');
      }

      const enderecoData = {
        logradouro: data.logradouro,
        bairro:     data.bairro,
        cep:        data.cep,
        cidade:     data.cidade,
        estado:     data.estado,
        numero:     data.numero || '',  
        usuario_id: data.usuario_id || null,  
        org_id:     data.org_id || null,     
      };

      const docRef = db.collection('endereco').doc(); // Cria um novo documento com ID automático
      batch.set(docRef, enderecoData);
    });

    await batch.commit();
    res.status(201).send(`${enderecos.length} endereços criados com sucesso!`);
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

// Retorna endereços associados a um usuario_id específico
exports.getEnderecoByUsuarioId = async (req, res) => {
  try {
    const usuario_id = req.params.usuario_id;
    const snapshot = await db.collection('endereco')
      .where('usuario_id', '==', usuario_id)
      .get();

    if (snapshot.empty) {
      return res.status(404).send('Nenhum endereço encontrado para este usuário.');
    }

    const enderecos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(enderecos);
  } catch (error) {
    console.error('Erro ao buscar endereços pelo usuario_id:', error);
    res.status(500).send(`Erro ao buscar endereços: ${error.message}`);
  }
};

// Retorna endereços associados a um org_id específico
exports.getEnderecoByOrgId = async (req, res) => {
  try {
    const org_id = req.params.org_id;
    const snapshot = await db.collection('endereco')
      .where('org_id', '==', org_id)
      .get();

    if (snapshot.empty) {
      return res.status(404).send('Nenhum endereço encontrado para esta organização.');
    }

    const enderecos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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

    // Validação dos dados obrigatórios
    if (!data.logradouro || !data.bairro || !data.cep || !data.cidade || !data.estado) {
      return res.status(400).send('Campos obrigatórios não preenchidos: logradouro, bairro, CEP, cidade, estado.');
    }

    const doc = await db.collection('endereco').doc(id).get();
    if (!doc.exists) {
      return res.status(404).send('Endereço não encontrado');
    }

    await db.collection('endereco').doc(id).update({
      logradouro: data.logradouro,
      bairro:     data.bairro,
      cep:        data.cep,
      cidade:     data.cidade,
      estado:     data.estado,
      numero:     data.numero || '',  // Mantém o valor vazio se não fornecido
      usuario_id: data.usuario_id || null,  // Altera para null se não for fornecido
      org_id:     data.org_id || null,      // Altera para null se não for fornecido
    });

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
