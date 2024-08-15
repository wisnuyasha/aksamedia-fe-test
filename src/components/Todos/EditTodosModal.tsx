import React, { FormEvent } from "react";
import { IoCloseOutline } from "react-icons/io5";
import clsxm from "../../utils/clsxm";
import { TTodo } from "../../types/TTodos";
import { useTodosStore } from "../../store/useTodosStore";

export default function EditTodosModal({
  todo,
  isModal,
  handleIsModal,
}: {
  todo: TTodo | null;
  isModal: boolean;
  handleIsModal: () => void;
}) {
  const { todos, mutateTodos } = useTodosStore();

  const [updatedTask, setUpdatedTask] = React.useState<string>(
    todo?.task ?? ""
  );
  const [updatedDesc, setUpdatedDesc] = React.useState<string>(
    todo?.desc ?? ""
  );

  React.useEffect(() => {
    setUpdatedTask(todo?.task ?? "");
    setUpdatedDesc(todo?.desc ?? "");
  }, [todo]);

  function handleEdit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      (updatedTask !== todo?.task || updatedDesc !== todo?.desc) &&
      updatedTask &&
      updatedDesc
    ) {
      const updatedTodo: TTodo = {
        id: todo?.id ?? "",
        task: updatedTask,
        desc: updatedDesc,
      };
      const updatedTodos = todos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      );
      mutateTodos(updatedTodos);
      handleIsModal();
    }
  }

  return (
    <div
      onClick={() => {
        handleIsModal();
      }}
      className={clsxm(
        "absolute z-50 w-full h-full bg-zinc-900/80 flex justify-center items-center",
        !isModal && "hidden"
      )}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="absolute w-fit h-fit size-40 p-6 bg-zinc-50 dark:bg-zinc-950 border-zinc-300 dark:border-zinc-700 border-[1px] rounded-lg"
      >
        <IoCloseOutline
          onClick={handleIsModal}
          className="absolute right-5 bursor cursor-pointer top-5 text-zinc-900 dark:text-zinc-500 size-5"
        />
        <form onSubmit={handleEdit} className="">
          <div className="flex flex-col gap-x-1.5">
            <h2 className="font-bold text-zinc-900 dark:text-zinc-100 text-base md:text-lg">
              Edit Todo
            </h2>
            <p className="text-zinc-500 text-sm md:text-base max-w-96 dark:text-zinc-400">
              Make changes to your todo here. Click save when you're done.
            </p>
          </div>
          <div className="mb-10 mt-8 w-full gap-y-5 flex flex-col items-end">
            <div className="flex items-center gap-x-5">
              <label
                className={clsxm(
                  "font-sans font-medium text-base dark:text-zinc-50 text-zinc-700"
                )}
                htmlFor="updatedTask"
              >
                Task
              </label>
              <input
                name="updatedTask"
                className={clsxm(
                  "w-fit md:min-w-[20rem] px-3 py-2 rounded-lg border-[1px] shadow-sm dark:text-white text-base dark:bg-transparent dark:border-zinc-700 border-zinc-300 focus:border-[1px] focus:outline-zinc-700 hover:border-zinc-500 hover:duration-500"
                )}
                value={updatedTask}
                onChange={(e) => setUpdatedTask(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center gap-x-5">
              <label
                className={clsxm(
                  "font-sans font-medium text-base dark:text-zinc-50 text-zinc-700"
                )}
                htmlFor="updatedDesc"
              >
                Description
              </label>
              <textarea
                name="updatedDesc"
                className={clsxm(
                  "w-fit md:min-w-[20rem] px-3 py-2 rounded-lg border-[1px] shadow-sm dark:text-white text-base dark:bg-transparent dark:border-zinc-700 border-zinc-300 focus:border-[1px] focus:outline-zinc-700 hover:border-zinc-500 hover:duration-500"
                )}
                value={updatedDesc}
                onChange={(e) => setUpdatedDesc(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="w-full flex justify-end">
            <button
              type="submit"
              className="px-5 rounded-md py-2 md:py-2 bg-zinc-900 dark:bg-zinc-50 border-[1px] border-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-300 hover:duration-500"
            >
              <p className="font-sans font-medium text-sm md:text-base text-zinc-50 dark:text-zinc-900">
                Save Changes
              </p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
