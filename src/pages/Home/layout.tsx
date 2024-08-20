import { useAuthHome } from '../../middleware/useAuth'
import { ReactNode } from 'react'
import ToggleTheme from '../../components/Layouts/ToggleTheme'
import Navbar from '../../components/Layouts/Navbar'

export default function Layout({ children }: { children: ReactNode }) {
  useAuthHome()
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-zinc-100 duration-500 dark:bg-zinc-900">
      <ToggleTheme />
      <Navbar />
      {children}
    </main>
  )
}
