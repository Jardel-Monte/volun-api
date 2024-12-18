const Organizacao = require('../models/Organizacao');
const Evento = require('../models/Eventos');
const index = require('../services/algoliaConfig');
const Comentario = require('../models/Comentario');
const Participacao = require('../models/Participacao');
const mapearEventoParaAlgolia = require('../models/AlgoliaMapper');

// Atualiza eventos associados a uma organização no Algolia
const atualizarEventosAssociados = async (ongId) => {
  try {
    const eventos = await Evento.find({ ong_id: ongId });

    if (eventos.length === 0) {
      console.log('Nenhum evento encontrado para a organização:', ongId);
      return;
    }

    const eventosMapeados = await Promise.all(eventos.map(mapearEventoParaAlgolia));

    // Atualiza os eventos no Algolia
    await index.partialUpdateObjects(eventosMapeados);
    console.log('Eventos associados atualizados com sucesso no Algolia.');
  } catch (error) {
    console.error('Erro ao atualizar eventos associados no Algolia:', error);
    throw error;
  }
};

// Cria uma nova organização
exports.createOrganizacao = async (req, res) => {
  try {
    const data = req.body;

    // Criar nova organização
    const organizacao = new Organizacao(data);
    await organizacao.save();

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

    const organizacoes = await Organizacao.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);

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
    const organizacao = await Organizacao.findById(id);

    if (!organizacao) {
      return res.status(404).send('Organização não encontrada');
    }

    res.status(200).json(organizacao);
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

    const organizacao = await Organizacao.findById(id);
    if (!organizacao) {
      return res.status(404).send('Organização não encontrada');
    }

    // Atualizar organização
    await Organizacao.findByIdAndUpdate(id, data, { new: true });

    // Atualiza os eventos associados no Algolia
    await atualizarEventosAssociados(id);

    res.status(200).send('Organização atualizada com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar organização:', error);
    res.status(500).send(`Erro ao atualizar organização: ${error.message}`);
  }
};

// Deleta uma organização e seus eventos associados
exports.deleteOrganizacao = async (req, res) => {
  try {
    const id = req.params.id;

    const organizacao = await Organizacao.findById(id);
    if (!organizacao) {
      return res.status(404).send('Organização não encontrada');
    }

    // Busca os eventos associados à organização
    const eventos = await Evento.find({ ong_id: id });

    if (eventos.length > 0) {
      // Itera sobre cada evento para deletar do banco e do Algolia
      for (const evento of eventos) {
        // Deleta comentários associados ao evento
        await Comentario.deleteMany({ evento_id: evento._id });

        // Deleta participações associadas ao evento
        await Participacao.deleteMany({ evento_id: evento._id });

        // Remove o evento do Algolia
        try {
          await index.deleteObject(evento._id.toString());
          console.log(`Evento ${evento._id} removido do Algolia com sucesso.`);
        } catch (algoliaError) {
          console.error(`Erro ao remover evento ${evento._id} do Algolia:`, algoliaError);
        }
      }

      // Deleta os eventos associados à organização
      await Evento.deleteMany({ ong_id: id });
    }

    // Remove a organização do Algolia
    try {
      await index.deleteObject(id); // Deleta a organização do Algolia
      console.log(`Organização ${id} removida do Algolia com sucesso.`);
    } catch (algoliaError) {
      console.error(`Erro ao remover organização ${id} do Algolia:`, algoliaError);
    }

    // Deleta a organização
    await Organizacao.findByIdAndDelete(id);

    res.status(200).send('Organização e eventos associados deletados com sucesso!');
  } catch (error) {
    console.error('Erro ao deletar organização:', error);
    res.status(500).send(`Erro ao deletar organização: ${error.message}`);
  }
};


// Retorna endereços associados a um usuario_id específico
exports.getOrganizacaoByCriadorId = async (req, res) => {
  try {
    const criador_id = req.params.criador_id;
    const organizacoes = await Organizacao.find({ criador_id });
    if (!organizacoes.length) {
      return res.status(404).send('Nenhuma organização foi encontrada para este usuario.');
    }

    res.status(200).json(organizacoes);
  } catch (error) {
    console.error('Erro ao buscar Organização pelo criador_id:', error);
    res.status(500).send(`Erro ao buscar Organizações: ${error.message}`);
  }
};
