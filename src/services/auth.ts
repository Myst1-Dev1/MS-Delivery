import { signInSchema } from "@/lib/zod";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET
        // }),
        Credentials({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" },
            },
        async authorize(credentials) {
            let user = null;

            const parsedCredentials = signInSchema.safeParse(credentials);
            if (!parsedCredentials.success) {
                console.error("Invalid credentials:", parsedCredentials.error.errors);
                return null;
            }

            user = {
                id: '1',
                name: 'John Doe',
                email: 'john@gmail.com',
                role: "admin"
            }

            if(!user) {
                console.log('Credenciais invalidas');

                return null
            }

            return user;
        }
    })],

    callbacks: {
        authorized({ request: { nextUrl }, auth }) {
            const isLoggedIn = !!auth?.user;
            const { pathname } = nextUrl;
            const role = auth?.user.role || 'user';
            if (pathname.startsWith('/auth/signin') && isLoggedIn) {
                return Response.redirect(new URL('/', nextUrl));
            }
            if (pathname.startsWith("/page2") && role !== "admin") {
                return Response.redirect(new URL('/', nextUrl));
            }
            return !!auth;
        },
        jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id as string;
                token.role = user.role as string;
            }
            if (trigger === "update" && session) {
                token = { ...token, ...session };
            }
            return token;
        },
        session({ session, token }) {
            session.user.id = token.id;
            session.user.role = token.role;
            return session;
        }
    },

    pages: {
        signIn: "/"
    }
})