"use server";
import { PrismaClient } from "@prisma/client";
import { createUser, findUserByEmail } from "./userService";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

//Inicio admin
export const findAllAvaliadores = async () => {
  const avaliadores = await prisma.avaliador.findMany({
    orderBy: {
      nome: "asc",
    },
    include: {
      AvaliadorAreas: {
        select: {
          area: {
            select: {
              id: true,
              nome: true,
            },
          },
        },
      },
      usuario: {
        select: {
          email: true,
        },
      },
    },
  });

  return avaliadores;
};

export const createAvaliador = async (
  nome: string,
  email: string,
  senha: string,
  areasSelecionadas: string[]
) => {
  try {
    const usuario = await createUser(email, senha);

    const avaliador = await prisma.avaliador.create({
      data: {
        nome,
        idUsuario: usuario.id,
      },
    });

    const avaliadorAreas = await prisma.avaliadorArea.createMany({
      data: areasSelecionadas.map((idArea) => ({
        idAvaliador: avaliador.id,
        idArea: parseInt(idArea),
      })),
    });

    return avaliador;
  } catch (error) {
    console.error("Erro ao criar avaliador:", error);
    throw error;
  }
};

export const deleteAvaliador = async (id: number) => {
  try {
    
    const avaliador = await prisma.avaliador.findUnique({
      where: { id },
      select: { idUsuario: true },
    });

    if (!avaliador) {
      throw new Error("Avaliador não encontrado");
    }

    
    await prisma.avaliador.delete({
      where: { id },
    });

    
    await prisma.usuario.delete({
      where: { id: avaliador.idUsuario },
    });

    console.log("Avaliador e usuário deletados com sucesso.");
    return true
  } catch (error) {
    console.error("Erro ao deletar avaliador e usuário:", error);
    throw error;
  }
};

export const updateAvaliador = async (
  id: number,
  nome: string,
  email: string,
  senha: string,
  areasSelecionadas: string[]
) => {
  try {
    const hashedPassword = await bcrypt.hash(senha, 10);

    const avaliador = await prisma.avaliador.findUnique({
      where: { id },
      select: { idUsuario: true },
    });

    if (!avaliador) {
      throw new Error("Avaliador não encontrado");
    }

    const idUsuario = avaliador.idUsuario;

    const existingUser = await findUserByEmail(email);

    const userData: any = { senha: hashedPassword };

    if (existingUser && existingUser.id !== idUsuario) {
      throw new Error("Este email já está em uso por outro usuário.");
    } else if (!existingUser || existingUser.id === idUsuario) {
      userData.email = email;
    }

    await prisma.usuario.update({
      where: { id: idUsuario },
      data: userData,
    });

    await prisma.avaliador.update({
      where: { id },
      data: { nome },
    });

    await prisma.avaliadorArea.deleteMany({ where: { idAvaliador: id } });
    await prisma.avaliadorArea.createMany({
      data: areasSelecionadas.map((idArea) => ({
        idAvaliador: id,
        idArea: Number(idArea), // Converte para número
      })),
    });

    return { message: "Avaliador atualizado com sucesso" };
  } catch (error) {
    console.error("Erro ao atualizar avaliador:", error);
    throw error;
  }
};

//Fim admin

//Inicio Avaliador

export const findAvaliadorByUser = async (idUsuario:number) => {

  const avaliador = await prisma.avaliador.findFirst({
    where: {
      idUsuario
    }
  })

  if(avaliador) {
    return avaliador
  }
  return null
}

export const getArtigosNaoAvaliados = async (idAvaliador:number) => {
  try {
    // Busca as áreas que o avaliador pode avaliar
    const avaliador = await prisma.avaliador.findUnique({
      where: { id: idAvaliador },
      include: { AvaliadorAreas: true }
    })
    
    if (!avaliador){
      throw new Error("Email de usuário não encontrado na sessão.");
    }
    // Extrai os IDs das áreas que o avaliador pode avaliar
    const areasIds = avaliador.AvaliadorAreas.map(area => area.idArea)

    // Busca os artigos nas áreas permitidas e que ainda não foram avaliados por esse avaliador
    const artigosNaoAvaliados = await prisma.artigo.findMany({
      where: {
        idArea: { in: areasIds }, // Filtra os artigos nas áreas do avaliador
        Avaliacoes: {
          none: {
            idAvaliador: idAvaliador // Verifica se o artigo não tem avaliação desse avaliador específico
          }
        }
      },
      include: {
        area: true, // Inclui os dados da área de conhecimento do artigo
        edicao: true
      }
    })

    return artigosNaoAvaliados
  } catch (error) {
    console.error('Erro ao buscar artigos não avaliados:', error)
    throw error
  }
}


