import NextAuth, { DefaultSession, User } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"
import 'next-auth/jwt'

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    accountId: string,
    name: string
    email: string
  }
}

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accountId: string,
    user: DefaultSession['user'] & {
      name: string
      email: string
    }
  }
}