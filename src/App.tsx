import ToggleTheme from "./components/Layouts/ToggleTheme";
import Navbar from "./components/Layouts/Navbar";
import Home from "./pages/Home/Home";
import { useAuthHome } from "./middleware/useAuth";

export default function App() {
  useAuthHome();
  return (
    <main className="flex min-h-screen duration-500 w-full flex-col items-center justify-center overflow-hidden bg-zinc-100 dark:bg-zinc-900">
      <ToggleTheme />
      <Navbar />
      <Home />
    </main>
  );
}
