import { ReactNode } from 'react'
import ToggleTheme from '../../components/Layouts/ToggleTheme'
import { useAuthLogin } from '../../middleware/useAuth'

export default function Layout({ children }: { children: ReactNode }) {
  useAuthLogin()

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-zinc-50 duration-500 dark:bg-zinc-900">
      <ToggleTheme />
      {children}
    </main>
  )
}
