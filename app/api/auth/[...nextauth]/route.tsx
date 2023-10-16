import NextAuth, { AuthOptions, User, Session } from "next-auth"
import { JWT } from "next-auth/jwt"
import jwt, { JwtPayload } from 'jsonwebtoken';
import CredentialsProvider from "next-auth/providers/credentials"
import { cookies } from "next/headers"


interface JWTPayload {
    username: string,
    exp: number
}

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            
         async authorize(credentials, req) {
                console.log("AUTHNEXT", req)
                const res = await fetch('http://localhost:8080/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(credentials)
                })
                const data = await res.json()
                if (res.ok && data) {
                    cookies().set('token', data, {
                        httpOnly: true,
                    })
                    return {
                        id: data,
                    }
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
            const payload = jwt.decode(token.name!) as JWTPayload

            session.user = {
                name: payload.username,
            }
            return session;
        },
    }
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }