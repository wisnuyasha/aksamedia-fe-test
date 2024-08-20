import { MdLogout } from 'react-icons/md'
import { useUserStore } from '../../store/useUserStore'
import { useNavbar } from '../../hooks/Layouts/useNavbar'

export default function Navbar() {
  const { userName } = useUserStore()
  const { isOpen, handleLogout, toggleDropdownOpen, toggleDropdownClose } =
    useNavbar()

  return (
    <nav className="absolute top-5 rounded-lg border-[1px] border-zinc-300 bg-white px-6 py-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 md:right-10 md:top-5">
      <main className="relative flex items-center justify-center gap-x-5">
        <p className="w-fit cursor-crosshair text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {userName}
        </p>
        <div className="min-h-5 w-[1px] rounded-sm bg-zinc-300 dark:bg-zinc-700" />
        <MdLogout
          onClick={toggleDropdownOpen}
          className="size-5 cursor-pointer text-zinc-900 transition-all hover:scale-125 hover:duration-500 hover:ease-in-out dark:text-zinc-100 dark:hover:text-zinc-300"
        />
        {isOpen && (
          <div className="absolute -bottom-36 -right-6">
            <div className="items-startjustify-center relative flex h-full w-40 flex-col gap-y-1.5 rounded-lg border-[1px] border-zinc-300 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
              <span className="px-3.5 py-2 font-bold text-zinc-900 dark:text-zinc-100">
                Logout ?
              </span>
              <div className="h-[1px] w-full bg-zinc-300 dark:bg-zinc-700" />
              <div className="pb-1.5 pl-1.5 pr-1.5">
                <div
                  onClick={handleLogout}
                  className="h-full w-full cursor-pointer rounded-md px-3 py-0.5 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                >
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    Ok
                  </span>
                </div>
                <div
                  onClick={toggleDropdownClose}
                  className="h-full w-full cursor-pointer rounded-md px-3 py-0.5 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                >
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    Cancel
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </nav>
  )
}
