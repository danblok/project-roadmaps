import NextAuth, { DefaultSession, User } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"
import 'next-auth/jwt'

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    userId: string,
    name: string
    email: string
  }
}

declare module 'next-auth' {
  interface Session extends DefaultSession {
    userId: string,
    user: DefaultSession['user'] & {
      name: string
      email: string
    }
  }
}