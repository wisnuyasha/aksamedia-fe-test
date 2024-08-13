import clsxm from "../../utils/clsxm";

export default function Sidebar({
  activePage,
  handleActivePage,
}: {
  activePage: string;
  handleActivePage: (page: string) => void;
}) {
  return (
    <div className="md:h-screen px-10 pt-28 pb-11 md:px-16 md:py-28 w-full md:w-1/4 flex flex-col justify-start items-start">
      <div className="flex flex-col ">
        <h1 className="font-bold text-4xl text-zinc-900 dark:text-zinc-100 mb-9">
          Todo List
        </h1>
        <div className="flex flex-col gap-y-3">
          <span
            className={clsxm(
              "text-lg cursor-pointer",
              activePage === "todos"
                ? "text-zinc-800 dark:text-zinc-100 font-bold"
                : "text-zinc-600 dark:text-zinc-400"
            )}
            onClick={() => handleActivePage("todos")}
          >
            Todos
          </span>
          <span
            className={clsxm(
              "text-lg cursor-pointer",
              activePage === "add"
                ? "text-zinc-800 dark:text-zinc-100 font-bold"
                : "text-zinc-600 dark:text-zinc-400"
            )}
            onClick={() => handleActivePage("add")}
          >
            Add
          </span>
          <span
            className={clsxm(
              "text-zinc-600 text-lg cursor-pointer",
              activePage === "profile"
                ? "text-zinc-800 dark:text-zinc-100 font-bold"
                : "text-zinc-600 dark:text-zinc-400"
            )}
            onClick={() => handleActivePage("profile")}
          >
            Profile
          </span>
        </div>
      </div>
    </div>
  );
}
