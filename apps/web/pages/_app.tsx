import '@/styles/global.css'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { type AppProps } from 'next/app'
import Layout from './layout'
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useState } from 'react'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{
  session: Session
  dehydratedState: DehydratedState
}>) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}
