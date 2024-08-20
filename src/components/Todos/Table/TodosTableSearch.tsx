import { FiSearch } from 'react-icons/fi'

import React, { FormEvent } from 'react'
import { TTodo } from '../../../types/TTodos'
import clsxm from '../../../utils/clsxm'
import { useSearchParams } from 'react-router-dom'

interface SearchTableProps {
  todos: TTodo[]
  onSearch: (
    filteredTodos: TTodo[],
    isSearching: boolean,
    resetPage?: boolean
  ) => void
}

export default function TodosTableSearch({
  todos,
  onSearch,
}: SearchTableProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  const [searchInput, setSearchInput] = React.useState<string>(
    searchParams.get('search') || ''
  )
  const [searchQuery, setSearchQuery] = React.useState<string>(
    searchParams.get('search') || ''
  )

  React.useEffect(() => {
    if (searchQuery) {
      searchParams.set('search', searchQuery)
      setSearchParams(searchParams)

      localStorage.setItem('search', searchQuery)

      const filtered = todos.filter((todo) =>
        todo.task.toLowerCase().includes(searchQuery.toLowerCase())
      )
      onSearch(filtered, true, true)
    } else {
      onSearch(todos, false)
    }
  }, [searchQuery, onSearch, todos, searchParams, setSearchParams])

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSearchQuery(searchInput)
  }

  const handleClearFilter = () => {
    searchParams.delete('search')
    setSearchParams(searchParams)

    localStorage.removeItem('search')

    setSearchInput('')
    setSearchQuery('')

    onSearch(todos, false, true)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="relative mt-5 flex h-fit w-fit flex-col items-center gap-x-4 gap-y-2 sm:flex-row"
    >
      <input
        name="task"
        className={clsxm(
          'w-fit max-w-52 rounded-lg border-[1px] border-zinc-300 py-1.5 pl-9 pr-3 text-base shadow-sm hover:border-zinc-500 hover:duration-500 focus:border-[1px] focus:outline-zinc-700 dark:border-zinc-700 dark:bg-transparent dark:text-white md:min-w-64'
        )}
        placeholder="Search.."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <div className="mb-1 flex h-fit w-full items-start gap-x-2">
        <button
          type="submit"
          className="h-[38px] w-full rounded-lg border-[1px] border-zinc-900 bg-zinc-900 px-3.5 hover:bg-zinc-700 hover:duration-500 dark:bg-zinc-50 dark:hover:bg-zinc-300"
        >
          <p className="font-sans text-xs font-medium text-zinc-100 dark:text-zinc-900 md:text-sm">
            Apply
          </p>
        </button>
        <button
          onClick={handleClearFilter}
          className="h-[38px] w-full rounded-lg border-[1px] border-zinc-300 bg-transparent px-3 hover:bg-zinc-200 hover:duration-500 dark:border-zinc-700 dark:bg-transparent dark:hover:bg-zinc-700"
        >
          <p className="font-sans text-xs font-medium text-zinc-900 dark:text-zinc-100 md:text-sm">
            Cancel
          </p>
        </button>
      </div>

      <FiSearch className="absolute left-2.5 top-2.5 size-[17px] text-zinc-600" />
    </form>
  )
}
