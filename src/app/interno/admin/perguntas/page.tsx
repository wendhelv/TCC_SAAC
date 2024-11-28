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
import { findAllPerguntas, createPerguntas } from "@/services/perguntaService";

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

      if(perguntas) {
        alert("Perguntas criadas")
        onCloseModal()
        setAtualizar(!atualizar)
      }
  };

  useEffect(() => {

    const fetchPerguntas = async () => {
      const perguntasData = await findAllPerguntas();
      setPerguntas(perguntasData)
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-purple-800">
            Perguntas
          </h1>
          <button
            onClick={() => setOpenModal(true)}
            className="text-white bg-purple-600 border border-gray-300 focus:outline-none hover:bg-orange-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-md px-4 md:px-5 py-2 md:py-2.5 transition-colors duration-300"
          >
            Adicionar Pergunta
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="w-full md:w-1/4 space-y-4">
            <input
              type="text"
              placeholder="Buscar perguntas..."
              className="w-full border border-purple-300 rounded-lg px-4 py-2 focus:border-orange-500 focus:ring focus:ring-orange-500"
            />

            <select className="w-full border border-purple-300 rounded-lg px-4 py-2 focus:border-orange-500 focus:ring focus:ring-orange-500">
              <option value="">Selecione uma edição</option>
              <option value="2023">Edição 2023</option>
              <option value="2022">Edição 2022</option>
              <option value="2021">Edição 2021</option>
            </select>
            <select className="w-full border border-purple-300 rounded-lg px-4 py-2 focus:border-orange-500 focus:ring focus:ring-orange-500">
              <option value="">Selecione uma área</option>
              <option value="Computação">Computação</option>
              <option value="Engenharia">Engenharia</option>
              <option value="Física">Física</option>
            </select>
            <button className="w-full text-white bg-purple-600 border border-gray-300 focus:outline-none hover:bg-orange-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-md px-4 md:px-5 py-2 md:py-2.5 transition-colors duration-300">
              <div className="flex flex-row justify-center items-center space-x-1">
                <div>Aplicar</div>
                <div>
                  <SearchIcon className="h-5 w-5" />
                </div>
              </div>
            </button>
          </div>

          <div className="w-full md:w-3/4">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full table-auto">
                <thead className="bg-purple-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-purple-800">
                      Título
                    </th>
                    <th className="px-4 py-2 text-left text-purple-800">
                      Área de Conhecimento
                    </th>
                    <th className="px-4 py-2 text-left text-purple-800">
                      Edição
                    </th>
                    <th className="px-4 py-2 text-left text-purple-800">
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
                        <td className="px-4 py-2 font-medium">
                          {pergunta.texto}
                        </td>
                        <td className="px-4 py-2">{pergunta.area.nome}</td>
                        <td className="px-4 py-2">{pergunta.edicao.ano}</td>
                        <td className="px-4 py-2">
                          <div className="flex space-x-2">
                            <button className="text-purple-600 hover:text-orange-500 border border-gray-300 hover:border-orange-500 p-2 rounded-lg">
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button className="text-purple-600 hover:text-orange-500 border border-gray-300 hover:border-orange-500 p-2 rounded-lg">
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

            <div className="mt-4 flex justify-center">
              <nav aria-label="Page navigation example">
                <ul className="flex items-center -space-x-px h-8 text-sm">
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeftIcon className="w-4 h-4" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center px-3 h-8 leading-tight text-purple-600 border border-purple-300 bg-purple-50 hover:bg-purple-100 hover:text-purple-700"
                    >
                      1
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                    >
                      2
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                    >
                      3
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRightIcon className="w-4 h-4" />
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <Modal show={openModal} size="2xl" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleCriarPerguntas}>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Nova(s) Pergunta(s)
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label value="Edição" />
                </div>
                <select onChange={(e) => setEdicaoSelecionada(e.target.value)} required id="edicoes" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value={'vazio'}>Escolha uma edição</option>
                  {edicoes.length > 0 ? (
                    edicoes.map((edicao: any) => (
                      <option key={edicao.ano} value={edicao.ano}>{`${edicao.ano} - ${edicao.titulo}`}</option>
                    ))
                  ) : (
                    <></>
                  )}
                </select>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label value="Área de conhecimento" />
                </div>
                <select onChange={(e) => setAreaSelecionada(parseInt(e.target.value))} required id="areas" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option>Escolha uma área</option>
                  {areas.length > 0 ? (
                    areas.map((area: any) => (
                      <option key={area.id} value={area.id}>{area.nome}</option>
                    ))
                  ) : (
                    <></>
                  )}
                </select>
              </div>

              <div>
                <div className="mb-2 flex flex-row justify-between align-middle">
                  <Label value="Pergunta(s)" />

                  <button
                    type="button"
                    onClick={handleAddCampo}
                    className="ml-2 text-white bg-purple-600 p-2 rounded-full hover:bg-orange-500 transition-colors duration-300"
                  >
                    +
                  </button>
                </div>
                {camposPerguntas.map((campo, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <TextInput
                      value={campo}
                      onChange={(event) => handleChangePergunta(index, event)}
                      placeholder={`Digite a pergunta ${index + 1}`}
                      className="w-full"
                    />

                  </div>
                ))}
              </div>

              <div className="w-full">
                <button
                  type="submit"
                  className="text-white bg-purple-600 border border-gray-300 focus:outline-none hover:bg-orange-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 transition-colors duration-300"
                >
                  Criar Pergunta(s)
                </button>
              </div>
            </div>
          </form>

        </Modal.Body>
      </Modal>
    </div>
  );
}
