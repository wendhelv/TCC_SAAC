"use client";
import { useState, useEffect } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession(); // Aqui obtemos a sessão e seu status

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setMessage("Credenciais Inválidas");
      setIsSuccess(false);
    } else {
      setMessage("Login bem-sucedido! Redirecionando...");
      setIsSuccess(true);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      const role = session.user?.role;

      if (role === "admin") {
        router.push("/interno/admin");
      } else if (role === "avaliador") {
        router.push("/interno/avaliador");
      } else {
        router.push("/");
      }
    }
  }, [status, session]);


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-600">
          SAAC LOGIN
        </h1>

        {message && (
          <div
            className={`mb-4 p-4 rounded-lg text-white ${
              isSuccess ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmitLogin} className="space-y-4">
          <div className="space-y-2">
            <p className="text-purple-600">Email</p>
            <input
              name="email"
              id="email"
              type="email"
              placeholder="Digite seu email"
              className="w-full border-purple-300 focus:border-orange-500 focus:ring-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <p className="text-purple-600">Senha</p>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                className="w-full border-purple-300 focus:border-orange-500 focus:ring-orange-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-purple-600 hover:text-orange-500"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-purple-600 border border-gray-300 focus:outline-none hover:bg-orange-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 transition-colors duration-300"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
