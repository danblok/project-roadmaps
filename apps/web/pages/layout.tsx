import { PropsWithChildren } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'

export default function Layout({
  children,
}: PropsWithChildren) {
  return (
    <div className="h-screen grid grid-rows-main-layout">
      <Header />
      <main className="bg-slate-100">{children}</main>
      <Footer />
    </div>
  )
}