"use client";
import { useState } from "react";
import {
  SearchIcon,
  PencilIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { Label, Modal, TextInput } from "flowbite-react";

const perguntas = [
  {
    id: 1,
    pergunta: "Qual é a originalidade do artigo em relação ao estado da arte?",
    area: "Computação",
    edicao: "2023",
  },
  {
    id: 2,
    pergunta: "O artigo apresenta uma estrutura clara e coerente?",
    area: "Engenharia",
    edicao: "2022",
  },
  {
    id: 3,
    pergunta:
      "Os métodos utilizados no artigo são adequados para o problema abordado?",
    area: "Física",
    edicao: "2021",
  },
  {
    id: 4,
    pergunta: "O artigo contribui significativamente para o avanço da área?",
    area: "Biologia",
    edicao: "2023",
  },
  {
    id: 5,
    pergunta: "A revisão da literatura está bem fundamentada e atualizada?",
    area: "Medicina",
    edicao: "2022",
  },
  {
    id: 6,
    pergunta:
      "A qualidade da redação e a organização das ideias são satisfatórias?",
    area: "Matemática",
    edicao: "2021",
  },
];

export default function GerenciamentoPerguntas() {
  const [openModal, setOpenModal] = useState(false);
  const [camposPerguntas, setCamposPerguntas] = useState([""]);

  function onCloseModal() {
    setOpenModal(false);
  }

  const handleAddCampo = () => {
    setCamposPerguntas([...camposPerguntas, ""]); // Adiciona uma nova string vazia ao array
  };

  const handleChangePergunta = (index: number, event: any) => {
    const novaPergunta = [...camposPerguntas];
    novaPergunta[index] = event.target.value; // Atualiza a pergunta específica pelo índice
    setCamposPerguntas(novaPergunta); // Atualiza o estado com o array modificado
  };

  const handleCriarPerguntas = () => {
    console.log(camposPerguntas); // Imprime o array de perguntas no console
    camposPerguntas.map((pergunta) => (
      alert(pergunta)
    ))
  };

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
                  {perguntas.map((pergunta) => (
                    <tr
                      key={pergunta.id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="px-4 py-2 font-medium">
                        {pergunta.pergunta}
                      </td>
                      <td className="px-4 py-2">{pergunta.area}</td>
                      <td className="px-4 py-2">{pergunta.edicao}</td>
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
                  ))}
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
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Nova(s) Pergunta(s)
            </h3>
            <div>
              <div className="mb-2 block">
                <Label value="Edição" />
              </div>
              <select
                id="edicao"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Escolha uma Edição</option>
                <option value="2024">Edição 2024</option>
                <option value="2023">Edição 2023</option>
                <option value="2022">Edição 2022</option>
                <option value="2021">Edição 2021</option>
              </select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="Área de conhecimento" />
              </div>
              <select
                id="area"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Escolha uma Área</option>
                <option value="Saúde">Saúde</option>
                <option value="Exatas">Exatas</option>
                <option value="Humanas">Humanas</option>
                <option value="Computação">Computação</option>
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
                type="button"
                onClick={handleCriarPerguntas}
                className="text-white bg-purple-600 border border-gray-300 focus:outline-none hover:bg-orange-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 transition-colors duration-300"
              >
                Criar Pergunta(s)
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
