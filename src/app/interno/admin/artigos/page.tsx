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

const artigos = [
  { id: 1, titulo: "Inteligência Artificial na Medicina", area: "Computação" },
  {
    id: 2,
    titulo: "Energias Renováveis e Sustentabilidade",
    area: "Engenharia Ambiental",
  },
  { id: 3, titulo: "Avanços em Nanotecnologia", area: "Física" },
  { id: 4, titulo: "Tecnologia Quântica", area: "Física" },
  { id: 5, titulo: "Robótica Avançada", area: "Engenharia Mecatrônica" },
  { id: 6, titulo: "Biotecnologia em Saúde", area: "Biologia" },
];

export default function GerenciamentoArtigos() {
  const [openModal, setOpenModal] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [autores, setAutores] = useState("");
  const [resumo, setResumo] = useState("");
  const [link, setLink] = useState("");
  const [ano, setAno] = useState("");

  function onCloseModal() {
    setOpenModal(false);
  }

  return (
    <div className="min-h-screen bg-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-purple-800">
            Artigos
          </h1>
          <button
            onClick={() => setOpenModal(true)}
            className="text-white bg-purple-600 border border-gray-300 focus:outline-none hover:bg-orange-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-md px-4 md:px-5 py-2 md:py-2.5 transition-colors duration-300"
          >
            Adicionar Artigo
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="w-full md:w-1/4 space-y-4">
            <input
              type="text"
              placeholder="Buscar artigos..."
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
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {artigos.map((artigo) => (
                    <tr
                      key={artigo.id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="px-4 py-2 font-medium">{artigo.titulo}</td>
                      <td className="px-4 py-2">{artigo.area}</td>
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
              Novo Artigo
            </h3>
            <div>
              <div className="mb-2 block">
                <Label value="Titulo do artigo" />
              </div>
              <TextInput
                id="nome"
                value={titulo}
                onChange={(event) => setTitulo(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="Autores do artigo" />
              </div>
              <TextInput
                id="nome"
                value={autores}
                onChange={(event) => setAutores(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="Resumo do artigo" />
              </div>
              <textarea
                id="message"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={resumo}
                onChange={(event) => setResumo(event.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="Link do artigo" />
              </div>
              <TextInput
                id="nome"
                value={link}
                onChange={(event) => setLink(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="Ano do artigo" />
              </div>
              <TextInput
                id="nome"
                value={ano}
                onChange={(event) => setAno(event.target.value)}
                required
              />
            </div>

            <div className="w-full">
              <button
                type="button"
                className="text-white bg-purple-600 border border-gray-300 focus:outline-none hover:bg-orange-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 transition-colors duration-300"
              >
                Criar Artigo
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
