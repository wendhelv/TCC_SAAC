import { ClipboardList, Clock } from 'lucide-react'
import Link from 'next/link'
import { auth } from "@/auth"
import { findAvaliadorByUser } from '@/services/avaliadorService'
import { findUserByEmail } from '@/services/userService'
 

export default async function TelaInicialAvaliador() {
    const session = await auth()
    if (!session?.user?.email) {
      throw new Error("Email de usuário não encontrado na sessão.");
    }
    
    const usuario = await findUserByEmail(session.user.email); 
    
    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }
    
    const avaliador = await findAvaliadorByUser(usuario.id);

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-purple-800">Bem-vindo {avaliador?.nome}</h1>
          <p className="text-purple-600 mt-1 sm:mt-2 text-sm sm:text-base">Selecione uma opção para começar.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="mb-3 sm:mb-4 flex items-center text-base sm:text-lg font-semibold text-purple-700">
              <ClipboardList className="mr-2 h-5 w-5 text-orange-500" />
              Minhas Avaliações
            </div>
            <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600">Visualize e gerencie todas as suas avaliações realizadas.</p>
            <Link href="/interno/avaliador/minhas-avaliacoes">
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md p-2 transition-colors text-sm sm:text-base">
                Ver Minhas Avaliações
              </button>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="mb-3 sm:mb-4 flex items-center text-base sm:text-lg font-semibold text-purple-700">
              <Clock className="mr-2 h-5 w-5 text-orange-500" />
              Avaliações Pendentes
            </div>
            <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600">Acesse os artigos que aguardam sua avaliação.</p>
            <Link href="/interno/avaliador/avaliacoes-pendentes">
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md p-2 transition-colors text-sm sm:text-base">
                Ver Avaliações Pendentes
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
