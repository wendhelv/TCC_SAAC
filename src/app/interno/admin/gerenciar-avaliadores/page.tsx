import { Users, BookUser } from "lucide-react";
import Link from "next/link";

export default function GerenciarAvaliadores() {
  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        
        <h1 className="text-3xl font-bold text-center text-purple-800">
          Painel de Gerenciamento
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <Link href="avaliadores">
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:border-orange-500 transition-all duration-200 ease-in-out dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <Users className="w-6 h-6 text-gray-900 dark:text-white" />
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  Gerenciar Avaliadores
                </h5>
              </div>
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                Acesse para gerenciar a lista de avaliadores, suas informações e áreas de especialização.
              </p>
            </div>
          </Link>

          <Link href="areas-de-conhecimento">
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:border-orange-500 transition-all duration-200 ease-in-out dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <BookUser className="w-6 h-6 text-gray-900 dark:text-white" />
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  Gerenciar Áreas
                </h5>
              </div>
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                Defina e gerencie as áreas de conhecimento utilizadas para classificar artigos e avaliadores.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
