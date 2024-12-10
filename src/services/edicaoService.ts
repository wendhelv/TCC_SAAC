"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAllEdicoes = async () => {
  const edicoes = await prisma.edicao.findMany({
    orderBy: {
      ano: "desc",
    },
    include: {
      AvaliadorEdicoes: {
        include: {
          avaliador: true
        },
      },
    },
  });

  return edicoes;
};


export const findEdicaoByAno = async (ano:string) => {
  try {
    const edicao = await prisma.edicao.findFirst({
      where: {
        ano
      }
    })
    return edicao
  } catch (error) {
    console.error("Erro ao localizar edição", error)
  }
}

export const createEdicao = async (ano: string, titulo: string, avaliadores: number[]) => {
  try {
    const edicao = await prisma.edicao.create({
      data: {
        ano,
        titulo,
        AvaliadorEdicoes: {
          create: avaliadores.map((idAvaliador) => ({
            idAvaliador,
          })),
        },
      },
      include: {
        AvaliadorEdicoes: true,
      },
    });

    console.log("Edição criada com avaliadores:", edicao);
    return edicao;
  } catch (error) {
    console.error("Erro ao criar edição e relacionar avaliadores:", error);
    throw error;
  }
};

export const deleteEdicao = async (ano: string) => {
  try {
    const edicao = await prisma.edicao.delete({
      where: { ano },
    });
    console.log("Edição apagada:", edicao);
    return edicao;
  } catch (error) {
    console.error("Erro ao apagar edição:", error);
    throw error;
  }
};

export const updateEdicao = async (
  ano: string,
  titulo: string,
  avaliadoresSelecionados: number[]
) => {
  const edicaoData: any = { titulo };

  const existingEdicao = await prisma.edicao.findUnique({
    where: { ano },
    include: {
      AvaliadorEdicoes: true, // Incluir avaliadores existentes
    },
  });

  if (!existingEdicao) {
    throw new Error("Edição não encontrada");
  }

  // Atualizar título da edição
  const updatedEdicao = await prisma.edicao.update({
    where: { ano },
    data: edicaoData,
  });

  // Sincronizar os avaliadores da edição
  const existingAvaliadoresIds = existingEdicao.AvaliadorEdicoes.map(
    (ae) => ae.idAvaliador
  );

  const avaliadoresToAdd = avaliadoresSelecionados.filter(
    (id) => !existingAvaliadoresIds.includes(id)
  );
  const avaliadoresToRemove = existingAvaliadoresIds.filter(
    (id) => !avaliadoresSelecionados.includes(id)
  );

  // Adicionar novos avaliadores
  for (const id of avaliadoresToAdd) {
    await prisma.avaliadorEdicao.create({
      data: {
        idAvaliador: id,
        idEdicao: ano,
      },
    });
  }

  // Remover avaliadores desassociados
  for (const id of avaliadoresToRemove) {
    await prisma.avaliadorEdicao.deleteMany({
      where: {
        idAvaliador: id,
        idEdicao: ano,
      },
    });
  }

  return updatedEdicao;
};