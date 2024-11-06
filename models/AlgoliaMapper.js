const Endereco = require("./Endereco");

async function mapearEventoParaAlgolia(evento) {
  const endereco = await Endereco.findOne({ evento_id: evento._id });
  
  return {
    objectID: evento._id.toString(),
    titulo: evento.titulo,
    descricao: evento.descricao,
    tags: evento.tags,
    dataInicio: evento.data_inicio,
    dataFim: evento.data_fim,
    imagem: evento.imagem,
    vagaLimite: evento.vaga_limite,
    organização: evento.ong_id ? {
      _id: evento.ong_id._id.toString(),
      nome: evento.ong_id.nome,
      imgLogo: evento.ong_id.img_logo,
      razaoSocial: evento.ong_id.razao_social,
      descricao: evento.ong_id.descricao,
      cnpj: evento.ong_id.cnpj,
      ddd: evento.ong_id.ddd,
      telefone: evento.ong_id.telefone,
      associados: evento.ong_id.associados,
      criadorId: evento.ong_id.criador_id,
      createdAt: evento.ong_id.createdAt,
      updatedAt: evento.ong_id.updatedAt,
    } : null,
    cidade: endereco ? endereco.cidade : null,
    estado: endereco ? endereco.estado : null,
    createdAt: evento.createdAt,
    updatedAt: evento.updatedAt,
  };
}

module.exports = mapearEventoParaAlgolia;