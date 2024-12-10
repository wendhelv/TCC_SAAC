"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsuariosStats = async () => {
    const totalUsuarios = await prisma.usuario.count();
    const totalAdmins = await prisma.usuario.count({
        where: { superuser: true },
    });
    const totalAvaliadores = await prisma.avaliador.count();

    return {
        totalUsuarios,
        totalAdmins,
        totalAvaliadores,
    };
};

export const getTotalAvaliacoes = async () => {
    const totalAvaliacoes = await prisma.avaliacao.count();
    return totalAvaliacoes;
};

export const getTotalArtigos = async () => {
    const totalArtigos = await prisma.artigo.count();
    return totalArtigos;
};

export const getMediaNotaFinal = async () => {
    const mediaNotaFinalData = await prisma.avaliacao.aggregate({
        _avg: {
            notaFinal: true,
        },
    });

    return mediaNotaFinalData._avg.notaFinal ? parseFloat(mediaNotaFinalData._avg.notaFinal.toFixed(1)) : 0;
    ;
};

export const getArtigosPorEdicaoEArea = async () => {
    // Consulta para agrupar artigos por área
    const artigosPorArea = await prisma.artigo.groupBy({
        by: ["idArea"],
        _count: { id: true },
    });

    // Consulta para agrupar artigos por edição
    const artigosPorEdicao = await prisma.artigo.groupBy({
        by: ["idEdicao"],
        _count: { id: true },
    });

    // Consulta para buscar os nomes das áreas
    const areas = await prisma.areaConhecimento.findMany({
        where: { id: { in: artigosPorArea.map((item) => item.idArea) } },
    });

    // Combinar os dados das áreas com os counts
    const areasComDados = artigosPorArea.map((item) => {
        const area = areas.find((a) => a.id === item.idArea);
        return {
            nome: area?.nome || "Área Desconhecida",
            count: item._count.id,
        };
    });

    // Transformar os dados das edições para o formato esperado
    const edicoesComDados = artigosPorEdicao.map((item) => ({
        ano: item.idEdicao,
        count: item._count.id,
    }));

    return { areas: areasComDados, edicoes: edicoesComDados };
};

export const getAvaliacoesPendentes = async () => {
    const totalAvaliacoesPendentes = await prisma.artigo.count({
        where: {
            Avaliacoes: {
                none: {},
            },
        },
    });

    return totalAvaliacoesPendentes;
};
