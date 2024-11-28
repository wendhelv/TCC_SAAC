"use client";

import { useState, useEffect } from "react";
import { findAvaliacaoById } from "@/services/avaliacaoService";

interface VisualizarAvaliacaoParams {
  idAvaliacao: string; // ID recebido da URL
}

interface Resposta {
  id: number;
  texto: string;
  nota: number;
}

interface Artigo {
  id: number;
  titulo: string;
  area: string;
  linkPdf: string;
  idEdicao: string;
}

interface Avaliacao {
  id: number;
  notaFinal: number;
  artigo: Artigo;
  respostas: Resposta[];
}

const opcoes = [
  { valor: 0, label: "0" },
  { valor: 0.25, label: "0,25" },
  { valor: 0.5, label: "0,5" },
  { valor: 0.75, label: "0,75" },
  { valor: 1, label: "1" },
];

export default function VisualizarAvaliacao({
  params,
}: {
  params: VisualizarAvaliacaoParams;
}) {
  const idAvaliacao = parseInt(params.idAvaliacao); // Obtém o ID da URL
  const [avaliacao, setAvaliacao] = useState<Avaliacao | null>(null);

  useEffect(() => {
    const fetchAvaliacao = async () => {
      try {
        const data = await findAvaliacaoById(idAvaliacao);
        setAvaliacao(data); // Atualiza o estado com a avaliação
      } catch (error) {
        console.error("Erro ao carregar avaliação:", error);
      }
    };

    fetchAvaliacao();
  }, [idAvaliacao]);

  if (!avaliacao) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="min-h-screen bg-purple-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-purple-800 mb-4 md:mb-6">
          Visualizar Avaliação
        </h1>
        <div className="bg-white shadow-md rounded-lg mb-4 md:mb-6 p-4">
          <h2 className="text-lg md:text-xl font-semibold text-purple-700 mb-2">
            Informações do Artigo
          </h2>
          <p className="text-sm md:text-base">
            <strong>Título:</strong> {avaliacao.artigo.titulo}
          </p>
          <p className="text-sm md:text-base">
            <strong>Área de Conhecimento:</strong> {avaliacao.artigo.area}
          </p>
          <p className="text-sm md:text-base">
            <strong>Edição:</strong> {avaliacao.artigo.idEdicao}
          </p>
          <p className="text-sm md:text-base">
            <strong>Arquivo pdf:</strong>{" "}
            <a
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              target="_blank"
              href={avaliacao.artigo.linkPdf}
            >
              Link
            </a>
          </p>
        </div>

        <div>
          {avaliacao.respostas.map((resposta) => (
            <div
              key={resposta.id}
              className="bg-white shadow-md rounded-lg mb-4 md:mb-6 p-4"
            >
              <h2 className="text-sm md:text-lg font-semibold text-purple-700 mb-2 md:mb-4">
                {resposta.texto}
              </h2>
              <div className="flex flex-wrap space-x-2 md:space-x-4">
                {opcoes.map((opcao) => (
                  <div
                    key={opcao.valor}
                    className="flex items-center space-x-1 md:space-x-2"
                  >
                    <input
                      type="radio"
                      name={`pergunta-${resposta.id}`}
                      value={opcao.valor}
                      id={`pergunta-${resposta.id}-opcao-${opcao.valor}`}
                      checked={resposta.nota === opcao.valor} // Preenche o valor da resposta
                      readOnly // Torna o campo apenas visualizável
                      className="text-orange-500 focus:ring-orange-500 cursor-not-allowed"
                    />
                    <label
                      htmlFor={`pergunta-${resposta.id}-opcao-${opcao.valor}`}
                      className="text-purple-800 text-sm md:text-base"
                    >
                      {opcao.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
