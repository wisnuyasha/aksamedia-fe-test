import { FiPlusCircle } from "react-icons/fi";
import { TTodo } from "../../types/TTodo";
import clsxm from "../../utils/clsxm";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

import React, { FormEvent } from "react";
import EditTodos from "./EditTodos";

export default function Todos({
  handleActivePage,
}: {
  handleActivePage: (page: string) => void;
}) {
  //#region  //*=========== Todo States ===========

  const [todos, setTodos] = React.useState<TTodo[]>([]);
  const [filteredTodos, setFilteredTodos] = React.useState<TTodo[]>([]);

  //#region  //*=========== Query String & Search States ===========

  const [search, setSearch] = React.useState<string>(() => {
    const storedSearch = localStorage.getItem("search");
    return storedSearch ? storedSearch : "";
  });
  const [isSearch, setIsSearch] = React.useState<boolean>(false);
  const [currentPage, setCurrentPage] = React.useState<number>(() => {
    const storedPage = localStorage.getItem("currentPage");
    return storedPage ? parseInt(storedPage, 10) : 1;
  });

  //#region  //*=========== Edit User States ===========

  const [isModal, setIsModal] = React.useState<boolean>(false);
  const [todoEdit, setTodoEdit] = React.useState<TTodo | null>(null);

  //#region  //*=========== Get Todos from local storage ===========

  function getTodosFromLocalStorage(): TTodo[] {
    const todosRaw = localStorage.getItem("todos");
    return JSON.parse(todosRaw ?? "[]");
  }

  React.useEffect(() => {
    const storedTodos = getTodosFromLocalStorage();
    setTodos(storedTodos);
    setFilteredTodos(storedTodos);
  }, []);

  //#region  //*=========== Query String Func ===========

  function updateQueryString(page: number, keyword: string) {
    const query = new URLSearchParams();
    query.set("page", page.toString());
    if (keyword) {
      query.set("search", keyword);
    }
    window.history.replaceState(null, "", `?${query.toString()}`);
  }

  React.useEffect(() => {
    updateQueryString(currentPage, search);
  }, [currentPage, search]);

  React.useEffect(() => {
    const storedPage = localStorage.getItem("currentPage");
    const storedSearch = localStorage.getItem("search");

    const page = storedPage ? parseInt(storedPage, 10) : 0;
    const keyword = storedSearch || "";

    setCurrentPage(page);
    setSearch(keyword);

    const filtered = todos.filter((todo) =>
      todo.task.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredTodos(filtered);
  }, [todos]);

  React.useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
    localStorage.setItem("search", search);
    updateQueryString(currentPage, search);
  }, [currentPage, search]);

  //#region  //*=========== Pagination Func ===========

  const todosPerPage: number = 3;
  const total = Math.ceil(filteredTodos.length / todosPerPage);

  const startIdx = (currentPage - 1) * todosPerPage;
  const currentTodos = filteredTodos.slice(startIdx, startIdx + todosPerPage);

  function handlePagination(newPage: number) {
    setCurrentPage(newPage);
  }

  //#region  //*=========== Search Func ===========

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const filtered = todos.filter((todo) =>
      todo.task.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTodos(filtered);

    setIsSearch(true);
    setCurrentPage(1);
  }

  function handleClearFilter() {
    setSearch("");
    setFilteredTodos(todos);
    setIsSearch(false);
  }

  //#region  //*=========== Table Action Func ===========

  function handleDelete(task: string) {
    const updatedTodos = todos.filter((todo) => todo.task !== task);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    /** Case when deleting while search */
    const newFilteredTodos = updatedTodos.filter((todo) =>
      todo.task.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredTodos(newFilteredTodos);
  }

  function handleEdit(todo: TTodo) {
    setTodoEdit(todo);
    setIsModal(true);
  }

  function handleIsModal() {
    setIsModal(!isModal);
    setTodoEdit(null);
  }

  return (
    <>
      <EditTodos
        isModal={isModal}
        handleIsModal={handleIsModal}
        todo={todoEdit}
      />
      <div className="w-full px-8 pb-10 md:pb-0 max-w-5xl md:pt-56">
        <div className="bg-white dark:bg-zinc-950 border-[1px] border-zinc-300 dark:border-zinc-700 rounded-xl drop-shadow">
          <div className="pt-6 px-6">
            <h2 className="font-bold text-zinc-900 dark:text-zinc-100 text-base mb-1 md:text-xl">
              Todo List
            </h2>
            <p className="text-zinc-500 text-sm md:text-base dark:text-zinc-400">
              Keep track of your tasks and manage them efficiently.
            </p>

            <form
              onSubmit={handleSearch}
              className="relative w-fit flex flex-col gap-y-2 sm:flex-row gap-x-4 items-center mt-5 h-fit"
            >
              <input
                name="task"
                className={clsxm(
                  "w-fit max-w-52 md:min-w-64 pr-3 pl-9 py-1.5 rounded-lg border-[1px] shadow-sm dark:text-white text-base dark:bg-transparent dark:border-zinc-700 border-zinc-300 focus:border-[1px] focus:outline-zinc-700 hover:border-zinc-500 hover:duration-500"
                )}
                placeholder="Search.."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                required
              />
              <div className="h-fit flex items-start w-full mb-1 gap-x-2">
                <button
                  type="submit"
                  className="h-[38px] px-3.5 w-full bg-zinc-900 dark:bg-zinc-50 border-[1px] border-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-300 hover:duration-500 rounded-lg"
                >
                  <p className="font-sans font-medium text-xs md:text-sm text-zinc-100 dark:text-zinc-900">
                    Apply
                  </p>
                </button>
                <button
                  onClick={handleClearFilter}
                  className="h-[38px] px-3 w-full bg-transparent dark:bg-transparent border-[1px] border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:duration-500 rounded-lg"
                >
                  <p className="font-sans font-medium text-xs md:text-sm text-zinc-900 dark:text-zinc-100">
                    Cancel
                  </p>
                </button>
              </div>

              <FiSearch className="absolute size-[17px] text-zinc-600 left-2.5 top-2.5" />
            </form>

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

              {filteredTodos.length === 0 && !isSearch ? (
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
              ) : filteredTodos.length === 0 && isSearch ? (
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
                currentTodos.map((todo, idx) => (
                  <div
                    key={idx}
                    className="col-span-12 grid grid-cols-12 group"
                  >
                    <div
                      className={clsxm(
                        "col-span-3 py-2.5 group-hover:bg-zinc-100 dark:group-hover:bg-zinc-900 group-hover:duration-300",
                        currentTodos.length - 1 !== idx &&
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
                        currentTodos.length - 1 !== idx &&
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
                        currentTodos.length - 1 !== idx &&
                          "border-b-[1px] border-zinc-300 dark:border-zinc-700"
                      )}
                    >
                      <div
                        onClick={() => handleEdit(todo)}
                        className="border-[1px] border-zinc-300 dark:border-zinc-700 bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer p-2 h-fit w-fit rounded-md"
                      >
                        <MdEdit className="text-zinc-900 dark:text-zinc-100 size-4" />
                      </div>
                      <div
                        onClick={() => handleDelete(todo.task)}
                        className="border-[1px] border-zinc-300 dark:border-zinc-700 bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer p-2 h-fit w-fit rounded-md"
                      >
                        <MdDelete className="text-zinc-900 dark:text-zinc-100 size-4" />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex w-full justify-end gap-x-1.5 mt-4 px-6 mb-6">
            <div
              onClick={() => {
                if (currentPage - 1 > 0) {
                  setCurrentPage(currentPage - 1);
                }
              }}
              className={clsxm(
                "flex gap-x-3 px-4 py-1.5 duration-300 items-center cursor-pointer rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700",
                currentPage - 1 <= 0 && "cursor-not-allowed"
              )}
            >
              <GrPrevious className="size-3 text-zinc-900 dark:text-zinc-100" />
              <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                Previous
              </span>
            </div>
            {Array.from({ length: total }, (_, idx) => (
              <div
                key={idx}
                onClick={() => handlePagination(idx + 1)}
                className={clsxm(
                  "py-1.5 px-3.5 cursor-pointer duration-300 h-fit rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-700",
                  currentPage === idx + 1 &&
                    "shadow-sm ring-[1px] ring-zinc-300 dark:ring-zinc-700 ring-inset"
                )}
              >
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {idx + 1}
                </span>
              </div>
            ))}

            <div
              onClick={() => {
                if (currentPage + 1 <= total) {
                  setCurrentPage(currentPage + 1);
                }
              }}
              className={clsxm(
                "flex gap-x-3 px-4 py-1.5 duration-300 items-center cursor-pointer rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700",
                currentPage + 1 > total && "cursor-not-allowed"
              )}
            >
              <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                Next
              </span>
              <GrNext className="size-3 text-zinc-900 dark:text-zinc-100" />
            </div>
          </div>
          <div className="seperator w-full bg-zinc-300 dark:bg-zinc-700 h-[1px]" />
          <div className="w-full flex justify-center py-5 items-center">
            <div
              onClick={() => handleActivePage("add")}
              className="px-4 cursor-pointer flex items-center gap-x-2 py-2 rounded-md hover:duration-500 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            >
              <FiPlusCircle className="text-zinc-900 dark:text-zinc-100" />
              <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                Add Todo
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
