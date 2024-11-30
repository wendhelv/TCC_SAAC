"use client";

import { useState, useEffect } from "react";
import { SearchIcon, PencilIcon, TrashIcon } from "lucide-react";
import { Label, Modal, TextInput } from "flowbite-react";
import { createArea, deleteArea, findAllAreas, updateArea } from "@/services/areaService";

export default function AreasDeConhecimento() {
  const [openModal, setOpenModal] = useState(false);
  const [ModalUpdate, setModalUpdate] = useState(false);
  const [nome, setNome] = useState("");
  const [busca, setBusca] = useState("");
  const [areas, setAreas] = useState<AreasData[]>([]);;
  const [atualizar, setAtualizar] = useState(false);
  const [areaId, setAreaId] = useState<number | null>(null);


  interface AreasData {
    id: number
    nome: string
  }


  useEffect(() => {
    const fetchAreas = async () => {
      const areasData = await findAllAreas();
      setAreas(areasData);
    };

    fetchAreas();
  }, [atualizar]);

  function onCloseModal() {
    setOpenModal(false);
    setModalUpdate(false);
    setNome("");
  }

  const handleSubmitArea = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const newArea = await createArea(nome);

      if (newArea) {
        alert("Área criada com sucesso!");
        setAtualizar(!atualizar);
        onCloseModal();
      }
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao criar a área. Tente novamente.");
    }
  };

  const openModalUpdate = (id: number) => {
    setAreaId(id);
    setModalUpdate(true);
  };

  const handleUpdateArea = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (areaId) {
        const updatedArea = await updateArea(areaId, nome);
        if (updatedArea) {
          alert("Área atualizada com sucesso!");
          setAtualizar(!atualizar);
          onCloseModal();
        }
      }
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao atualizar a área. Tente novamente.");
    }
  };

  const handleDeleteArea = async (id: number) => {
    try {
      const deletedArea = await deleteArea(id);

      if (deletedArea) {
        alert("Área apagada com sucesso!");
        setAtualizar(!atualizar);
        onCloseModal();
      }
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao apagar a área. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center align-middle mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-purple-800 mb-4 md:mb-0">
            Áreas de Conhecimento
          </h1>
          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="text-white bg-purple-600 border border-gray-300 focus:outline-none hover:bg-orange-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-md px-4 md:px-5 py-2 md:py-2.5 transition-colors duration-300"
          >
            Adicionar Área de Conhecimento
          </button>
        </div>

        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Buscar Área..."
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
                    Nome da Área
                  </th>
                  <th className="px-8 py-2 text-right text-purple-800">Ações</th>
                </tr>
              </thead>
              <tbody>
                {areas.length > 0 ? (
                  areas.map((area: any) => (
                    <tr
                      key={area.id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="px-4 py-2 font-medium">{area.nome}</td>
                      <td className="px-4 py-2">
                        <div className="flex space-x-2 justify-end">
                          <button className="text-purple-600 hover:text-orange-500 border border-gray-300 hover:border-orange-500 p-2 rounded-lg">
                            <PencilIcon className="h-4 w-4" onClick={() => { openModalUpdate(area.id); setNome(area.nome); }} />
                          </button>
                          <button
                            onClick={() => handleDeleteArea(area.id)}
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
                      colSpan={2}
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
      </div>

      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleSubmitArea}>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Nova Área
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label value="Nome da área" />
                </div>
                <TextInput
                  id="nome"
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                  required
                />
              </div>

              <div className="w-full">
                <button
                  type="submit"
                  className="text-white bg-purple-600 border border-gray-300 focus:outline-none hover:bg-orange-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 transition-colors duration-300"
                >
                  Criar Área de Conhecimento
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={ModalUpdate} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleUpdateArea}>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Atualizar Área
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label value="Nome da área" />
                </div>
                <TextInput
                  id="nome"
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                  required
                />
              </div>

              <div className="w-full">
                <button
                  type="submit"
                  className="text-white bg-purple-600 border border-gray-300 focus:outline-none hover:bg-orange-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 transition-colors duration-300"
                >
                  Atualizar Área de Conhecimento
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
