import React from "react";
import ToggleTheme from "./components/ToggleTheme";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem("name")?.length === undefined) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-900">
      <ToggleTheme />
      <Navbar />
    </main>
  );
}
