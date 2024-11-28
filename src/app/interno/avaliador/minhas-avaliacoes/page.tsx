"use client";

import { useEffect, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import Link from "next/link";
import { getAvaliacoesPorAvaliador } from "@/services/avaliacaoService";
import { useSession } from "next-auth/react";


interface AvalicoesData {
  edicao: string
  artigos: {
    id: number;
    titulo: string;
    area: string;
    notaFinal: number;
  }[]
}

export default function RespostasAvaliador() {
  const { data: session } = useSession();
  const [avaliacoes, setAvaliacoes] = useState<AvalicoesData[]>([]);
  const [edicaoSelecionada, setEdicaoSelecionada] = useState("Todas");
  const [edicaoExpandida, setEdicaoExpandida] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      if (!session?.user?.idAvaliador) return;

      const avaliacoesData = await getAvaliacoesPorAvaliador(
        session.user.idAvaliador
      );
      setAvaliacoes(avaliacoesData);
    };

    fetchAvaliacoes();
  }, [session]);

  const toggleEdicao = (edicao: string) => {
    setEdicaoExpandida(edicaoExpandida === edicao ? null : edicao);
  };

  const avaliacoesExibidas =
    edicaoSelecionada === "Todas"
      ? avaliacoes
      : avaliacoes.filter((a: any) => a.edicao === edicaoSelecionada);

  return (
    <div className="min-h-screen bg-purple-50 p-4 sm:p-8">
  <div className="max-w-6xl mx-auto">
    <h1 className="text-2xl sm:text-3xl font-bold text-purple-800 mb-6 text-center sm:text-left">
      Minhas Avaliações
    </h1>

    {/* Filtro de Edição */}
    <div className="mb-6">
      <select
        value={edicaoSelecionada}
        onChange={(e) => setEdicaoSelecionada(e.target.value)}
        className="w-full sm:w-48 border border-purple-300 rounded-lg p-2 focus:border-orange-500 focus:ring-orange-500"
      >
        <option value="Todas">Todas as Edições</option>
        {avaliacoes.map((a: any) => (
          <option key={a.edicao} value={a.edicao}>
            Edição {a.edicao}
          </option>
        ))}
      </select>
    </div>

    {/* Avaliações */}
    {avaliacoesExibidas.map((avaliacao: any) => (
      <div
        key={avaliacao.edicao}
        className="mb-6 bg-white rounded-lg shadow-md"
      >
        <div
          className="bg-purple-100 p-4 cursor-pointer flex justify-between items-center rounded-t-lg"
          onClick={() => toggleEdicao(avaliacao.edicao)}
        >
          <h2 className="text-lg font-semibold text-purple-800">
            Edição {avaliacao.edicao}
          </h2>
          {edicaoExpandida === avaliacao.edicao ? (
            <ChevronUpIcon className="h-6 w-6 text-purple-600" />
          ) : (
            <ChevronDownIcon className="h-6 w-6 text-purple-600" />
          )}
        </div>
        {edicaoExpandida === avaliacao.edicao && (
          <div className="p-4 overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left text-purple-700 font-medium">
                    Título do Artigo
                  </th>
                  <th className="p-2 text-left text-purple-700 font-medium">
                    Área de Conhecimento
                  </th>
                  <th className="p-2 text-left text-purple-700 font-medium">
                    Nota Final
                  </th>
                  <th className="p-2 text-left text-purple-700 font-medium">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {avaliacao.artigos.map((artigo: any) => (
                  <tr
                    key={artigo.id}
                    className="border-t border-gray-300"
                  >
                    <td className="p-2 font-medium">{artigo.titulo}</td>
                    <td className="p-2">{artigo.area}</td>
                    <td className="p-2">
                      {artigo.notaFinal.toFixed(2)}
                    </td>
                    <td className="p-2">
                      <Link
                        href={`minhas-avaliacoes/detalhe/${artigo.idAvaliacao}`}
                      >
                        <button className="text-purple-600 hover:text-orange-500 border border-purple-300 hover:border-orange-500 rounded-md p-1">
                          Ver Detalhes
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    ))}
  </div>
</div>

  );
}
