import { BookOpen, Users, FileText, BarChart2 } from 'lucide-react'
import Link from 'next/link'

export default function TelaInicial() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 sm:p-8">
      <div className="max-w-4xl w-full">
        <header className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-purple-800 mb-2">SAAC Ulbra Palmas</h1>
          <p className="text-lg sm:text-xl text-purple-600">Sistema de Avaliação de Artigos Científicos</p>
        </header>

        <div className="bg-white shadow-lg rounded-lg mb-8 p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-purple-800 mb-3 sm:mb-4">Bem-vindo ao SAAC</h2>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            O Sistema de Avaliação de Artigos Científicos (SAAC) da Ulbra Palmas é uma plataforma 
            dedicada à gestão e avaliação de artigos científicos, promovendo a excelência na pesquisa científica.
          </p>

          {/* Grid de Ícones */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-4 sm:mb-6">
            <div className="flex flex-col items-center text-center">
              <FileText className="h-8 w-8 text-orange-500 mb-1 sm:mb-2" />
              <span className="text-xs sm:text-sm text-purple-700">Gestão de Artigos</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Users className="h-8 w-8 text-orange-500 mb-1 sm:mb-2" />
              <span className="text-xs sm:text-sm text-purple-700">Avaliadores</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <BarChart2 className="h-8 w-8 text-orange-500 mb-1 sm:mb-2" />
              <span className="text-xs sm:text-sm text-purple-700">Estatísticas</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <BookOpen className="h-8 w-8 text-orange-500 mb-1 sm:mb-2" />
              <span className="text-xs sm:text-sm text-purple-700">Áreas de Conhecimento</span>
            </div>
          </div>

          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            Faça login para acessar todas as funcionalidades do sistema, incluindo submissão de artigos, 
            avaliação de trabalhos, gerenciamento de usuários e visualização de estatísticas.
          </p>
        </div>

        {/* Botão de Acesso */}
        <div className="text-center">
          <Link href="/login" className='text-white bg-purple-600 border border-gray-300 focus:outline-none hover:bg-orange-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 transition-colors duration-300'>
              Acessar o Sistema
          </Link>
        </div>
      </div>
    </div>
  )
}
