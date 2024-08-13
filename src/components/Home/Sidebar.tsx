import { SidebarMenus } from "../../constants/SidebarMenus";
import { useActivePageStore } from "../../store/useActivePageStore";
import { capitalize } from "../../utils/capitalize";
import clsxm from "../../utils/clsxm";

export default function Sidebar() {
  const { activePage, handleActivePage } = useActivePageStore();
  return (
    <div className="md:h-screen px-10 pt-28 pb-11 md:px-16 md:py-28 w-full md:w-1/4 flex flex-col justify-start items-start">
      <div className="flex flex-col ">
        <h1 className="font-bold text-4xl text-zinc-900 dark:text-zinc-100 mb-9">
          Todo List
        </h1>
        <div className="flex flex-col gap-y-3">
          {SidebarMenus.map((_, idx) => (
            <span
              key={idx}
              className={clsxm(
                "text-lg cursor-pointer",
                activePage === SidebarMenus[idx]
                  ? "text-zinc-800 dark:text-zinc-100 font-bold"
                  : "text-zinc-600 dark:text-zinc-400"
              )}
              onClick={() => handleActivePage(SidebarMenus[idx])}
            >
              {capitalize(SidebarMenus[idx])}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
