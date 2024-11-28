'use client'
import { createUser } from '@/services/userService';
import { Label, Modal, TextInput } from 'flowbite-react';
import { Users, ClipboardList, FileText, Star, BarChart2, Clock } from 'lucide-react'
import { useState } from 'react'

// Dados de exemplo
const dashboardData = {
  totalUsers: 500,
  adminUsers: 10,
  evaluators: 50,
  totalEvaluations: 1000,
  totalArticles: 300,
  averageScore: 4.2,
  articlesByEdition: [
    { edition: "2023", count: 150 },
    { edition: "2022", count: 100 },
    { edition: "2021", count: 50 },
  ],
  articlesByArea: [
    { area: "Computação", count: 100 },
    { area: "Engenharia", count: 80 },
    { area: "Física", count: 70 },
    { area: "Biologia", count: 50 },
  ],
  pendingEvaluations: 50,
}

export default function AdminDashboard() {

  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  const onCloseModal = () => {
    setOpenModal(false);
    setEmail("");
    setSenha("");

  }

  const handleSubmitNewAdmin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(email && senha){
      await createUser(email, senha, true)
    }
    else{
      alert("Campos não preenchidos")
      return;
    }
    onCloseModal()
    alert("Usuário administrativo criado!")
  }

  return (
    <div className="min-h-screen bg-purple-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className='flex flex-col md:flex-row justify-between items-center align-middle mb-8'>
          <h1 className="text-3xl font-bold text-purple-800 mb-8">Dashboard Administrativo</h1>
          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="text-white bg-purple-600 border border-gray-300 focus:outline-none hover:bg-orange-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-md px-4 md:px-5 py-2 md:py-2.5 transition-colors duration-300"
          >
            Adicionar Administrador
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Indicadores Gerais */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-medium text-purple-800">Total de Usuários</h2>
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-2xl font-bold">{dashboardData.totalUsers}</div>
            <p className="text-xs text-gray-500">
              Admins: {dashboardData.adminUsers} | Avaliadores: {dashboardData.evaluators}
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-medium text-purple-800">Total de Avaliações</h2>
              <ClipboardList className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-2xl font-bold">{dashboardData.totalEvaluations}</div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-medium text-purple-800">Total de Artigos</h2>
              <FileText className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-2xl font-bold">{dashboardData.totalArticles}</div>
          </div>

          {/* Indicadores de Desempenho e Qualidade */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-medium text-purple-800">Média de Nota Final</h2>
              <Star className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-2xl font-bold">{dashboardData.averageScore.toFixed(1)}</div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4 md:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-medium text-purple-800">Artigos por Edição e Área</h2>
              <BarChart2 className="h-5 w-5 text-purple-600" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold mb-2">Por Edição</h3>
                {dashboardData.articlesByEdition.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.edition}:</span>
                    <span>{item.count}</span>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2">Por Área</h3>
                {dashboardData.articlesByArea.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.area}:</span>
                    <span>{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Indicadores de Engajamento dos Avaliadores */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-medium text-purple-800">Avaliações Pendentes</h2>
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-2xl font-bold">{dashboardData.pendingEvaluations}</div>
          </div>
        </div>
      </div>

      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleSubmitNewAdmin}>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Novo Administrador
              </h3>
              
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Email do administrador" />
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
                  <Label htmlFor="password" value="Senha do administrador" />
                </div>
                <TextInput
                  id="password"
                  type="password"
                  value={senha}
                  onChange={(event) => setSenha(event.target.value)}
                  required
                />
              </div>
              
              <div className="w-full">
                <button
                  type="submit"
                  className="text-white bg-purple-600 border border-gray-300 focus:outline-none hover:bg-orange-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 transition-colors duration-300"
                >
                  Criar administrador
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  )
}
