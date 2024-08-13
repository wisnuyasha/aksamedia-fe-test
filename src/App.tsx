import React from "react";
import ToggleTheme from "./components/Layouts/ToggleTheme";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Layouts/Navbar";
import Home from "./pages/Home/Home";

export default function App() {
  const [name, setName] = React.useState(localStorage.getItem("name") ?? "");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (name.length === 0) {
      navigate("/login");
    }
  }, [name, navigate]);

  const handleChangeName = (newName: string) => {
    setName(newName);
    localStorage.setItem("name", newName);
  };

  return (
    <main className="flex min-h-screen duration-500 w-full flex-col items-center justify-center overflow-hidden bg-zinc-100 dark:bg-zinc-900">
      <ToggleTheme />
      <Navbar name={name} />
      <Home name={name} onChangeName={handleChangeName} />
    </main>
  );
}
