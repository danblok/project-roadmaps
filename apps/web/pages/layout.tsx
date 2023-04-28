import { PropsWithChildren } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'

export default function Layout({
  children,
}: PropsWithChildren) {
  return (
    <div className="h-screen grid grid-rows-main-layout">
      <Header />
      <main className="bg-cornflower-blue bg-opacity-20">
        <div className="max-w-7xl w-7xl mx-auto">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}
