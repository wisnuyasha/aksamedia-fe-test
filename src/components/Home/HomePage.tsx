import ProfileSection from "./EditUserForm";
import Sidebar from "./Sidebar";
import Todos from "../Todos/Todos";
import { useActivePageStore } from "../../store/useActivePageStore";
import CreateTodoForm from "../Todos/CreateTodosForm";

export default function HomePage() {
  const { activePage } = useActivePageStore();

  const pages = {
    todos: <Todos />,
    add: <CreateTodoForm />,
    profile: <ProfileSection />,
  };

  return (
    <div className="flex h-full w-full flex-col md:flex-row">
      <Sidebar />
      {pages[activePage]}
    </div>
  );
}
