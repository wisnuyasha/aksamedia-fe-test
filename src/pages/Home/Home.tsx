import React from "react";
import ProfileSection from "../../components/Home/ProfileSection";
import Sidebar from "../../components/Home/Sidebar";
import Todos from "../../components/Todos/Todos";
import CreateTodo from "../../components/Todos/CreateTodos";

export default function Home({
  name,
  onChangeName,
}: {
  name: string;
  onChangeName: (newName: string) => void;
}) {
  const [activePage, setActivePage] = React.useState("todos");

  function handleActivePage(act: string) {
    setActivePage(act);
  }

  return (
    <div className="flex h-full w-full flex-col md:flex-row">
      <Sidebar activePage={activePage} handleActivePage={handleActivePage} />
      {activePage === "todos" && <Todos handleActivePage={handleActivePage} />}
      {activePage === "add" && <CreateTodo />}
      {activePage === "profile" && (
        <ProfileSection name={name} onChangeName={onChangeName} />
      )}
    </div>
  );
}
