const mongoose = require("mongoose");
const algoliaClient = require("./algoliaConfig");
const Endereco = require("../models/Endereco");
const Evento = require("../models/Eventos");

// Configura o índice do Algolia
const index = algoliaClient.initIndex("eventos");

async function sincronizarEventosComAlgolia() {
  try {
    // Busca todos os eventos no MongoDB com o nome e detalhes da ONG já populados
    const eventos = await Evento.find().populate('ong_id');

    // Mapeia eventos e combina com as informações de cidade e estado do endereço
    const eventosComCidadeEstado = await Promise.all(
      eventos.map(async (evento) => {
        // Busca a cidade e o estado do endereço correspondente ao evento
        const endereco = await Endereco.findOne({ evento_id: evento._id });

        // Cria um objeto com os dados do evento, incluindo todas as informações necessárias
        return {
          objectID: evento._id.toString(),
          titulo: evento.titulo,
          descricao: evento.descricao,
          tags: evento.tags,
          dataInicio: evento.data_inicio,
          dataFim: evento.data_fim,
          imagem: evento.imagem,
          vagaLimite: evento.vaga_limite,
          organização: {
            _id: evento.ong_id?._id.toString(),
            nome: evento.ong_id?.nome,
            imgLogo: evento.ong_id?.img_logo,
            razaoSocial: evento.ong_id?.razao_social,
            descricao: evento.ong_id?.descricao,
            cnpj: evento.ong_id?.cnpj,
            ddd: evento.ong_id?.ddd,
            telefone: evento.ong_id?.telefone,
            associados: evento.ong_id?.associados,
            criadorId: evento.ong_id?.criador_id,
            createdAt: evento.ong_id?.createdAt,
            updatedAt: evento.ong_id?.updatedAt,
          },
          cidade: endereco ? endereco.cidade : null,
          estado: endereco ? endereco.estado : null,
          createdAt: evento.createdAt,
          updatedAt: evento.updatedAt,
        };
      })
    );

    // Envia os dados completos para o índice do Algolia
    await index.saveObjects(eventosComCidadeEstado);
    console.log("Eventos sincronizados com sucesso no Algolia!");
  } catch (error) {
    console.error("Erro ao sincronizar eventos com o Algolia:", error);
  }
}

module.exports = sincronizarEventosComAlgolia;
