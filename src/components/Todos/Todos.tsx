import { FiPlusCircle } from 'react-icons/fi'
import { TTodo } from '../../types/TTodos'

import React from 'react'
import { useActivePageStore } from '../../store/useActivePageStore'
import EditTodosModal from './EditTodosModal'
import { useTodosStore } from '../../store/useTodosStore'
import TodosTablePagination from './Table/TodosTablePagination'
import TodosTableSearch from './Table/TodosTableSearch'
import TodosTable from './Table/TodosTable'

export default function Todos() {
  const { handleActivePage } = useActivePageStore()

  const { todos, deleteTodo } = useTodosStore()
  const [filteredTodos, setFilteredTodos] = React.useState<TTodo[]>(todos)

  const [isSearch, setIsSearch] = React.useState<boolean>(false)
  const [currentPage, setCurrentPage] = React.useState<number>(() => {
    const storedPage = localStorage.getItem('currentPage')
    return storedPage ? parseInt(storedPage, 10) : 1
  })

  const [isModal, setIsModal] = React.useState<boolean>(false)
  const [todoEdit, setTodoEdit] = React.useState<TTodo | null>(null)

  const todosPerPage: number = 3
  const total = Math.ceil(filteredTodos.length / todosPerPage)

  const startIdx = (currentPage - 1) * todosPerPage
  const currentTodos = filteredTodos.slice(startIdx, startIdx + todosPerPage)

  function handlePagination(newPage: number) {
    setCurrentPage(newPage)
  }

  const handleSearch = React.useCallback(
    (filtered: TTodo[], isSearching: boolean, resetPage = false) => {
      setFilteredTodos(filtered)
      setIsSearch(isSearching)
      if (resetPage) {
        setCurrentPage(1)
      }
    },
    []
  )

  function handleEdit(todo: TTodo) {
    setTodoEdit(todo)
    setIsModal(true)
  }

  function handleDelete(id: string) {
    deleteTodo(id)

    const newFilteredTodos = todos.filter((todo: TTodo) => todo.id !== id)
    const newTotalPages = Math.ceil(newFilteredTodos.length / todosPerPage)

    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages > 0 ? newTotalPages : 1)
    }

    setFilteredTodos(newFilteredTodos)
  }

  function handleIsModal() {
    setIsModal(!isModal)
    setTodoEdit(null)
  }

  return (
    <>
      <EditTodosModal
        isModal={isModal}
        handleIsModal={handleIsModal}
        todo={todoEdit}
      />
      <div className="w-full max-w-5xl px-8 pb-10 md:pb-0 md:pt-56">
        <div className="rounded-xl border-[1px] border-zinc-300 bg-white drop-shadow dark:border-zinc-700 dark:bg-zinc-950">
          <div className="mb-4 px-6 pt-6">
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 md:text-xl">
              Todo List
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 md:text-base">
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

          <div className="seperator h-[1px] w-full bg-zinc-300 dark:bg-zinc-700" />
          <div className="flex w-full items-center justify-center py-5">
            <div
              onClick={() => handleActivePage('add')}
              className="flex cursor-pointer items-center gap-x-2 rounded-md px-4 py-2 hover:bg-zinc-200 hover:duration-500 dark:hover:bg-zinc-700"
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
  )
}
