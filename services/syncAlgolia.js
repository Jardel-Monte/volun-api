const mongoose = require("mongoose");
const algoliaClient = require("./algoliaConfig");
const Endereco = require("./models/Endereco");
const Evento = require("./models/Evento");

// Configura o índice do Algolia
const index = algoliaClient.initIndex("eventos");

async function sincronizarEventosComAlgolia() {
  try {
    // Busca todos os eventos no MongoDB com o nome da ONG já populado
    const eventos = await Evento.find().populate('ong_id', 'nome');

    // Mapeia eventos e combina com as informações de cidade e estado do endereço
    const eventosComCidadeEstado = await Promise.all(
      eventos.map(async (evento) => {
        // Busca a cidade e o estado do endereço correspondente ao evento
        const endereco = await Endereco.findOne({ evento_id: evento._id });

        // Cria um objeto com os dados do evento e inclui cidade e estado do endereço
        return {
          objectID: evento._id.toString(),
          titulo: evento.titulo,
          descricao: evento.descricao,
          ongNome: evento.ong_id ? evento.ong_id.nome : null,
          dataInicio: evento.data_inicio,
          imgUrl: evento.imagem,
          vagaLimite: evento.vaga_limite,
          cidade: endereco ? endereco.cidade : null,
          estado: endereco ? endereco.estado : null,
        };
      })
    );

    // Envia os dados combinados para o índice do Algolia
    await index.saveObjects(eventosComCidadeEstado);
    console.log("Eventos sincronizados com sucesso no Algolia!");
  } catch (error) {
    console.error("Erro ao sincronizar eventos com o Algolia:", error);
  }
}

module.exports = sincronizarEventosComAlgolia;
