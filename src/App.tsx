import { useContext, useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import { AppContext } from "./lib/context";

function App() {
  const { theme, setTheme } = useContext(AppContext);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light-theme", "dark-theme");

    if (theme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      root.classList.add(prefersDark ? "dark-theme" : "light-theme");
    } else {
      root.classList.add(`${theme}-theme`);
    }
  }, [theme]);

  return <Home></Home>;
}

export default App;
