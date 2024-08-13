import ProfileSection from "../../components/Home/ProfileSection";
import Sidebar from "../../components/Home/Sidebar";
import Todos from "../../components/Todos/Todos";
import CreateTodo from "../../components/Todos/CreateTodos";
import { useActivePageStore } from "../../store/useActivePageStore";

export default function Home() {
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
