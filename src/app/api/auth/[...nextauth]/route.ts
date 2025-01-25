import { connectToDatabase } from "@/lib/mongodb";
import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/services/schema";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export const authOption:NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Seu email" },
        password: { label: "Senha", type: "password", placeholder: "Sua senha" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Credenciais inválidas.");
        }

        await connectToDatabase();

        const user = await User.findOne({ email: credentials.email });
        (await cookies()).set('user', user?._id);

        if (!user) {
          throw new Error("Usuário não encontrado.");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error("Senha incorreta.");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          address: user.address,
          zipCode: user.zipCode
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.address = user.address;
        token.zipCode = user.zipCode
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
        role: token.role,
        address: token.address,
        zipCode: token.zipCode
      };
      
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
