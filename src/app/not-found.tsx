import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6">
      <div className="flex flex-col items-center text-center">
        <AlertTriangle className="h-16 w-16 text-orange-500 mb-4" />
        <h1 className="text-4xl font-bold text-purple-800 mb-2">Página não encontrada</h1>
        <p className="text-gray-600 mb-6">
          Desculpe, a página que você está tentando acessar não existe ou foi removida.
        </p>
        <a
          href="/"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg shadow-md"
        >
          Voltar para a Página Inicial
        </a>
      </div>
    </div>
  );
}
