import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'

export const Layout = () => (
  <div className='flex min-h-screen flex-col items-center justify-center'>
    <Header />
    <main className='flex flex-grow items-center justify-center'>
      <Outlet />
    </main>
    <Footer />
  </div>
)
