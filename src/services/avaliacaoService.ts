"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createAvaliacao = async (
  idAvaliador: number,
  idArtigo: number,
  idEdicao: string,
  notaFinal: number
) => {
  const newAvaliacao = await prisma.avaliacao.create({
    data: {
      idAvaliador,
      idArtigo,
      idEdicao,
      notaFinal,
    },
  });

  return newAvaliacao;
};

export const getAvaliacoesPorAvaliador = async (idAvaliador: number) => {
  const avaliacoes = await prisma.avaliacao.findMany({
    where: { idAvaliador },
    include: {
      artigo: {
        include: {
          area: true,
        },
      },
      edicao: true,
    },
  });

  // Organizar por edição
  const avaliacoesPorEdicao = avaliacoes.reduce((acc, avaliacao) => {
    const edicao = avaliacao.edicao.ano;
    if (!acc[edicao]) {
      acc[edicao] = [];
    }
    acc[edicao].push({
      id: avaliacao.artigo.id,
      idAvaliacao: avaliacao.id,
      titulo: avaliacao.artigo.titulo,
      area: avaliacao.artigo.area.nome,
      notaFinal: Number(avaliacao.notaFinal),
    });
    return acc;
  }, {} as Record<string, { id: number; idAvaliacao: number; titulo: string; area: string; notaFinal: number }[]>);

  // Ordena as edições em ordem decrescente
  const edicoesOrdenadas = Object.entries(avaliacoesPorEdicao)
    .sort((a, b) => Number(b[0]) - Number(a[0])) 
    .map(([edicao, artigos]) => ({
      edicao,
      artigos,
    }));

  return edicoesOrdenadas;
};

export const findAvaliacaoById = async (idAvaliacao: number) => {
  const avaliacao = await prisma.avaliacao.findUnique({
    where: { id: idAvaliacao },
    include: {
      respostas: {
        include: {
          pergunta: true,
        },
      },
      artigo: {
        include: {
          area: true,
        },
      },
    },
  });

  if (!avaliacao) {
    throw new Error("Avaliação não encontrada");
  }

  // Montando o objeto de retorno
  const avaliacaoDetalhada = {
    id: avaliacao.id,
    notaFinal: Number(avaliacao.notaFinal),
    artigo: {
      id: avaliacao.artigo.id,
      titulo: avaliacao.artigo.titulo,
      area: avaliacao.artigo.area.nome,
      linkPdf: avaliacao.artigo.linkPdf,
      idEdicao: avaliacao.artigo.idEdicao,
    },
    respostas: avaliacao.respostas.map((resposta) => ({
      id: resposta.pergunta.id,
      texto: resposta.pergunta.texto,
      nota: Number(resposta.nota),
    })),
  };

  return avaliacaoDetalhada; // Retorna o objeto montado
};
