import { MdEdit } from 'react-icons/md'
import { MdDelete } from 'react-icons/md'
import clsxm from '../../../utils/clsxm'
import { TTodo } from '../../../types/TTodos'

interface TodosTableProps {
  todos: TTodo[]
  onEdit: (todo: TTodo) => void
  onDelete: (todoId: string) => void
  isSearch: boolean
}

export default function TodosTable({
  todos,
  onEdit,
  onDelete,
  isSearch,
}: TodosTableProps) {
  return (
    <div className="mb-1 mt-3 grid w-full grid-cols-12">
      <div className="group col-span-12 grid grid-cols-12">
        <div className="col-span-3 border-b-[1px] border-zinc-300 py-2.5 group-hover:bg-zinc-100 group-hover:duration-300 dark:border-zinc-700 dark:group-hover:bg-zinc-900">
          <p className="px-2 text-lg font-semibold text-zinc-500 dark:text-zinc-400">
            Task
          </p>
        </div>
        <div className="col-span-6 border-b-[1px] border-zinc-300 py-2.5 group-hover:bg-zinc-100 group-hover:duration-300 dark:border-zinc-700 dark:group-hover:bg-zinc-900">
          <p className="px-2 text-lg font-semibold text-zinc-500 dark:text-zinc-400">
            Description
          </p>
        </div>
        <div className="col-span-3 border-b-[1px] border-zinc-300 py-2.5 group-hover:bg-zinc-100 group-hover:duration-300 dark:border-zinc-700 dark:group-hover:bg-zinc-900">
          <p className="px-2 text-lg font-semibold text-zinc-500 dark:text-zinc-400">
            Action
          </p>
        </div>
      </div>

      {todos.length === 0 && !isSearch ? (
        <div className="col-span-12">
          <div
            className={clsxm(
              'col-span-3 flex items-center justify-center py-2.5 hover:bg-zinc-100 hover:duration-300 dark:hover:bg-zinc-900'
            )}
          >
            <p className="px-2 text-lg font-semibold text-zinc-500">
              There's no todos, enjoy your day!
            </p>
          </div>
        </div>
      ) : todos.length === 0 && isSearch ? (
        <div className="col-span-12">
          <div
            className={clsxm(
              'col-span-3 flex items-center justify-center py-2.5 hover:bg-zinc-100 hover:duration-300 dark:hover:bg-zinc-900'
            )}
          >
            <p className="px-2 text-lg font-semibold text-zinc-500">
              Invalid Search
            </p>
          </div>
        </div>
      ) : (
        todos.map((todo, idx) => (
          <div key={idx} className="group col-span-12 grid grid-cols-12">
            <div
              className={clsxm(
                'col-span-3 py-2.5 group-hover:bg-zinc-100 group-hover:duration-300 dark:group-hover:bg-zinc-900',
                todos.length - 1 !== idx &&
                  'border-b-[1px] border-zinc-300 dark:border-zinc-700'
              )}
            >
              <p className="px-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {todo.task}
              </p>
            </div>
            <div
              className={clsxm(
                'col-span-6 py-2.5 group-hover:bg-zinc-100 group-hover:duration-300 dark:group-hover:bg-zinc-900',
                todos.length - 1 !== idx &&
                  'border-b-[1px] border-zinc-300 dark:border-zinc-700'
              )}
            >
              <p className="px-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {todo.desc}
              </p>
            </div>
            <div
              className={clsxm(
                'col-span-3 flex items-center gap-x-3 py-2.5 pl-2 group-hover:bg-zinc-100 group-hover:duration-300 dark:group-hover:bg-zinc-900',
                todos.length - 1 !== idx &&
                  'border-b-[1px] border-zinc-300 dark:border-zinc-700'
              )}
            >
              <div
                onClick={() => onEdit(todo)}
                className="h-fit w-fit cursor-pointer rounded-md border-[1px] border-zinc-300 bg-transparent p-2 hover:bg-zinc-200 dark:border-zinc-700 dark:hover:bg-zinc-700"
              >
                <MdEdit className="size-4 text-zinc-900 dark:text-zinc-100" />
              </div>
              <div
                onClick={() => onDelete(todo.id)}
                className="h-fit w-fit cursor-pointer rounded-md border-[1px] border-zinc-300 bg-transparent p-2 hover:bg-zinc-200 dark:border-zinc-700 dark:hover:bg-zinc-700"
              >
                <MdDelete className="size-4 text-zinc-900 dark:text-zinc-100" />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
