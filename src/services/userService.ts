'use server'
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const findUserByEmail = async (email: string) => {
  return prisma.usuario.findUnique({
    where: {
      email,
    },
  });
};

export const verifyUser = async (email: string, senha: string) => {
  const user = await findUserByEmail(email)

  if (!user) {
    throw new Error("Email não cadastrado.");
  }


  const isPasswordValid = await bcrypt.compare(senha, user.senha);
  if (!isPasswordValid) {
    throw new Error("Senha incorreta.");
  }

  return user;
};

export const createUser = async (email: string, senha: string, superuser: boolean = false) => {
  const hashedPassword = await bcrypt.hash(senha, 10);

  const newUser = await prisma.usuario.create({
    data: {
      email,
      senha: hashedPassword,
      superuser,
    },
  });

  return newUser;
};
