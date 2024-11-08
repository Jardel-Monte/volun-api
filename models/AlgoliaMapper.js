const Endereco = require('./Endereco');
const Organizacao = require('./Organizacao');

async function mapearEventoParaAlgolia(evento) {
  const endereco = await Endereco.findOne({ evento_id: evento._id });
  const organizacao = await Organizacao.findById(evento.ong_id);

  if (!organizacao) {
    throw new Error('Organização não encontrada');
  }

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
      _id: organizacao._id.toString(),
      nome: organizacao.nome,
      imgLogo: organizacao.img_logo,
      razaoSocial: organizacao.razao_social,
      descricao: organizacao.descricao,
      cnpj: organizacao.cnpj,
      ddd: organizacao.ddd,
      telefone: organizacao.telefone,
      associados: organizacao.associados,
      criadorId: organizacao.criador_id,
      createdAt: organizacao.createdAt,
      updatedAt: organizacao.updatedAt,
    },
    cidade: endereco ? endereco.cidade : null,
    estado: endereco ? endereco.estado : null,
    createdAt: evento.createdAt,
    updatedAt: evento.updatedAt,
  };
}

module.exports = mapearEventoParaAlgolia;
