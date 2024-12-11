"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAllArtigos = async () => {
  try {
    const artigos = await prisma.artigo.findMany({
      include: {
        area: {
          select: {
            nome: true,
          },
        },
        edicao: {
          select: {
            ano: true,
          },
        },
      },
    });
    return artigos;
  } catch (error) {
    console.error("Erro ao buscar artigos:", error);
  }
};

export const findArtigoById = async (idArtigo: number) => {
  try {
    const artigo = await prisma.artigo.findFirst({
      where: {
        id: idArtigo,
      },
      include: {
        area: {
          select: {
            nome: true,
          },
        },
      },
    });
    return artigo;
  } catch (error) {
    console.error("Erro ao buscar o artigo:", error);
  }
};

export const createArtigo = async (
  idEdicao: string,
  idArea: number,
  titulo: string,
  autores: string,
  resumo: string,
  linkPdf: string
) => {
  try {
    const newArtigo = await prisma.artigo.create({
      data: {
        idEdicao,
        idArea,
        titulo,
        autores,
        resumo,
        linkPdf,
      },
    });
    return newArtigo;
  } catch (error) {
    console.error("Erro ao criar artigo:", error);
  }
};

export const updateArtigo = async (
  id: number,
  idEdicao: string,
  idArea: number,
  titulo: string,
  autores: string,
  resumo: string,
  linkPdf: string
) => {
  try {
    const updatedArtigo = await prisma.artigo.update({
      where: {
        id,
      },
      data: {
        idEdicao,
        idArea,
        titulo,
        autores,
        resumo,
        linkPdf,
      },
    });
    return updatedArtigo;
  } catch (error) {
    console.error("Erro ao atualizar artigo:", error);
    throw error;
  }
};

export const deleteArtigo = async (id: number) => {
  try {
    const deletedArtigo = await prisma.artigo.delete({
      where: {
        id,
      },
    });
    return deletedArtigo;
  } catch (error) {
    console.error("Erro ao apagar artigo:", error);
  }
};

export const findTop3ArtigosPorAreaPorEdicao = async () => {
  const artigos = await prisma.artigo.findMany({
    where: {
      Avaliacoes: {
        some: {},
      },
    },
    include: {
      area: true,
      edicao: true,
      Avaliacoes: true,
    },
  });

  // Agrupar artigos por edição e área
  const agrupados = artigos.reduce((acc, artigo) => {
    const chave = `${artigo.edicao.ano}-${artigo.area.nome}`;
    const somaNotas = artigo.Avaliacoes.reduce(
      (soma, avaliacao) => soma + Number(avaliacao.notaFinal),
      0
    );

    if (!acc[chave]) {
      acc[chave] = [];
    }

    acc[chave].push({
      id: artigo.id,
      titulo: artigo.titulo,
      autores: artigo.autores,
      edicao: artigo.edicao.ano,
      area: artigo.area.nome,
      somaNotas,
    });

    return acc;
  }, {} as Record<string, { id: number; titulo: string; autores: string; edicao: string; area: string; somaNotas: number }[]>);

  // Pegar os 3 maiores de cada chave
  const vencedores = Object.entries(agrupados).map(([chave, artigos]) => {
    const [edicao, area] = chave.split("-");
    const top3 = artigos
      .sort((a, b) => b.somaNotas - a.somaNotas) // Ordenar pelo total de notas (decrescente)
      .slice(0, 3); // Pegar os 3 primeiros

    return {
      edicao,
      area,
      artigos: top3,
    };
  });

  return vencedores;
};