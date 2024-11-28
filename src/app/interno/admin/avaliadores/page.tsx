"use client";

import React, { useState, useEffect } from "react";
import { SearchIcon, PencilIcon, TrashIcon } from "lucide-react";
import { Label, Modal, TextInput, Select } from "flowbite-react";
import {
  createAvaliador,
  updateAvaliador,
  deleteAvaliador,
  findAllAvaliadores,
} from "@/services/avaliadorService";
import { findAllAreas } from "@/services/areaService";

export default function Avaliadores() {
  const [atualizar, setAtualizar] = useState(false);

  const [dadosAvaliadores, setDadosAvaliadores] = useState([]);
  const [areas, setAreas] = useState<AreasData[]>([]);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [areasSelecionadas, setAreasSelecionadas] = useState([]);

  const [busca, setBusca] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [modalUpdateAvaliador, setModalUpdateAvaliador] = useState(false);
  const [avaliadorId, setAvaliadorId] = useState(null);

  interface AreasData {
    id: number;
    nome: string;
  }

  useEffect(() => {
    const fetchAvaliadores = async () => {
      const avaliadores = await findAllAvaliadores();
      setDadosAvaliadores(avaliadores);
    };

    fetchAvaliadores();
  }, [atualizar]);

  useEffect(() => {
    const fetchAreas = async () => {
      const areasData = await findAllAreas();
      setAreas(areasData);
    };

    fetchAreas();
  }, []);

  function onCloseModal() {
    setOpenModal(false);
    setModalUpdateAvaliador(false);
    setAvaliadorId(null);
    setNome("");
    setEmail("");
    setSenha("");
    setAreasSelecionadas([]);
  }

  const handleSubmitAvaliador = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (avaliadorId) {
        // Atualização
        const response = await updateAvaliador(
          avaliadorId,
          nome,
          email,
          senha,
          areasSelecionadas
        );
        alert("Avaliador atualizado com sucesso");
      } else {
        // Criação
        const response = await createAvaliador(
          nome,
          email,
          senha,
          areasSelecionadas
        );
        alert("Avaliador criado com sucesso");
      }

      onCloseModal();
      setAtualizar(!atualizar);
    } catch (error) {
      console.error("Erro ao salvar avaliador:", error);
    }
  };
  
  const openUpdateModal = (avaliador) => {
    setAvaliadorId(avaliador.id);
    setNome(avaliador.nome);
    setEmail(avaliador.usuario.email);
    setSenha("");
    setAreasSelecionadas(
      avaliador.AvaliadorAreas.map((areaObj) => areaObj.area.id)
    );
    setModalUpdateAvaliador(true);
  };

  const handleDeleteAvaliador = async (id: number) => {
    const deletedAvaliador = await deleteAvaliador(id);

    if (deletedAvaliador) {
      setAtualizar(!atualizar);
      alert("Avaliador apagado!");
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center align-middle mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-purple-800 mb-4 md:mb-0">
            Avaliadores
          </h1>
          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="text-white bg-purple-600 border border-gray-300 focus:outline-none hover:bg-orange-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-md px-4 md:px-5 py-2 md:py-2.5 transition-colors duration-300"
          >
            Adicionar Avaliador
          </button>
        </div>

        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Buscar avaliador..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-10 w-full border border-purple-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg py-2 px-4"
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-purple-100">
              <tr>
                <th className="px-4 py-2 text-left text-purple-800">
                  Nome do Avaliador
                </th>
                <th className="px-4 py-2 text-left text-purple-800">E-mail</th>
                <th className="px-4 py-2 text-left text-purple-800">
                  Áreas de Conhecimento
                </th>
                <th className="px-4 py-2 text-left text-purple-800">Ações</th>
              </tr>
            </thead>
            <tbody>
              {dadosAvaliadores.length > 0 ? (
                dadosAvaliadores.map((avaliador: any) => (
                  <tr
                    key={avaliador.id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-2 font-medium">{avaliador.nome}</td>
                    <td className="px-4 py-2">{avaliador.usuario.email}</td>
                    <td className="px-4 py-2">
                      {avaliador.AvaliadorAreas.map(
                        (areaObj) => areaObj.area.nome
                      ).join(", ")}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openUpdateModal(avaliador)}
                          className="text-purple-600 hover:text-orange-500 border border-gray-300 hover:border-orange-500 p-2 rounded-lg"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteAvaliador(avaliador.id)}
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
                    Não conseguimos localizar nenhuma área cadastrada
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleSubmitAvaliador}>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Novo avaliador
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label value="Nome do avaliador" />
                </div>
                <TextInput
                  id="nome"
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Email do avaliador" />
                </div>
                <TextInput
                  id="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Senha do avaliador" />
                </div>
                <TextInput
                  id="password"
                  type="password"
                  value={senha}
                  onChange={(event) => setSenha(event.target.value)}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="areas" value="Área(s) de conhecimento(s)" />
                </div>
                <Select
                  size={4}
                  multiple
                  id="areas"
                  required
                  onChange={(e) =>
                    setAreasSelecionadas(
                      Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      )
                    )
                  }
                >
                  {areas.length > 0 ? (
                    areas.map((area: any) => (
                      <option key={area.id} value={area.id}>
                        {area.nome}
                      </option>
                    ))
                  ) : (
                    <option value={"vazio"}>
                      Nenhuma localizamos nenhuma área cadastrada
                    </option>
                  )}
                </Select>
              </div>
              <div className="w-full">
                <button
                  type="submit"
                  className="text-white bg-purple-600 border border-gray-300 focus:outline-none hover:bg-orange-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 transition-colors duration-300"
                >
                  Criar avaliador
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={modalUpdateAvaliador} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleSubmitAvaliador}>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Atualizar avaliador
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label value="Nome do avaliador" />
                </div>
                <TextInput
                  id="nome"
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Email do avaliador" />
                </div>
                <TextInput
                  id="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Senha do avaliador" />
                </div>
                <TextInput
                  id="password"
                  type="password"
                  value={senha}
                  onChange={(event) => setSenha(event.target.value)}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="areas" value="Área(s) de conhecimento(s)" />
                </div>
                <Select
                  size={4}
                  multiple
                  id="areas"
                  required
                  value={areasSelecionadas}
                  onChange={(e) =>
                    setAreasSelecionadas(
                      Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      )
                    )
                  }
                >
                  {areas.length > 0 ? (
                    areas.map((area) => (
                      <option key={area.id} value={area.id}>
                        {area.nome}
                      </option>
                    ))
                  ) : (
                    <option value="vazio">
                      Nenhuma localizamos nenhuma área cadastrada
                    </option>
                  )}
                </Select>
              </div>
              <div className="w-full">
                <button
                  type="submit"
                  className="text-white bg-purple-600 border border-gray-300 focus:outline-none hover:bg-orange-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 transition-colors duration-300"
                >
                  Atualizar avaliador
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
