"use client";

import React, { useState, useEffect } from "react";
import { SearchIcon, PencilIcon, TrashIcon } from "lucide-react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import {
  createEdicao,
  deleteEdicao,
  findAllEdicoes,
  updateEdicao,
} from "@/services/edicaoService";
import { findAllAvaliadores } from "@/services/avaliadorService";

export default function Edicoes() {
  interface Edicao {
    ano: string;
    titulo: string;
  }

  interface AvaliadoresData {
    usuario: {
      email: string;
    };
    AvaliadorAreas: {
      area: {
        id: number;
        nome: string;
      };
    }[];
    id: number;
    idUsuario: number;
    nome: string;
  }

  const [dadosEdicoes, setDadosEdicoes] = useState<Edicao[]>([]);
  const [atualizar, setAtualizar] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [ano, setAno] = useState("");

  const [busca, setBusca] = useState("");

  const [ModalUpdateEdicao, setModalUpdateEdicao] = useState(false);
  const [edicaoAno, setEdicaoAno] = useState(null);

  const [buscaAvaliadores, setBuscaAvaliadores] = useState("");
  const [avaliadores, setAvaliadores] = useState<AvaliadoresData[]>([]);
  const [avaliadoresFiltrados, setAvaliadoresFiltrados] = useState(avaliadores);
  const [avaliadoresSelecionados, setAvaliadoresSelecionados] = useState<
    number[]
  >([]);

  useEffect(() => {
    setAvaliadoresFiltrados(
      avaliadores.filter((avaliador) =>
        avaliador.nome.toLowerCase().includes(buscaAvaliadores.toLowerCase())
      )
    );
  }, [buscaAvaliadores, avaliadores]);

  // Adicionar ou remover avaliador selecionado
  const toggleAvaliadorSelecionado = (id: number) => {
    setAvaliadoresSelecionados((prev) =>
      prev.includes(id) ? prev.filter((aid) => aid !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const fetchEdicoes = async () => {
      const edicoes = await findAllEdicoes();
      setDadosEdicoes(edicoes);
    };

    const fetchAvaliadores = async () => {
      const avaliadoresData = await findAllAvaliadores();
      setAvaliadores(avaliadoresData);
    };

    fetchEdicoes();
    fetchAvaliadores();
  }, [atualizar]);

  function onCloseModal() {
    setOpenModal(false);
    setModalUpdateEdicao(false);
    setAno("");
    setTitulo("");
    setEdicaoAno(null);
    setAvaliadoresSelecionados([])
  }

  const openUpdateModal = (edicao: any) => {
    setEdicaoAno(edicao.ano);
    setAno(edicao.ano);
    setTitulo(edicao.titulo);

    // Preencher os avaliadores selecionados com os avaliadores da edição
    const avaliadoresIds = edicao.AvaliadorEdicoes?.map(
      (avaliadorEdicao: any) => avaliadorEdicao.avaliador.id
    );
    setAvaliadoresSelecionados(avaliadoresIds || []);

    setModalUpdateEdicao(true);
  };

  const handleSubmitEdicao = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (edicaoAno) {
        // Atualizar a edição existente com os avaliadores selecionados
        await updateEdicao(ano, titulo, avaliadoresSelecionados);
        alert("Edição atualizada com sucesso!");
      } else {
        // Criar uma nova edição
        await createEdicao(ano, titulo, avaliadoresSelecionados);
        alert("Edição criada com sucesso!");
      }

      setAtualizar(!atualizar);
      onCloseModal();
    } catch (error) {
      alert("Ocorreu um erro ao salvar a edição. Tente novamente.");
      console.error("Erro ao salvar edição:", error);
    }
  };

  const handleDeleteEdicao = async (ano: string) => {
    try {
      const deletedEdicao = await deleteEdicao(ano);
      if (deletedEdicao) {
        setAtualizar(!atualizar);
        alert("Edição apagada com sucesso");
      }
    } catch (error) {
      alert("Erro ao apagar edição. Tente novamente");
    }
  };
  return (
    <div className="min-h-screen bg-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center align-middle mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-purple-800 mb-4 md:mb-0">
            Edições
          </h1>
          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="text-white bg-purple-600 border border-gray-300 focus:outline-none hover:bg-orange-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-md px-4 md:px-5 py-2 md:py-2.5 transition-colors duration-300"
          >
            Adicionar Edição
          </button>
        </div>

        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Buscar edição..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-10 w-full border border-purple-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg py-2 px-4"
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <div className="max-h-96 overflow-y-scroll">
            <table className="min-w-full table-auto">
              <thead className="bg-purple-100 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2 text-left text-purple-800">
                    Ano (ID)
                  </th>
                  <th className="px-4 py-2 text-left text-purple-800">
                    Nome da Edição
                  </th>
                  <th className="px-4 py-2 text-left text-purple-800">
                    Avaliadores
                  </th>
                  <th className="px-8 py-2 text-right text-purple-800">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {dadosEdicoes.length > 0 ? (
                  dadosEdicoes.map((edicao: any) => (
                    <tr
                      key={edicao.ano}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="px-4 py-2 font-medium">{edicao.ano}</td>
                      <td className="px-4 py-2 font-medium">{edicao.titulo}</td>
                      <td className="px-4 py-2 font-medium">
                        {edicao.AvaliadorEdicoes &&
                          edicao.AvaliadorEdicoes.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {edicao.AvaliadorEdicoes.map(
                              (avaliadorEdicao: any) => (
                                <span
                                  key={avaliadorEdicao.avaliador.id}
                                  className="text-sm text-gray-600 bg-purple-100 rounded px-2 py-1"
                                >
                                  {avaliadorEdicao.avaliador.nome}
                                </span>
                              )
                            )}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">
                            Sem avaliadores
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex space-x-2 justify-end">
                          <button
                            onClick={() => openUpdateModal(edicao)}
                            className="text-purple-600 hover:text-orange-500 border border-gray-300 hover:border-orange-500 p-2 rounded-lg"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteEdicao(edicao.ano)}
                            className="text-purple-600 hover:text-orange-500 border border-gray-300 hover:border-orange-500 p-2 rounded-lg"
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
                      Não conseguimos localizar nenhuma edição cadastrada
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal show={openModal} size="lg" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleSubmitEdicao}>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Nova Edição
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label value="Ano (id)" />
                </div>
                <TextInput
                  id="ano"
                  value={ano}
                  onChange={(event) => setAno(event.target.value)}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label value="Titulo da Edição" />
                </div>
                <TextInput
                  id="titulo"
                  value={titulo}
                  onChange={(event) => setTitulo(event.target.value)}
                  required
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label value="Selecionar Avaliadores" />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Pesquisar avaliadores..."
                    className="w-full border border-purple-300 rounded-lg px-4 py-2 focus:border-orange-500 focus:ring focus:ring-orange-500"
                    value={buscaAvaliadores}
                    onChange={(e) => setBuscaAvaliadores(e.target.value)}
                  />
                  <div className="mt-2 max-h-60 overflow-y-auto border border-purple-300 rounded-lg p-2 bg-white shadow-lg">
                    {avaliadoresFiltrados.map((avaliador) => (
                      <div
                        key={avaliador.id}
                        className={`flex items-center justify-between p-2 hover:bg-purple-100 rounded-md cursor-pointer ${avaliadoresSelecionados.includes(avaliador.id)
                            ? "bg-purple-200"
                            : ""
                          }`}
                        onClick={() => toggleAvaliadorSelecionado(avaliador.id)}
                      >
                        <span>{avaliador.nome}</span>
                        {avaliadoresSelecionados.includes(avaliador.id) && (
                          <span className="text-orange-500">Selecionado</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full">
                <button
                  type="submit"
                  className="text-white bg-purple-600 border border-gray-300 focus:outline-none hover:bg-orange-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 transition-colors duration-300"
                >
                  Criar Edição
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={ModalUpdateEdicao} size="lg" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleSubmitEdicao}>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Editar Edição
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label value="Ano (id)" />
                </div>
                <TextInput
                  id="ano"
                  value={ano}
                  onChange={(event) => setAno(event.target.value)}
                  readOnly
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label value="Titulo da Edição" />
                </div>
                <TextInput
                  id="titulo"
                  value={titulo}
                  onChange={(event) => setTitulo(event.target.value)}
                  required
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label value="Selecionar Avaliadores" />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Pesquisar avaliadores..."
                    className="w-full border border-purple-300 rounded-lg px-4 py-2 focus:border-orange-500 focus:ring focus:ring-orange-500"
                    value={buscaAvaliadores}
                    onChange={(e) => setBuscaAvaliadores(e.target.value)}
                  />
                  <div className="mt-2 max-h-60 overflow-y-auto border border-purple-300 rounded-lg p-2 bg-white shadow-lg">
                    {avaliadoresFiltrados.map((avaliador) => (
                      <div
                        key={avaliador.id}
                        className={`flex items-center justify-between p-2 hover:bg-purple-100 rounded-md cursor-pointer ${avaliadoresSelecionados.includes(avaliador.id)
                            ? "bg-purple-200"
                            : ""
                          }`}
                        onClick={() => toggleAvaliadorSelecionado(avaliador.id)}
                      >
                        <span>{avaliador.nome}</span>
                        {avaliadoresSelecionados.includes(avaliador.id) && (
                          <span className="text-orange-500">Selecionado</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full">
                <button
                  type="submit"
                  className="text-white bg-purple-600 border border-gray-300 focus:outline-none hover:bg-orange-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 transition-colors duration-300"
                >
                  Editar Edição
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
