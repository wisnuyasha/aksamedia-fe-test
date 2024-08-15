import { FiSearch } from "react-icons/fi";

import React, { FormEvent } from "react";
import { TTodo } from "../../../types/TTodos";
import clsxm from "../../../utils/clsxm";

interface SearchTableProps {
  todos: TTodo[];
  onSearch: (
    filteredTodos: TTodo[],
    isSearching: boolean,
    resetPage?: boolean
  ) => void;
}

export default function TodosTableSearch({
  todos,
  onSearch,
}: SearchTableProps) {
  const [searchInput, setSearchInput] = React.useState<string>(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("search") || "";
  });

  const [searchQuery, setSearchQuery] = React.useState<string>(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("search") || "";
  });

  React.useEffect(() => {
    if (searchQuery) {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set("search", searchQuery);
      const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
      window.history.replaceState({}, "", newUrl);
      localStorage.setItem("search", searchQuery);

      const filtered = todos.filter((todo) =>
        todo.task.toLowerCase().includes(searchQuery.toLowerCase())
      );
      onSearch(filtered, true, true);
    } else {
      onSearch(todos, false);
    }
  }, [searchQuery, onSearch, todos]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchQuery(searchInput);
  };

  const handleClearFilter = () => {
    const urlParams = new URLSearchParams(window.location.search);

    urlParams.set("search", "");
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.replaceState({}, "", newUrl);

    localStorage.removeItem("search");

    setSearchInput("");
    setSearchQuery("");

    onSearch(todos, false, true);
  };

  return (
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
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
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
  );
}
