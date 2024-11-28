"use client";

import { useState, useEffect } from "react";
import { Trophy, FileText, BookOpen } from "lucide-react";
import { findAllEdicoes } from "@/services/edicaoService";
import { findAllAreas } from "@/services/areaService";
import { findTop3ArtigosPorAreaPorEdicao } from "@/services/artigoService";

interface AreasData {
    id: number;
    nome: string;
}

interface EdicoesData {
    ano: string;
    titulo: string;
}

interface ArtigoData {
    area: string;
    edicao: string;
    artigos: {
        id: number;
        titulo: string;
        autores: string;
        somaNotas: number;
    }[];
}

export default function ArtigosVencedores() {
    const [edicoes, setEdicoes] = useState<EdicoesData[]>([]);
    const [areas, setAreas] = useState<AreasData[]>([]);
    const [artigos, setArtigos] = useState<ArtigoData[]>([]);
    const [edicaoSelecionada, setEdicaoSelecionada] = useState<string>("");
    const [areaSelecionada, setAreaSelecionada] = useState<string>("Todas");

    useEffect(() => {
        const fetchDadosFiltro = async () => {
            const edicoesData = await findAllEdicoes();
            const areasData = await findAllAreas();
            const artigosData = await findTop3ArtigosPorAreaPorEdicao();

            setEdicoes(edicoesData);
            setAreas(areasData);
            setArtigos(artigosData);

            if (edicoesData.length > 0) {
                setEdicaoSelecionada(edicoesData[0].ano);
            }
        };

        fetchDadosFiltro();
    }, []);

    const artigosFiltrados = artigos.filter(
        (artigo) =>
            artigo.edicao === edicaoSelecionada &&
            (areaSelecionada === "Todas" || artigo.area === areaSelecionada)
    );

    console.log(artigos)
    return (
        <div className="min-h-screen bg-purple-50 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-purple-800 mb-6 flex items-center">
                    <Trophy className="mr-2 h-8 w-8 text-orange-500" />
                    Artigos Vencedores
                </h1>

                <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Dropdown de Edições */}
                        <div className="relative">
                            <select
                                className="block w-full sm:w-[180px] rounded-lg border border-purple-300 bg-white px-3 py-2 text-gray-700 focus:border-orange-500 focus:ring focus:ring-orange-500"
                                value={edicaoSelecionada}
                                onChange={(e) => setEdicaoSelecionada(e.target.value)}
                            >
                                {edicoes.map((edicao) => (
                                    <option key={edicao.ano} value={edicao.ano}>
                                        Edição {edicao.ano}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Dropdown de Áreas */}
                        <div className="relative">
                            <select
                                className="block w-full sm:w-[180px] rounded-lg border border-purple-300 bg-white px-3 py-2 text-gray-700 focus:border-orange-500 focus:ring focus:ring-orange-500"
                                value={areaSelecionada}
                                onChange={(e) => setAreaSelecionada(e.target.value)}
                            >
                                <option value="Todas">Todas</option>
                                {areas.map((area) => (
                                    <option key={area.id} value={area.nome}>
                                        {area.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {artigosFiltrados.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {artigosFiltrados.map((item) => (
                            <div
                                key={`${item.edicao}-${item.area}`}
                                className="bg-white shadow-md hover:shadow-lg rounded-lg p-4 transition-shadow"
                            >

                                {item.artigos.map((artigo) => (
                                    <div key={artigo.id} className="mb-4">
                                        <h2 className="text-lg font-semibold text-purple-700 flex items-start mb-4">
                                            <Trophy className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-1" />
                                            {artigo.titulo}
                                        </h2>

                                        <p className="text-sm text-gray-600 mt-2">
                                            <BookOpen className="inline-block mr-2 h-4 w-4 text-purple-600" />
                                            Autores: {artigo.autores}
                                        </p>
                                        <p className="text-sm text-gray-600 mt-2">
                                            <FileText className="inline-block mr-2 h-4 w-4 text-purple-600" />
                                            Nota Total: {artigo.somaNotas}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white shadow-md rounded-lg p-6 text-center">
                        <p className="text-gray-600">
                            Nenhum artigo vencedor encontrado para os critérios selecionados.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
