import ProfileSection from "./Form/EditUserForm";
import Sidebar from "./Sidebar";
import Todos from "../Todos/Todos";
import CreateTodo from "../Todos/CreateTodos";
import { useActivePageStore } from "../../store/useActivePageStore";

export default function HomePage() {
  const { activePage } = useActivePageStore();
  return (
    <div className="flex h-full w-full flex-col md:flex-row">
      <Sidebar />
      {activePage === "todos" && <Todos />}
      {activePage === "add" && <CreateTodo />}
      {activePage === "profile" && <ProfileSection />}
    </div>
  );
}
