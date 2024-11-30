import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyUser } from "./services/userService";
import { findAvaliadorByUser } from "./services/avaliadorService";

declare module "next-auth" {
  interface User {
    senha: string;
    superuser: boolean;
    role: string; 
    idAvaliador?: number;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Sem credenciais");
        }

        const user = await verifyUser(credentials.email as string, credentials.password as string);
        

        const role = user.superuser ? "admin" : "avaliador";

        let idAvaliador;
        if (role === "avaliador") {
          const avaliador = await findAvaliadorByUser(user.id);
          if (!avaliador) {
            throw new Error("Avaliador não encontrado");
          }
          idAvaliador = avaliador.id;
        }

        return { ...user, id: user.id.toString(), role, idAvaliador } as User;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        if (user.idAvaliador) {
          token.idAvaliador = user.idAvaliador;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role as string;
      if (token.idAvaliador) {
        session.user.idAvaliador = token.idAvaliador as number;
      }
      return session;
    },
  },
});
