import React from "react";
import ProfileSection from "./ProfileSection";
import Sidebar from "./Sidebar";

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
      {/* {activePage === "todos" && <Todos />}
      {activePage === "add" && <Add />} */}
      {activePage === "profile" && (
        <ProfileSection name={name} onChangeName={onChangeName} />
      )}
    </div>
  );
}
