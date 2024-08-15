import React, { FormEvent } from "react";
import clsxm from "../../utils/clsxm";
import useLogin from "../../hooks/Login/useLogin";

export default function LoginForm() {
  const [errors, setErrors] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const { handleLogin } = useLogin();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    handleLogin({ name, password, setErrors });
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-y-3">
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
  );
}
