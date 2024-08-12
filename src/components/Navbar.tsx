import React from "react";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Navbar({ name }: { name: string }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("name");
    navigate("/login");
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="absolute top-5 md:right-10 md:top-5 rounded-lg px-6 bg-white shadow-sm dark:bg-zinc-950 py-3 border-[1px] border-zinc-300 dark:border-zinc-700">
      <main className="relative flex items-center justify-center gap-x-5">
        <p className="font-bold text-lg w-fit text-zinc-900 dark:text-zinc-100">
          {name}
        </p>
        <div className="min-h-5 w-[1px] rounded-sm bg-zinc-300 dark:bg-zinc-700" />
        <MdLogout
          onClick={toggleDropdown}
          className="text-zinc-900 size-5 cursor-pointer dark:text-zinc-100 dark:hover:text-zinc-300 hover:duration-500 hover:scale-125 transition-all hover:ease-in-out"
        />
        {isOpen && (
          <div className="absolute -right-6 -bottom-36">
            <div className="relative flex flex-col w-40 gap-y-1.5 shadow-sm rounded-lg h-full items-startjustify-center border-[1px] border-zinc-300 dark:border-zinc-700 dark:bg-zinc-950 bg-white ">
              <span className="font-bold text-zinc-900 dark:text-zinc-100 px-3.5 py-2">
                Logout ?
              </span>
              <div className="w-full bg-zinc-300 dark:bg-zinc-700 h-[1px]" />
              <div className="pb-1.5 pr-1.5 pl-1.5">
                <div
                  onClick={handleLogout}
                  className="w-full h-full cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md px-3 py-0.5"
                >
                  <span className="font-medium text-zinc-900 dark:text-zinc-100 text-sm">
                    Ok
                  </span>
                </div>
                <div
                  onClick={toggleDropdown}
                  className="w-full h-full cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md px-3 py-0.5"
                >
                  <span className="font-medium text-zinc-900 dark:text-zinc-100 text-sm">
                    Cancel
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </nav>
  );
}
