import NextAuth, {CredentialsSignin} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyUser } from "./services/userService";
import { findAvaliadorByUser } from "./services/avaliadorService";

declare module "next-auth" {
  interface User {
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

        const user = await verifyUser(credentials.email, credentials.password);
        

        const role = user.superuser ? "admin" : "avaliador";

        let idAvaliador;
        if (role === "avaliador") {
          const avaliador = await findAvaliadorByUser(user.id);
          if (!avaliador) {
            throw new Error("Avaliador não encontrado");
          }
          idAvaliador = avaliador.id;
        }

        return { ...user, role, idAvaliador };
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
