"use client";

import { useState, useEffect } from "react";
import { Search, Clock, FileText, FileIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  findAvaliadorByUser,
  getArtigosNaoAvaliados,
} from "@/services/avaliadorService";
import { findUserByEmail } from "@/services/userService";

interface ArtigoPendente {
  id: number;
  idArea: number;
  titulo: string;
  autores: string;
  resumo: string;
  linkPdf: string;
  idEdicao: string;
  area: { id: number; nome: string };
  edicao: { ano: string; titulo: string };
}

export default function AvaliacoesPendentes() {
  const [artigosPendentes, setArtigosPendentes] = useState<ArtigoPendente[]>(
    []
  );
  const [busca, setBusca] = useState("");
  const [areaFiltro, setAreaFiltro] = useState("todas");

  const [loading, setLoading] = useState(false);
  const [fetchExecuted, setFetchExecuted] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchArtigosPendentes = async () => {
      if (session && !fetchExecuted) {
        setLoading(true);

        const email = session?.user?.email;

        if (!email) {
          throw new Error("O e-mail é necessário para encontrar o usuário.");
        }
        const usuario = await findUserByEmail(email);

        if (!usuario?.id) {
          throw new Error(
            "O ID do usuário é necessário para encontrar o avaliador."
          );
        }
        const avaliador = await findAvaliadorByUser(usuario.id);

        if (!avaliador?.id) {
          throw new Error(
            "O ID do avaliador é necessário para buscar artigos."
          );
        }
        const artigos = await getArtigosNaoAvaliados(avaliador.id);

        setArtigosPendentes(artigos);
        setLoading(false);
        setFetchExecuted(true);
      }
    };

    fetchArtigosPendentes();
  }, [session, fetchExecuted]);
  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-purple-800 mb-6">
          Avaliações Pendentes
        </h1>

        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-purple-700 mb-4">
            Filtros
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Buscar por título..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full border border-purple-300 rounded-lg p-2 pl-10 focus:border-orange-500 focus:ring-orange-500"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
            <select
              value={areaFiltro}
              onChange={(e) => setAreaFiltro(e.target.value)}
              className="w-full sm:w-[180px] border border-purple-300 rounded-lg p-2 focus:border-orange-500 focus:ring-orange-500"
            >
              <option value="todas">Todas as áreas</option>
              <option value="Computação">Computação</option>
              <option value="Física">Física</option>
              <option value="Engenharia Ambiental">Engenharia Ambiental</option>
              <option value="Biologia">Biologia</option>
            </select>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left text-purple-700 font-medium">
                  Edição do Artigo
                </th>
                <th className="p-4 text-left text-purple-700 font-medium">
                  Título do Artigo
                </th>
                <th className="p-4 text-left text-purple-700 font-medium">
                  Área de Conhecimento
                </th>
                <th className="p-4 text-left text-purple-700 font-medium">
                  Artigo PDF
                </th>
                <th className="p-4 text-left text-purple-700 font-medium">
                  Ação
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center p-4">
                    <div
                      role="status"
                      className="flex justify-center items-center"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : artigosPendentes.length > 0 ? (
                artigosPendentes.map((artigo: any) => (
                  <tr key={artigo.id} className="border-t">
                    <td className="p-4 font-medium">{artigo.edicao.ano}</td>
                    <td className="p-4 font-medium">{artigo.titulo}</td>
                    <td className="p-4">{artigo.area.nome}</td>
                    <td className="p-4">
                      <a
                        href={`${artigo.linkPdf}`}
                        target="_blank"
                        className="text-purple-600 hover:text-orange-500"
                      >
                        <FileIcon className="h-5 w-5" />
                      </a>
                    </td>
                    <td className="p-4">
                      <Link href={`avaliacoes-pendentes/artigo/${artigo.id}`}>
                        <button className="text-white bg-orange-500 hover:bg-orange-600 rounded-lg px-4 py-2 flex items-center">
                          <FileText className="mr-2 h-4 w-4" />
                          Avaliar
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-2 text-center text-gray-500"
                  >
                    Não encontramos nenhuma pendência
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
