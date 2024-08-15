import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import clsxm from "../../../utils/clsxm";
import { TTodo } from "../../../types/TTodos";

interface TodosTableProps {
  todos: TTodo[];
  onEdit: (todo: TTodo) => void;
  onDelete: (todoId: string) => void;
  isSearch: boolean;
}

export default function TodosTable({
  todos,
  onEdit,
  onDelete,
  isSearch,
}: TodosTableProps) {
  return (
    <div className="w-full grid grid-cols-12 mt-3 mb-1">
      <div className="col-span-12 grid grid-cols-12 group">
        <div className="col-span-3 py-2.5 group-hover:bg-zinc-100 dark:group-hover:bg-zinc-900 group-hover:duration-300 border-b-[1px] border-zinc-300 dark:border-zinc-700">
          <p className="text-zinc-500 dark:text-zinc-400 text-lg font-semibold px-2">
            Task
          </p>
        </div>
        <div className="col-span-6 py-2.5 group-hover:bg-zinc-100 dark:group-hover:bg-zinc-900 group-hover:duration-300  border-b-[1px] border-zinc-300 dark:border-zinc-700">
          <p className="text-zinc-500 dark:text-zinc-400 text-lg font-semibold px-2">
            Description
          </p>
        </div>
        <div className="col-span-3 py-2.5 group-hover:bg-zinc-100 dark:group-hover:bg-zinc-900 group-hover:duration-300  border-b-[1px] border-zinc-300 dark:border-zinc-700">
          <p className="text-zinc-500 dark:text-zinc-400 text-lg font-semibold px-2">
            Action
          </p>
        </div>
      </div>

      {todos.length === 0 && !isSearch ? (
        <div className="col-span-12">
          <div
            className={clsxm(
              "col-span-3 py-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:duration-300 flex items-center justify-center"
            )}
          >
            <p className="text-zinc-500 text-lg font-semibold px-2">
              There's no todos, enjoy your day!
            </p>
          </div>
        </div>
      ) : todos.length === 0 && isSearch ? (
        <div className="col-span-12">
          <div
            className={clsxm(
              "col-span-3 py-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:duration-300 flex items-center justify-center"
            )}
          >
            <p className="text-zinc-500 text-lg font-semibold px-2">
              Invalid Search
            </p>
          </div>
        </div>
      ) : (
        todos.map((todo, idx) => (
          <div key={idx} className="col-span-12 grid grid-cols-12 group">
            <div
              className={clsxm(
                "col-span-3 py-2.5 group-hover:bg-zinc-100 dark:group-hover:bg-zinc-900 group-hover:duration-300",
                todos.length - 1 !== idx &&
                  "border-b-[1px] border-zinc-300 dark:border-zinc-700"
              )}
            >
              <p className="text-zinc-900 dark:text-zinc-100 text-base font-semibold px-2">
                {todo.task}
              </p>
            </div>
            <div
              className={clsxm(
                "col-span-6 py-2.5 group-hover:bg-zinc-100 dark:group-hover:bg-zinc-900 group-hover:duration-300",
                todos.length - 1 !== idx &&
                  "border-b-[1px] border-zinc-300 dark:border-zinc-700"
              )}
            >
              <p className="text-zinc-900 dark:text-zinc-100 text-sm font-semibold px-2">
                {todo.desc}
              </p>
            </div>
            <div
              className={clsxm(
                "col-span-3 py-2.5 group-hover:bg-zinc-100 dark:group-hover:bg-zinc-900 flex items-center pl-2 gap-x-3 group-hover:duration-300",
                todos.length - 1 !== idx &&
                  "border-b-[1px] border-zinc-300 dark:border-zinc-700"
              )}
            >
              <div
                onClick={() => onEdit(todo)}
                className="border-[1px] border-zinc-300 dark:border-zinc-700 bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer p-2 h-fit w-fit rounded-md"
              >
                <MdEdit className="text-zinc-900 dark:text-zinc-100 size-4" />
              </div>
              <div
                onClick={() => onDelete(todo.id)}
                className="border-[1px] border-zinc-300 dark:border-zinc-700 bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer p-2 h-fit w-fit rounded-md"
              >
                <MdDelete className="text-zinc-900 dark:text-zinc-100 size-4" />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
