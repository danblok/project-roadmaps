import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from 'database'

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  theme: {
    colorScheme: 'light',
  },
  callbacks: {
    async jwt({ token }) {
      const newUser = await prisma.account.upsert({
        where: {
          email: token.email,
        },
        create: {
          email: token.email,
          name: token.name,
          avatar: token.picture,
        },
        update: {
          avatar: token.picture,
        },
      })
      token.accountId = newUser.id
      return token
    },
    session({ session, token }) {
      session.accountId = token.accountId
      return session
    },
  },
}

export default NextAuth(authOptions)
