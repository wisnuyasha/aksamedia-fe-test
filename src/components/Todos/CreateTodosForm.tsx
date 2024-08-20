import React, { FormEvent } from 'react'
import clsxm from '../../utils/clsxm'
import { TTodo } from '../../types/TTodos'
import { useTodosStore } from '../../store/useTodosStore'
import { v4 as uuidv4 } from 'uuid'

export default function CreateTodoForm() {
  const [task, setTask] = React.useState<string>('')
  const [desc, setDesc] = React.useState<string>('')
  const { createTodo } = useTodosStore()

  function handleChangeName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (task && desc) {
      const newTodo: TTodo = {
        id: uuidv4(),
        task: task,
        desc: desc,
      }
      createTodo(newTodo)

      setTask('')
      setDesc('')
    }
  }

  return (
    <div className="w-full max-w-5xl px-8 md:pt-56">
      <div className="rounded-xl border-[1px] border-zinc-300 bg-white drop-shadow dark:border-zinc-700 dark:bg-zinc-950">
        <form onSubmit={handleChangeName}>
          <div className="flex flex-col gap-y-6 p-6">
            <div className="flex flex-col gap-x-1.5">
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 md:text-lg">
                Add New Task
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 md:text-base">
                Create a new task and add details
              </p>
            </div>
            <div className="flex flex-col gap-y-1.5">
              <label
                className={clsxm(
                  'font-sans text-sm font-medium text-zinc-600 dark:text-zinc-50'
                )}
                htmlFor="task"
              >
                Task
              </label>
              <input
                name="task"
                className={clsxm(
                  'w-full rounded-lg border-[1px] border-zinc-300 px-3 py-2 text-base shadow-sm hover:border-zinc-500 hover:duration-500 focus:border-[1px] focus:outline-zinc-700 dark:border-zinc-700 dark:bg-transparent dark:text-white'
                )}
                value={task}
                onChange={(e) => setTask(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-y-1.5">
              <label
                className={clsxm(
                  'font-sans text-sm font-medium text-zinc-600 dark:text-zinc-50'
                )}
                htmlFor="desc"
              >
                Description
              </label>
              <textarea
                name="task"
                className={clsxm(
                  'w-full rounded-lg border-[1px] border-zinc-300 px-3 py-2 text-base shadow-sm hover:border-zinc-500 hover:duration-500 focus:border-[1px] focus:outline-zinc-700 dark:border-zinc-700 dark:bg-transparent dark:text-white'
                )}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="seperator h-[1px] w-full bg-zinc-300 dark:bg-zinc-700" />

          <div className="p-6">
            <button
              type="submit"
              className="rounded-md border-[1px] border-zinc-900 bg-zinc-900 px-5 py-2 hover:bg-zinc-700 hover:duration-500 dark:bg-zinc-50 dark:hover:bg-zinc-300 md:py-2"
            >
              <p className="font-sans text-sm font-medium text-zinc-50 dark:text-zinc-900 md:text-base">
                Save
              </p>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
