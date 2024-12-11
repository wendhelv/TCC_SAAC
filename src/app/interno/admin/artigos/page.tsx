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
import { findAllAreas } from "@/services/areaService";
import { findAllEdicoes } from "@/services/edicaoService";
import {
  createArtigo,
  deleteArtigo,
  findAllArtigos,
  updateArtigo,
} from "@/services/artigoService";
import Link from "next/link";

export default function GerenciamentoArtigos() {
  interface AreasData {
    id: number;
    nome: string;
  }

  interface EdicoesData {
    ano: string;
    titulo: string;
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
    edicao: { ano: string };
  }

  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const [areas, setAreas] = useState<AreasData[]>([]);
  const [edicoes, setEdicoes] = useState<EdicoesData[]>([]);

  const [atualizar, setAtualizar] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [edicaoSelecionada, setEdicaoSelecionada] = useState("");
  const [areaSelecionada, setAreaSelecionada] = useState(0);
  const [titulo, setTitulo] = useState("");
  const [autores, setAutores] = useState("");
  const [resumo, setResumo] = useState("");
  const [linkPdf, setLinkPdf] = useState("");

  const [modalUpdateArtigo, setModalUpdateArtigo] = useState(false);
  const [artigoId, setArtigoId] = useState(null);

  function onCloseModal() {
    setOpenModal(false);
    setModalUpdateArtigo(false);
    setArtigoId(null)
    setEdicaoSelecionada("");
    setAreaSelecionada(0);
    setTitulo("");
    setAutores("");
    setResumo("");
    setLinkPdf("");
  }

  function onOpenUpdateModal(artigo: any) {
    setArtigoId(artigo.id);
    setEdicaoSelecionada(artigo.idEdicao);
    setAreaSelecionada(artigo.idArea);
    setTitulo(artigo.titulo);
    setAutores(artigo.autores);
    setResumo(artigo.resumo);
    setLinkPdf(artigo.linkPdf);
    setModalUpdateArtigo(true);
  }

  useEffect(() => {
    const fetchArtigos = async () => {
      const artigos = (await findAllArtigos()) || [];
      setArtigos(artigos);
    };

    const fetchEdicoes = async () => {
      const edicoesData = await findAllEdicoes();
      setEdicoes(edicoesData);
    };

    const fetchAreas = async () => {
      const areasData = await findAllAreas();
      setAreas(areasData);
    };

    fetchArtigos();
    fetchEdicoes();
    fetchAreas();
  }, [atualizar]);

  const handleSubmitArtigo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      if (artigoId) {
        
        await updateArtigo(
          artigoId,
          edicaoSelecionada,
          areaSelecionada,
          titulo,
          autores,
          resumo,
          linkPdf
        );
        alert("Artigo atualizado com sucesso");
      } else {
        
        await createArtigo(
          edicaoSelecionada,
          areaSelecionada,
          titulo,
          autores,
          resumo,
          linkPdf
        );
        alert("Artigo criado com sucesso");
      }
      setAtualizar(!atualizar);
      onCloseModal();
    } catch (error) {
      alert(
        `Ocorreu um erro ao ${
          artigoId ? "atualizar" : "criar"
        } o artigo. Tente novamente.`
      );
      console.error("Erro ao salvar artigo:", error);
    }
  };
  
  const handleDeleteArtigo = async (id: number) => {
    try {
      await deleteArtigo(id);
      setAtualizar(!atualizar);
      alert("Artigo apagado com sucesso!");
    } catch (error) {
      alert("Ocorreu um erro ao apagar o artigo");
      console.error("Erro ao apagar:", error);
    }
  };
  return (
    <div className="min-h-screen bg-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho e Botões */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <h1 className="text-2xl md:text-4xl font-bold text-purple-800">
            Artigos
          </h1>
          <div className="flex flex-col sm:flex-row sm:space-x-4 w-full sm:w-auto space-y-4 sm:space-y-0">
            <Link href={"artigos/vencedores"}>
              <button className="w-full sm:w-auto text-white bg-purple-600 border border-gray-300 focus:outline-none hover:bg-orange-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-md px-4 md:px-5 py-2 md:py-2.5 transition-colors duration-300">
                Artigos Vencedores
              </button>
            </Link>
            <button
              onClick={() => setOpenModal(true)}
              className="w-full sm:w-auto text-white bg-purple-600 border border-gray-300 focus:outline-none hover:bg-orange-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-md px-4 md:px-5 py-2 md:py-2.5 transition-colors duration-300"
            >
              Adicionar Artigo
            </button>
          </div>
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
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <div className="max-h-96 overflow-y-scroll">
                <table className="min-w-full table-auto">
                  <thead className="bg-purple-100 sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-2 text-left text-purple-800">
                        Título
                      </th>
                      <th className="px-4 py-2 text-left text-purple-800">
                        Edição
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
                    {artigos.length > 0 ? (
                      artigos.map((artigo: any) => (
                        <tr
                          key={artigo.id}
                          className="bg-white border-b hover:bg-gray-50"
                        >
                          <td className="px-4 py-2 font-medium">
                            {artigo.titulo}
                          </td>
                          <td className="px-4 py-2">{artigo.edicao.ano}</td>
                          <td className="px-4 py-2">{artigo.area.nome}</td>
                          <td className="px-4 py-2">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => onOpenUpdateModal(artigo)}
                                className="text-purple-600 hover:text-orange-500 border border-gray-300 hover:border-orange-500 p-2 rounded-lg"
                              >
                                <PencilIcon className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteArtigo(artigo.id)}
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
                          Não conseguimos localizar nenhum artigo cadastrado
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

      <Modal show={modalUpdateArtigo || openModal} size="7xl" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleSubmitArtigo}>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                {artigoId ? "Editar Artigo" : "Novo Artigo"}
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label value="Edição do artigo" />
                </div>
                <select
                  value={edicaoSelecionada}
                  onChange={(e) => setEdicaoSelecionada(e.target.value)}
                  required
                  id="edicoes"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value={""}>Escolha uma edição</option>
                  {edicoes.length > 0 &&
                    edicoes.map((edicao: any) => (
                      <option key={edicao.ano} value={edicao.ano}>
                        {`${edicao.ano} - ${edicao.titulo}`}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label value="Área do artigo" />
                </div>
                <select
                  value={areaSelecionada}
                  onChange={(e) => setAreaSelecionada(parseInt(e.target.value))}
                  required
                  id="areas"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value={0}>Escolha uma área</option>
                  {areas.length > 0 &&
                    areas.map((area: any) => (
                      <option key={area.id} value={area.id}>
                        {area.nome}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label value="Titulo do artigo" />
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
                  <Label value="Autores do artigo" />
                </div>
                <TextInput
                  id="autores"
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
                  id="resumo"
                  rows={10}
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
                  id="linkPdf"
                  value={linkPdf}
                  onChange={(event) => setLinkPdf(event.target.value)}
                  required
                />
              </div>
              <div className="w-full">
                <button
                  type="submit"
                  className="text-white bg-purple-600 border border-gray-300 focus:outline-none hover:bg-orange-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 transition-colors duration-300"
                >
                  {artigoId ? "Atualizar Artigo" : "Criar Artigo"}
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>;
    </div>
  );
}
