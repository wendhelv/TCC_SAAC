'use server'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAllPerguntas = async () => {
    try {
        const perguntas = await prisma.pergunta.findMany({
            include: {
                area: {
                    select: {
                        nome: true
                    }
                },
                edicao: {
                    select: {
                        ano: true
                    }
                }
            }
        })
        return perguntas
    } catch (error) {
        console.error("Erro ao buscar as perguntas:",error)
    }
}

export const findPerguntasParaAvaliacao = async (idArea:number, idEdicao:string) => {
    try {
        const perguntas = await prisma.pergunta.findMany({
            where: {
                idArea,
                idEdicao
            }
        })

        return perguntas
    } catch (error) {
        console.error("Erro ao buscar as perguntas:", error)
    }
}

export const createPerguntas = async (edicao:string, area:number, perguntas:string[]) => {
    try {
        const pergutasCriadas = await prisma.pergunta.createMany({
            data: perguntas.map((pergunta) => ({
                idEdicao: edicao,
                idArea: area,
                texto: pergunta
            }))
        })
        return pergutasCriadas
        
    } catch (error) {
        console.error("Erro ao criar a pergunta:",error)
    }
}