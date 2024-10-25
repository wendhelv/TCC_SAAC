import Link from "next/link"
import { Lock } from 'lucide-react'; // Ícone de Lock da biblioteca Lucide React

export default function AcessoNegado() {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm text-center">
                <div className="flex justify-center mb-4">
                    <Lock size={48} className="text-purple-500" />
                </div>
                <h1 className="text-xl font-semibold text-gray-700 mb-2">
                    Acesso Negado
                </h1>
                <p className="text-gray-600 mb-4">
                    Você não tem permissão para acessar esta página. Entre em contato com
                    o administrador se achar que isso é um erro.
                </p>
                <Link href={"/"}>
                <button
                    className="text-white bg-purple-600 border border-gray-300 focus:outline-none hover:bg-orange-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-md px-4 md:px-5 py-2 md:py-2.5 transition-colors duration-300"
                >
                    Voltar para Home
                </button>
                </Link>
            </div>
        </div>
    );
}