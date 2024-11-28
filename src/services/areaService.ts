"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createArea = async (nome: string) => {
  const newArea = await prisma.areaConhecimento.create({
    data: {
      nome,
    },
  });

  return newArea;
};

export const findAllAreas = async () => {
  const areas = await prisma.areaConhecimento.findMany({
    orderBy: {
      nome: "asc",
    },
  });

  return areas;
};

export const findOneArea = async (id: number) => {
  const area = await prisma.areaConhecimento.findFirst({
    where: {
      id,
    },
  });
  return area;
};

export const updateArea = async (id: number, nome: string) => {
  const area = await prisma.areaConhecimento.update({
    data: {
      nome,
    },
    where: {
      id,
    },
  });
  return area;
};

export const deleteArea = async (id: number) => {
  const area = await prisma.areaConhecimento.delete({
    where: {
      id,
    },
  });
  return area;
};
