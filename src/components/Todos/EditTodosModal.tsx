import React, { FormEvent } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import clsxm from '../../utils/clsxm'
import { TTodo } from '../../types/TTodos'
import { useTodosStore } from '../../store/useTodosStore'

export default function EditTodosModal({
  todo,
  isModal,
  handleIsModal,
}: {
  todo: TTodo | null
  isModal: boolean
  handleIsModal: () => void
}) {
  const { todos, mutateTodos } = useTodosStore()

  const [updatedTask, setUpdatedTask] = React.useState<string>(todo?.task ?? '')
  const [updatedDesc, setUpdatedDesc] = React.useState<string>(todo?.desc ?? '')

  React.useEffect(() => {
    setUpdatedTask(todo?.task ?? '')
    setUpdatedDesc(todo?.desc ?? '')
  }, [todo])

  function handleEdit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (
      (updatedTask !== todo?.task || updatedDesc !== todo?.desc) &&
      updatedTask &&
      updatedDesc
    ) {
      const updatedTodo: TTodo = {
        id: todo?.id ?? '',
        task: updatedTask,
        desc: updatedDesc,
      }
      const updatedTodos = todos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      )
      mutateTodos(updatedTodos)
      handleIsModal()
    }
  }

  return (
    <div
      onClick={() => {
        handleIsModal()
      }}
      className={clsxm(
        'absolute z-50 flex h-full w-full items-center justify-center bg-zinc-900/80',
        !isModal && 'hidden'
      )}
    >
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
        className="absolute size-40 h-fit w-fit rounded-lg border-[1px] border-zinc-300 bg-zinc-50 p-6 dark:border-zinc-700 dark:bg-zinc-950"
      >
        <IoCloseOutline
          onClick={handleIsModal}
          className="bursor absolute right-5 top-5 size-5 cursor-pointer text-zinc-900 dark:text-zinc-500"
        />
        <form onSubmit={handleEdit} className="">
          <div className="flex flex-col gap-x-1.5">
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 md:text-lg">
              Edit Todo
            </h2>
            <p className="max-w-96 text-sm text-zinc-500 dark:text-zinc-400 md:text-base">
              Make changes to your todo here. Click save when you're done.
            </p>
          </div>
          <div className="mb-10 mt-8 flex w-full flex-col items-end gap-y-5">
            <div className="flex items-center gap-x-5">
              <label
                className={clsxm(
                  'font-sans text-base font-medium text-zinc-700 dark:text-zinc-50'
                )}
                htmlFor="updatedTask"
              >
                Task
              </label>
              <input
                name="updatedTask"
                className={clsxm(
                  'w-fit rounded-lg border-[1px] border-zinc-300 px-3 py-2 text-base shadow-sm hover:border-zinc-500 hover:duration-500 focus:border-[1px] focus:outline-zinc-700 dark:border-zinc-700 dark:bg-transparent dark:text-white md:min-w-[20rem]'
                )}
                value={updatedTask}
                onChange={(e) => setUpdatedTask(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center gap-x-5">
              <label
                className={clsxm(
                  'font-sans text-base font-medium text-zinc-700 dark:text-zinc-50'
                )}
                htmlFor="updatedDesc"
              >
                Description
              </label>
              <textarea
                name="updatedDesc"
                className={clsxm(
                  'w-fit rounded-lg border-[1px] border-zinc-300 px-3 py-2 text-base shadow-sm hover:border-zinc-500 hover:duration-500 focus:border-[1px] focus:outline-zinc-700 dark:border-zinc-700 dark:bg-transparent dark:text-white md:min-w-[20rem]'
                )}
                value={updatedDesc}
                onChange={(e) => setUpdatedDesc(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex w-full justify-end">
            <button
              type="submit"
              className="rounded-md border-[1px] border-zinc-900 bg-zinc-900 px-5 py-2 hover:bg-zinc-700 hover:duration-500 dark:bg-zinc-50 dark:hover:bg-zinc-300 md:py-2"
            >
              <p className="font-sans text-sm font-medium text-zinc-50 dark:text-zinc-900 md:text-base">
                Save Changes
              </p>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
