import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Users } from "../../constants/Users";
import ToggleTheme from "../../components/Layouts/ToggleTheme";
import clsxm from "../../utils/clsxm";
import { useUserStore } from "../../store/useUserStore";
import { useAuthLogin } from "../../middleware/useAuth";

export default function App() {
  const { mutateName } = useUserStore();
  const [errors, setErrors] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const navigate = useNavigate();

  useAuthLogin();

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (name === Users.name && password === Users.password) {
      setErrors("");
      mutateName(name);
      navigate("/");
    } else {
      setErrors("Wrong name or password");
    }
  }

  return (
    <main className="flex min-h-screen duration-500 w-full flex-col items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-900">
      <ToggleTheme />
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
          <form onSubmit={handleLogin} className="flex flex-col gap-y-3">
            <div className="flex flex-col gap-y-1.5">
              <label
                className={clsxm(
                  "font-sans font-medium text-xs md:text-sm",
                  errors.length > 0
                    ? "text-red-400"
                    : "text-zinc-600 dark:text-zinc-50"
                )}
                htmlFor="name"
              >
                Name
              </label>
              <input
                name="name"
                className={clsxm(
                  "w-full px-3 py-2.5 rounded-lg border-[1px] dark:text-white text-sm dark:bg-transparent dark:border-zinc-700 focus:border-[1px] focus:outline-zinc-700 hover:border-zinc-500 hover:duration-500",
                  errors.length > 0
                    ? "border-red-400 dark:border-red-400"
                    : "border-zinc-300"
                )}
                onChange={(e) => setName(e.target.value)}
                placeholder="agus"
                required
              />
            </div>
            <div className="flex flex-col gap-y-1.5">
              <label
                className={clsxm(
                  "font-sans font-medium text-xs md:text-sm",
                  errors.length > 0
                    ? "text-red-400"
                    : "text-zinc-600 dark:text-zinc-50"
                )}
                htmlFor="password"
              >
                Password
              </label>
              <div>
                <input
                  name="password"
                  type="password"
                  className={clsxm(
                    "w-full px-3 py-2.5 rounded-lg border-[1px] border-zinc-300 dark:text-white text-sm dark:bg-transparent dark:border-zinc-700 focus:border-[1px] focus:outline-zinc-700 hover:border-zinc-500 hover:duration-500",
                    errors.length > 0
                      ? "border-red-400 dark:border-red-400"
                      : "border-zinc-300"
                  )}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="aguslaparbuk"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="py-2 md:py-2.5 mt-3 w-full bg-zinc-900 dark:bg-zinc-50 border-[1px] border-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-300 hover:duration-500 rounded-lg"
            >
              <p className="font-sans font-medium text-xs md:text-sm text-zinc-50 dark:text-zinc-900">
                Login
              </p>
            </button>
            {errors.length > 0 && (
              <p className="text-red-400 text-sm font-medium">{errors}</p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
