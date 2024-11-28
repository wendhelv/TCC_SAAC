"use client";

import { findArtigoById } from "@/services/artigoService";
import { findPerguntasParaAvaliacao } from "@/services/perguntaService";
import { createAvaliacao } from "@/services/avaliacaoService";
import { createRespostas } from "@/services/respostaService";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface AvaliarArtigoParams {
  idArtigo: string;
}

interface Artigo {
  id: number;
  idArea: number;
  titulo: string;
  autores: string;
  resumo: string;
  linkPdf: string;
  idEdicao: string;
  area: { nome: string };
}

interface Perguntas {
  id: number;
  texto: string;
  idArea: number;
  idEdicao: string;
}

const opcoes = [
  { valor: 0, label: "0" },
  { valor: 0.25, label: "0,25" },
  { valor: 0.5, label: "0,5" },
  { valor: 0.75, label: "0,75" },
  { valor: 1, label: "1" },
];

export default function AvaliacaoArtigo({
  params,
}: {
  params: AvaliarArtigoParams;
}) {
  const idArtigo = parseInt(params.idArtigo);
  const { data: session } = useSession()

  const [respostas, setRespostas] = useState<{ [key: number]: number }>({});
  const [artigo, setArtigo] = useState<Artigo>();
  const [perguntas, setPerguntas] = useState<Perguntas[]>([]);
  
  const router = useRouter()

  const handleRespostaChange = (perguntaId: number, valor: number) => {
    setRespostas((prev) => ({ ...prev, [perguntaId]: valor }));
  };

  const handleSubmit = async () => {
    try {
      
      if (perguntas.some((pergunta) => respostas[pergunta.id] === undefined)) {
        alert("Responda todas as perguntas antes de submeter.");
        return;
      }
      
      const notas = Object.values(respostas);
      const notaFinal = notas.reduce((acumulador, nota) => acumulador + nota, 0);
      
      if (!session?.user?.idAvaliador) {
        throw new Error("ID do avaliador não encontrado na sessão.");
      }
    
      const avaliacao = await createAvaliacao(
        session?.user?.idAvaliador,
        artigo?.id!,
        artigo?.idEdicao!,
        notaFinal
      );
  
      
      const respostasParaSalvar = perguntas.map((pergunta) => ({
        idAvaliacao: avaliacao.id,
        idPergunta: pergunta.id,
        nota: respostas[pergunta.id],
      }));
  
      await createRespostas(respostasParaSalvar);
  

      alert("Avaliação submetida com sucesso!");
      router.replace('/interno/avaliador/avaliacoes-pendentes')
      
    } catch (error) {
      console.error("Erro ao submeter avaliação:", error);
      alert("Erro ao submeter a avaliação. Tente novamente.");
    }
  };
  
  

  useEffect(() => {
    const fetchDados = async () => {
      const artigoData = await findArtigoById(idArtigo);
      setArtigo(artigoData as Artigo);

      if (artigoData?.idArea && artigoData?.idEdicao) {
        const perguntasData = await findPerguntasParaAvaliacao(
          artigoData.idArea,
          artigoData.idEdicao
        );

        if (Array.isArray(perguntasData)) {
          setPerguntas(perguntasData);
        } else {
          console.error(
            "Dados inesperados recebidos para perguntas:",
            perguntasData
          );
        }
      }
    };

    fetchDados();
  }, [idArtigo]);

  return (
    <div className="min-h-screen bg-purple-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-purple-800 mb-4 md:mb-6">
          Avaliação de Artigo
        </h1>
        <div className="bg-white shadow-md rounded-lg mb-4 md:mb-6 p-4">
          <h2 className="text-lg md:text-xl font-semibold text-purple-700 mb-2">
            Informações do Artigo
          </h2>
          <p className="text-sm md:text-base">
            <strong>Título:</strong> {artigo?.titulo}
          </p>
          <p className="text-sm md:text-base">
            <strong>Área de Conhecimento:</strong> {artigo?.area.nome}
          </p>
          <p className="text-sm md:text-base">
            <strong>Edição:</strong> {artigo?.idEdicao}
          </p>
          <p className="text-sm md:text-base">
            <strong>Arquivo pdf:</strong>{" "}
            <a
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              target="_blank"
              href={artigo?.linkPdf}
            >
              Link
            </a>
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {perguntas.length > 0 ? (
            perguntas.map((pergunta) => (
              <div
                key={pergunta.id}
                className="bg-white shadow-md rounded-lg mb-4 md:mb-6 p-4"
              >
                <h2 className="text-sm md:text-lg font-semibold text-purple-700 mb-2 md:mb-4">
                  {pergunta.texto}
                </h2>
                <div className="flex flex-wrap space-x-2 md:space-x-4">
                  {opcoes.map((opcao) => (
                    <div
                      key={opcao.valor}
                      className="flex items-center space-x-1 md:space-x-2"
                    >
                      <input
                        type="radio"
                        name={`pergunta-${pergunta.id}`}
                        value={opcao.valor}
                        id={`pergunta-${pergunta.id}-opcao-${opcao.valor}`}
                        className="text-orange-500 focus:ring-orange-500"
                        onChange={(e) =>
                          handleRespostaChange(
                            pergunta.id,
                            parseFloat(e.target.value)
                          )
                        }
                      />
                      <label
                        htmlFor={`pergunta-${pergunta.id}-opcao-${opcao.valor}`}
                        className="text-purple-800 text-sm md:text-base"
                      >
                        {opcao.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white shadow-md rounded-lg mb-4 md:mb-6 p-4">
              <h2 className="text-sm md:text-lg font-semibold text-purple-700 mb-2 md:mb-4">
                Perguntas não cadastradas para a edição
              </h2>
            </div>
          )}

          {perguntas.length > 0 && (
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
            >
              Submeter Avaliação
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
