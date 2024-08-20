import { GrPrevious } from 'react-icons/gr'
import { GrNext } from 'react-icons/gr'
import clsxm from '../../../utils/clsxm'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (newPage: number) => void
}

export default function TodosTablePagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  React.useEffect(() => {
    searchParams.set('page', currentPage.toString())
    setSearchParams(searchParams)

    localStorage.setItem('currentPage', currentPage.toString())
  }, [currentPage, searchParams, setSearchParams])

  const handlePrevious = () => {
    if (currentPage - 1 > 0) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage + 1 <= totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <div className="mb-6 flex w-full justify-end gap-x-1.5 px-6">
      <div
        onClick={handlePrevious}
        className={clsxm(
          'flex cursor-pointer items-center gap-x-3 rounded-lg px-4 py-1.5 duration-300 hover:bg-zinc-100 dark:hover:bg-zinc-700',
          currentPage === 1 && 'cursor-not-allowed'
        )}
      >
        <GrPrevious className="size-3 text-zinc-900 dark:text-zinc-100" />
        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Previous
        </span>
      </div>
      {Array.from({ length: totalPages }, (_, idx) => (
        <div
          key={idx}
          onClick={() => onPageChange(idx + 1)}
          className={clsxm(
            'h-fit cursor-pointer rounded-md px-3.5 py-1.5 duration-300 hover:bg-zinc-100 dark:hover:bg-zinc-700',
            currentPage === idx + 1 &&
              'shadow-sm ring-[1px] ring-inset ring-zinc-300 dark:ring-zinc-700'
          )}
        >
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
            {idx + 1}
          </span>
        </div>
      ))}

      <div
        onClick={handleNext}
        className={clsxm(
          'flex cursor-pointer items-center gap-x-3 rounded-lg px-4 py-1.5 duration-300 hover:bg-zinc-100 dark:hover:bg-zinc-700',
          currentPage === totalPages && 'cursor-not-allowed'
        )}
      >
        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Next
        </span>
        <GrNext className="size-3 text-zinc-900 dark:text-zinc-100" />
      </div>
    </div>
  )
}
