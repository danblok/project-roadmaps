import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized({ token }) {
      return !!token && !!token.email && !!token.name
    },
  },
})

export const config = {
  matcher: [
    '/projects/:path*',
    '/profile',
    '/api/profile/:path*',
    '/api/profiles/:path*',
    '/api/project/:path*',
    '/api/projects/:path*',
  ],
}
