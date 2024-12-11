"use client";
import { useState, useEffect } from "react";
import {
  SearchIcon,
  PencilIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { Label, Modal, TextInput } from "flowbite-react";
import { findAllEdicoes } from "@/services/edicaoService";
import { findAllAreas } from "@/services/areaService";
import { findAllPerguntas, createPerguntas, updatePergunta, deletePergunta } from "@/services/perguntaService";

export default function GerenciamentoPerguntas() {

  interface PerguntasData {
    area: {
      nome: string;
    };
    edicao: {
      ano: string;
    };
    id: number;
    texto: string;
    idArea: number;
    idEdicao: string;

  }

  interface AreasData {
    id: number;
    nome: string;
  }

  interface EdicoesData {
    ano: string;
    titulo: string;
  }

  const [perguntas, setPerguntas] = useState<PerguntasData[]>([])
  const [areas, setAreas] = useState<AreasData[]>([]);
  const [edicoes, setEdicoes] = useState<EdicoesData[]>([]);
  const [atualizar, setAtualizar] = useState(false)

  const [openModal, setOpenModal] = useState(false);
  const [camposPerguntas, setCamposPerguntas] = useState([""]);

  const [edicaoSelecionada, setEdicaoSelecionada] = useState("");
  const [areaSelecionada, setAreaSelecionada] = useState(0);

  const [perguntaId, setPerguntaId] = useState<number | null>(null); // Identificar a pergunta sendo editada
  const [perguntaTexto, setPerguntaTexto] = useState<string>(""); // Texto da pergunta para edição
  const [modalUpdate, setModalUpdate] = useState(false); // Modal para editar pergunta


  const onOpenUpdateModal = (pergunta: PerguntasData) => {
    setPerguntaId(pergunta.id);
    setPerguntaTexto(pergunta.texto);
    setEdicaoSelecionada(pergunta.idEdicao);
    setAreaSelecionada(pergunta.idArea);
    setModalUpdate(true);
  };

  function onCloseModal() {
    setOpenModal(false);
    setEdicaoSelecionada('')
    setAreaSelecionada(0)
    setCamposPerguntas([""])
  }

  const handleAddCampo = () => {
    setCamposPerguntas([...camposPerguntas, ""]); // Adiciona uma nova string vazia ao array
  };

  const handleChangePergunta = (index: number, event: any) => {
    const novaPergunta = [...camposPerguntas];
    novaPergunta[index] = event.target.value; // Atualiza a pergunta específica pelo índice
    setCamposPerguntas(novaPergunta); // Atualiza o estado com o array modificado
  };

  const handleCriarPerguntas = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (camposPerguntas.some(pergunta => pergunta.trim() === "")) {
      alert("Por favor, preencha todas as perguntas antes de prosseguir.");
      return;
    }

    const perguntas = await createPerguntas(edicaoSelecionada, areaSelecionada, camposPerguntas)

    if (perguntas) {
      alert("Perguntas criadas")
      onCloseModal()
      setAtualizar(!atualizar)
    }
  };

  const handleUpdatePergunta = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!perguntaId || !perguntaTexto.trim()) {
      alert("Preencha todos os campos antes de prosseguir.");
      return;
    }

    try {
      await updatePergunta(perguntaId, perguntaTexto, edicaoSelecionada, areaSelecionada);
      setAtualizar(!atualizar);
      setModalUpdate(false);
      alert("Pergunta atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar pergunta:", error);
      alert("Ocorreu um erro ao atualizar a pergunta.");
    }
  };

  const handleDeletePergunta = async (id: number) => {
    const confirmar = confirm(
      "Tem certeza que deseja deletar esta pergunta? Esta ação não pode ser desfeita."
    );

    if (!confirmar) return;

    try {
      await deletePergunta(id);
      setAtualizar(!atualizar);
      alert("Pergunta deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar pergunta:", error);
      alert("Ocorreu um erro ao tentar deletar a pergunta.");
    }
  };


  useEffect(() => {

    const fetchPerguntas = async () => {
      const perguntasData = await findAllPerguntas();
      if (perguntasData) {
        setPerguntas(perguntasData);
      }
    }

    const fetchEdicoes = async () => {
      const edicoesData = await findAllEdicoes();
      setEdicoes(edicoesData);
    };

    const fetchAreas = async () => {
      const areasData = await findAllAreas();
      setAreas(areasData);
    };

    fetchPerguntas()
    fetchEdicoes()
    fetchAreas();
  }, [atualizar]);

  return (
    <div className="min-h-screen bg-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-center mb-8">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-purple-800">
            Perguntas
          </h1>
          <button
            onClick={() => setOpenModal(true)}
            className="text-white bg-purple-600 border border-gray-300 focus:outline-none hover:bg-orange-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm sm:text-md px-4 py-2 md:px-5 md:py-2.5 transition-colors duration-300"
          >
            Adicionar Pergunta
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 mb-8">
          <div className="w-full lg:w-1/4 space-y-4">
            <input
              type="text"
              placeholder="Buscar perguntas..."
              className="w-full border border-purple-300 rounded-lg px-4 py-2 text-sm md:text-base focus:border-orange-500 focus:ring focus:ring-orange-500"
            />

            <select className="w-full border border-purple-300 rounded-lg px-4 py-2 text-sm md:text-base focus:border-orange-500 focus:ring focus:ring-orange-500">
              <option value="">Selecione uma edição</option>
              <option value="2023">Edição 2023</option>
              <option value="2022">Edição 2022</option>
              <option value="2021">Edição 2021</option>
            </select>
            <select className="w-full border border-purple-300 rounded-lg px-4 py-2 text-sm md:text-base focus:border-orange-500 focus:ring focus:ring-orange-500">
              <option value="">Selecione uma área</option>
              <option value="Computação">Computação</option>
              <option value="Engenharia">Engenharia</option>
              <option value="Física">Física</option>
            </select>
            <button className="w-full text-white bg-purple-600 border border-gray-300 focus:outline-none hover:bg-orange-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm md:text-md px-4 md:px-5 py-2 md:py-2.5 transition-colors duration-300">
              <div className="flex flex-row justify-center items-center space-x-1">
                <span>Aplicar</span>
                <SearchIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
            </button>
          </div>

          <div className="w-full lg:w-3/4">
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <div className="max-h-96 overflow-y-scroll">
                <table className="w-full table-auto text-sm md:text-base">
                  <thead className="bg-purple-100 sticky top-0 z-10">
                    <tr>
                      <th className="px-2 py-2 md:px-4 text-left text-purple-800">
                        Título
                      </th>
                      <th className="px-2 py-2 md:px-4 text-left text-purple-800">
                        Área de Conhecimento
                      </th>
                      <th className="px-2 py-2 md:px-4 text-left text-purple-800">
                        Edição
                      </th>
                      <th className="px-2 py-2 md:px-4 text-left text-purple-800">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {perguntas.length > 0 ? (
                      perguntas.map((pergunta: any) => (
                        <tr
                          key={pergunta.id}
                          className="bg-white border-b hover:bg-gray-50"
                        >
                          <td className="px-2 py-2 md:px-4 font-medium">
                            {pergunta.texto}
                          </td>
                          <td className="px-2 py-2 md:px-4">{pergunta.area.nome}</td>
                          <td className="px-2 py-2 md:px-4">{pergunta.edicao.ano}</td>
                          <td className="px-2 py-2 md:px-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => onOpenUpdateModal(pergunta)}
                                className="text-purple-600 hover:text-orange-500 border border-gray-300 hover:border-orange-500 p-1 sm:p-2 rounded-lg"
                              >
                                <PencilIcon className="h-4 w-4" />
                              </button>

                              <button
                                onClick={() => handleDeletePergunta(pergunta.id)}
                                className="text-purple-600 hover:text-orange-500 border border-gray-300 hover:border-orange-500 p-1 sm:p-2 rounded-lg"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-4 py-2 text-center text-gray-500"
                        >
                          Não conseguimos localizar nenhuma pergunta
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Modal show={openModal} size="2xl" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleCriarPerguntas}>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Nova(s) Pergunta(s)
              </h3>
              <div>
                <Label value="Edição" />
                <select
                  onChange={(e) => setEdicaoSelecionada(e.target.value)}
                  required
                  className="w-full mt-2 bg-gray-50 border border-gray-300 rounded-lg p-2 text-sm focus:ring focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">Escolha uma edição</option>
                  {edicoes.map((edicao: any) => (
                    <option key={edicao.ano} value={edicao.ano}>
                      {`${edicao.ano} - ${edicao.titulo}`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label value="Área de conhecimento" />
                <select
                  onChange={(e) => setAreaSelecionada(parseInt(e.target.value))}
                  required
                  className="w-full mt-2 bg-gray-50 border border-gray-300 rounded-lg p-2 text-sm focus:ring focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">Escolha uma área</option>
                  {areas.map((area: any) => (
                    <option key={area.id} value={area.id}>
                      {area.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <Label value="Pergunta(s)" />
                  <button
                    type="button"
                    onClick={handleAddCampo}
                    className="text-white bg-purple-600 p-2 rounded-full hover:bg-orange-500 transition-colors"
                  >
                    +
                  </button>
                </div>
                {camposPerguntas.map((campo, index) => (
                  <div key={index} className="flex items-center mt-2">
                    <TextInput
                      value={campo}
                      onChange={(e) => handleChangePergunta(index, e)}
                      placeholder={`Digite a pergunta ${index + 1}`}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  className="text-white bg-purple-600 px-5 py-2 rounded-lg hover:bg-orange-500 transition-colors"
                >
                  Criar Pergunta(s)
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={modalUpdate} size="md" onClose={() => setModalUpdate(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleUpdatePergunta}>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Atualizar Pergunta
              </h3>
              <div>
                <Label value="Edição" />
                <select
                  value={edicaoSelecionada}
                  onChange={(e) => setEdicaoSelecionada(e.target.value)}
                  required
                  className="w-full mt-2 bg-gray-50 border border-gray-300 rounded-lg p-2 text-sm focus:ring focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">Escolha uma edição</option>
                  {edicoes.map((edicao: any) => (
                    <option key={edicao.ano} value={edicao.ano}>
                      {`${edicao.ano} - ${edicao.titulo}`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label value="Área de conhecimento" />
                <select
                  value={areaSelecionada}
                  onChange={(e) => setAreaSelecionada(parseInt(e.target.value))}
                  required
                  className="w-full mt-2 bg-gray-50 border border-gray-300 rounded-lg p-2 text-sm focus:ring focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">Escolha uma área</option>
                  {areas.map((area: any) => (
                    <option key={area.id} value={area.id}>
                      {area.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label value="Texto da pergunta" />
                <TextInput
                  id="texto"
                  value={perguntaTexto}
                  onChange={(e) => setPerguntaTexto(e.target.value)}
                  required
                />
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  className="text-white bg-purple-600 px-5 py-2 rounded-lg hover:bg-orange-500 transition-colors"
                >
                  Atualizar
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>

    </div>

  );
}
