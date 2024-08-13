import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <section className="h-full min-h-screen flex flex-col justify-center items-center w-full">
      <div className="h-fit flex flex-col gap-y-4 p-6 md:p-10 rounded-xl lg:min-w-96 border-[1px] border-zinc-300 dark:border-zinc-700 shadow-sm bg-white dark:bg-zinc-950">
        <div className="flex flex-col gap-y-1.5 md:gap-y-2">
          <h1 className="font-sans mb-1 font-bold text-3xl md:text-4xl text-zinc-900 dark:text-zinc-50">
            Login
          </h1>
          <h3 className="font-sans text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
            Please enter your name and password to log in.
          </h3>
        </div>
        <LoginForm />
      </div>
    </section>
  );
}
