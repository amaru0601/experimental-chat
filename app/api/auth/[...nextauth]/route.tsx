import NextAuth, { AuthOptions, User, Session } from "next-auth"
import { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import { cookies } from "next/headers"

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await fetch('http://localhost:8080/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(credentials)
                })
                const data = await res.json()
                if (res.ok && data) {
                    console.log("AUTHNEXT", data)
                    cookies().set('token', data, {
                        httpOnly: true,
                    })
                    var user = { id: data }
                    return user
                }
                return null
            },
        })
    ],
    pages: {
        signIn: '/login'
    },
    session: {
        strategy: 'jwt',
        maxAge: 24*60*60,
    },
    jwt: {
        maxAge: 24*60*60,
    },
    callbacks: {
        jwt: async ({ token, user }: { token: JWT; user?: User }) => {
            user && (token.name = user.id);
            return token;
        },
        session: async ({ session, token }: { session: Session; token: JWT }) => {
            session.user = {
                name: token.name,
            }
            return session;
        },
    }
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }