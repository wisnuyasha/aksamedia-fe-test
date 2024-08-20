import LoginForm from './LoginForm'

export default function LoginPage() {
  return (
    <section className="flex h-full min-h-screen w-full flex-col items-center justify-center">
      <div className="flex h-fit flex-col gap-y-4 rounded-xl border-[1px] border-zinc-300 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 md:p-10 lg:min-w-96">
        <div className="flex flex-col gap-y-1.5 md:gap-y-2">
          <h1 className="mb-1 font-sans text-3xl font-bold text-zinc-900 dark:text-zinc-50 md:text-4xl">
            Login
          </h1>
          <h3 className="font-sans text-xs text-zinc-500 dark:text-zinc-400 md:text-sm">
            Please enter your name and password to log in.
          </h3>
        </div>
        <LoginForm />
      </div>
    </section>
  )
}
