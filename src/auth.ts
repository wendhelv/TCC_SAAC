import NextAuth, {CredentialsSignin} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyUser } from "./services/userService";

declare module "next-auth" {
  interface User{
    role: string
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

        return { ...user, role };;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role
      return token
    },
    session({ session, token }) {
      session.user.role = token.role as string
      return session
    }
  }
});
