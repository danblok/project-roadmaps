import { PropsWithChildren } from 'react'
import Footer from '../components/footer'
import Header from '@/components/header/header'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen grid grid-rows-main-layout">
      <Header />
      <main className="bg-cornflower-blue bg-opacity-20 flex flex-col">
        <div className="max-w-7xl w-full mx-auto my-12 lg:my-18 xl:my-24 max-h-full flex-grow">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}
