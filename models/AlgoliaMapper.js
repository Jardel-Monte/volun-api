const Endereco = require('./Endereco');
const Organizacao = require('./Organizacao');

async function mapearEventoParaAlgolia(evento) {
  const endereco = await Endereco.findById(evento.endereco_id); // Busca por endereco_id
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
    organizacao: {
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
    endereco: endereco ? {
      logradouro: endereco.logradouro,
      bairro: endereco.bairro,
      cep: endereco.cep,
      cidade: endereco.cidade,
      estado: endereco.estado,
      numero: endereco.numero,
      createdAt: endereco.createdAt,
      updatedAt: endereco.updatedAt,
    } : {}, // Endereço vazio se não for encontrado
  };
}

module.exports = mapearEventoParaAlgolia;
