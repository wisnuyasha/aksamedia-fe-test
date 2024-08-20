import { FiPlusCircle } from "react-icons/fi";
import { TTodo } from "../../types/TTodos";

import React from "react";
import { useActivePageStore } from "../../store/useActivePageStore";
import EditTodosModal from "./EditTodosModal";
import { useTodosStore } from "../../store/useTodosStore";
import TodosTablePagination from "./Table/TodosTablePagination";
import TodosTableSearch from "./Table/TodosTableSearch";
import TodosTable from "./Table/TodosTable";

export default function Todos() {
  const { handleActivePage } = useActivePageStore();

  const { todos, deleteTodo } = useTodosStore();
  const [filteredTodos, setFilteredTodos] = React.useState<TTodo[]>(todos);

  const [isSearch, setIsSearch] = React.useState<boolean>(false);
  const [currentPage, setCurrentPage] = React.useState<number>(() => {
    const storedPage = localStorage.getItem("currentPage");
    return storedPage ? parseInt(storedPage, 10) : 1;
  });

  const [isModal, setIsModal] = React.useState<boolean>(false);
  const [todoEdit, setTodoEdit] = React.useState<TTodo | null>(null);

  const todosPerPage: number = 3;
  const total = Math.ceil(filteredTodos.length / todosPerPage);

  const startIdx = (currentPage - 1) * todosPerPage;
  const currentTodos = filteredTodos.slice(startIdx, startIdx + todosPerPage);

  function handlePagination(newPage: number) {
    setCurrentPage(newPage);
  }

  const handleSearch = React.useCallback(
    (filtered: TTodo[], isSearching: boolean, resetPage = false) => {
      setFilteredTodos(filtered);
      setIsSearch(isSearching);
      if (resetPage) {
        setCurrentPage(1);
      }
    },
    []
  );

  function handleEdit(todo: TTodo) {
    setTodoEdit(todo);
    setIsModal(true);
  }

  function handleDelete(id: string) {
    deleteTodo(id);

    const newFilteredTodos = todos.filter((todo: TTodo) => todo.id !== id);
    const newTotalPages = Math.ceil(newFilteredTodos.length / todosPerPage);

    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages > 0 ? newTotalPages : 1);
    }

    setFilteredTodos(newFilteredTodos);
  }

  function handleIsModal() {
    setIsModal(!isModal);
    setTodoEdit(null);
  }

  return (
    <>
      <EditTodosModal
        isModal={isModal}
        handleIsModal={handleIsModal}
        todo={todoEdit}
      />
      <div className="w-full px-8 pb-10 md:pb-0 max-w-5xl md:pt-56">
        <div className="bg-white dark:bg-zinc-950 border-[1px] border-zinc-300 dark:border-zinc-700 rounded-xl drop-shadow">
          <div className="pt-6 px-6 mb-4">
            <h2 className="font-bold text-zinc-900 dark:text-zinc-100 text-base md:text-xl">
              Todo List
            </h2>
            <p className="text-zinc-500 text-sm md:text-base dark:text-zinc-400">
              Keep track of your tasks and manage them efficiently.
            </p>
            <TodosTableSearch todos={todos} onSearch={handleSearch} />
            <TodosTable
              todos={currentTodos}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isSearch={isSearch}
            />
          </div>
          {total > 0 && (
            <TodosTablePagination
              currentPage={currentPage}
              totalPages={total}
              onPageChange={handlePagination}
            />
          )}

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
