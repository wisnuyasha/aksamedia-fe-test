import { SidebarMenus } from '../../constants/SidebarMenus'
import { useActivePageStore } from '../../store/useActivePageStore'
import { capitalize } from '../../utils/capitalize'
import clsxm from '../../utils/clsxm'
import useSidebar from '../../hooks/Home/useSidebar'

export default function Sidebar() {
  const { activePage, handleActivePage } = useActivePageStore()

  const { useSidebarKey } = useSidebar()
  useSidebarKey()

  return (
    <div className="flex w-full flex-col items-start justify-start px-10 pb-11 pt-28 md:h-screen md:w-1/4 md:px-16 md:py-28">
      <div className="flex flex-col">
        <h1 className="mb-9 text-4xl font-bold text-zinc-900 dark:text-zinc-100">
          Todo List
        </h1>
        <div className="flex flex-col gap-y-3">
          {SidebarMenus.map((_, idx) => (
            <span
              key={idx}
              className={clsxm(
                'cursor-pointer text-lg',
                activePage === SidebarMenus[idx]
                  ? 'font-bold text-zinc-800 dark:text-zinc-100'
                  : 'text-zinc-600 dark:text-zinc-400'
              )}
              onClick={() => handleActivePage(SidebarMenus[idx])}
            >
              {capitalize(SidebarMenus[idx])}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
