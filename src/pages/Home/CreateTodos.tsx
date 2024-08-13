import React, { FormEvent } from "react";
import clsxm from "../../utils/clsxm";
import { TTodo } from "../../types/TTodo";
import { uniqueId } from "lodash";

export default function CreateTodo() {
  const [task, setTask] = React.useState<string>("");
  const [desc, setDesc] = React.useState<string>("");

  const [todos, setTodos] = React.useState<TTodo[]>(
    JSON.parse(localStorage.getItem("todos") || "[]")
  );

  function handleChangeName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (task && desc) {
      const newTodo: TTodo = {
        id: uniqueId(),
        task: task,
        desc: desc,
      };

      const createTodo = [...todos, newTodo];
      setTodos(createTodo);
      localStorage.setItem("todos", JSON.stringify(createTodo));

      setTask("");
      setDesc("");
    }
  }

  return (
    <div className="w-full px-8 max-w-5xl md:pt-56">
      <div className="bg-white dark:bg-zinc-950 border-[1px] border-zinc-300 dark:border-zinc-700 rounded-xl drop-shadow">
        <form onSubmit={handleChangeName}>
          <div className="p-6 flex flex-col gap-y-6">
            <div className="flex flex-col gap-x-1.5">
              <h2 className="font-bold text-zinc-900 dark:text-zinc-100 text-base md:text-lg">
                Add New Task
              </h2>
              <p className="text-zinc-500 text-sm md:text-base dark:text-zinc-400">
                Create a new task and add details
              </p>
            </div>
            <div className="flex flex-col gap-y-1.5">
              <label
                className={clsxm(
                  "font-sans font-medium text-sm dark:text-zinc-50 text-zinc-600"
                )}
                htmlFor="task"
              >
                Task
              </label>
              <input
                name="task"
                className={clsxm(
                  "w-full px-3 py-2 rounded-lg border-[1px] shadow-sm dark:text-white text-base dark:bg-transparent dark:border-zinc-700 border-zinc-300 focus:border-[1px] focus:outline-zinc-700 hover:border-zinc-500 hover:duration-500"
                )}
                value={task}
                onChange={(e) => setTask(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-y-1.5">
              <label
                className={clsxm(
                  "font-sans font-medium text-sm dark:text-zinc-50 text-zinc-600"
                )}
                htmlFor="desc"
              >
                Description
              </label>
              <textarea
                name="task"
                className={clsxm(
                  "w-full px-3 py-2 rounded-lg border-[1px] shadow-sm dark:text-white text-base dark:bg-transparent dark:border-zinc-700 border-zinc-300 focus:border-[1px] focus:outline-zinc-700 hover:border-zinc-500 hover:duration-500"
                )}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="seperator w-full bg-zinc-300 dark:bg-zinc-700 h-[1px]" />

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
