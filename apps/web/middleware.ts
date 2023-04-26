import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      return !!token && !!token.email && !!token.name
    },
  },
})

export const config = { matcher: ['/projects/:path*', '/profile'] }  