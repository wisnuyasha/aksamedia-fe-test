import { FiPlusCircle } from "react-icons/fi";
import { TTodo } from "../../types/TTodo";
import clsxm from "../../utils/clsxm";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default function Todos({
  handleActivePage,
}: {
  handleActivePage: (page: string) => void;
}) {
  const todosRaw = localStorage.getItem("todos");
  let todos: TTodo[] = [];
  todos = JSON.parse(todosRaw ?? "[]");

  function handleDelete(task: string) {
    console.log(task);
    todos = todos.filter((todo) => todo.task !== task);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  console.log(todos);
  return (
    <div className="w-full px-8 max-w-5xl md:pt-56">
      <div className="bg-white dark:bg-zinc-950 border-[1px] border-zinc-300 dark:border-zinc-700 dark:border-zinc-700 rounded-xl drop-shadow">
        <div className="p-6">
          <h2 className="font-bold text-zinc-900 dark:text-zinc-100 text-base md:text-lg">
            Todo List
          </h2>
          <p className="text-zinc-500 text-sm md:text-base dark:text-zinc-400">
            Keep track of your tasks and manage them efficiently.
          </p>
          <div className="w-full grid grid-cols-12 mt-5 mb-1">
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

            {todos.length === 0 ? (
              <div className="col-span-12">
                <div
                  className={clsxm(
                    "col-span-3 py-2.5 hover:bg-zinc-100 hover:duration-300 flex items-center justify-center"
                  )}
                >
                  <p className="text-zinc-500 text-lg font-semibold px-2">
                    There's no todos, enjoy your day!
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
                    <div className="border-[1px] border-zinc-300 dark:border-zinc-700 bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer p-2 h-fit w-fit rounded-md">
                      <MdEdit className="text-zinc-900 dark:text-zinc-100 size-4" />
                    </div>
                    <div className="border-[1px] border-zinc-300 dark:border-zinc-700 bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer p-2 h-fit w-fit rounded-md">
                      <MdDelete
                        onClick={() => handleDelete(todo.task)}
                        className="text-zinc-900 dark:text-zinc-100 size-4"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="seperator w-full bg-zinc-300 dark:bg-zinc-700 h-[1px]" />
        <div className="w-full flex justify-center py-5 items-center">
          <div className="px-4 cursor-pointer flex items-center gap-x-2 py-2 rounded-md hover:duration-500 hover:bg-zinc-200 dark:hover:bg-zinc-700">
            <FiPlusCircle className="text-zinc-900 dark:text-zinc-100" />
            <p
              onClick={() => handleActivePage("add")}
              className="font-semibold text-zinc-900 dark:text-zinc-100"
            >
              Add Todo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
