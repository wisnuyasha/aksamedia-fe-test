import React, { FormEvent } from "react";
import clsxm from "../../utils/clsxm";

export default function ProfileSection({
  name,
  onChangeName,
}: {
  name: string;
  onChangeName: (newName: string) => void;
}) {
  const [updatedName, setUpdatedName] = React.useState<string>(name);
  function handleChangeName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onChangeName(updatedName);
  }

  return (
    <div className="w-full px-6 max-w-5xl md:pt-56">
      <div className="bg-white dark:bg-zinc-950 border-[1px] border-zinc-300 dark:border-zinc-700 rounded-xl drop-shadow">
        <form onSubmit={handleChangeName}>
          <div className="p-6 flex flex-col gap-y-6">
            <div className="flex flex-col gap-x-1.5">
              <span className="font-bold text-zinc-900 dark:text-zinc-100 text-lg">
                Edit Name
              </span>
              <span className="text-zinc-500 dark:text-zinc-400">
                Edit your name here
              </span>
            </div>
            <input
              name="name"
              className={clsxm(
                "w-full px-3 py-2 rounded-lg border-[1px] shadow-sm dark:text-white text-base dark:bg-transparent dark:border-zinc-700 border-zinc-300 focus:border-[1px] focus:outline-zinc-700 hover:border-zinc-500 hover:duration-500"
              )}
              onChange={(e) => setUpdatedName(e.target.value)}
              value={updatedName}
              required
            />
          </div>

          <div className="w-full bg-zinc-300 dark:bg-zinc-700 h-[1px]" />

          <div className="p-6">
            <button
              type="submit"
              className="px-5 rounded-md py-2 md:py-2 bg-zinc-900 dark:bg-zinc-50 border-[1px] border-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-300 hover:duration-500"
            >
              <p className="font-sans font-medium text-sm md:text-base text-zinc-50 dark:text-zinc-900">
                Save
              </p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
