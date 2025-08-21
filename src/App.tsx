import { useContext, useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import { AppContext } from "./lib/context";
import { useTranslation } from "react-i18next";
import { ModalGeneric } from "./generic/GenericModal";
import { ModalSettings } from "./components/ModalSettings";

function App() {
  const { theme, setTheme, showModalSettings, setShowModalSettings } =
    useContext(AppContext);
  const { t } = useTranslation();

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

  function VerifyModifications() {
    setShowModalSettings(false);
  }

  return (
    <>
      <Home></Home>
      {showModalSettings && (
        <ModalGeneric
          functionCloseModal={VerifyModifications}
          mobileFullScreen
          top="50%"
          left="50%"
          title={t("Settings")}
          width="400px"
        >
          <ModalSettings />
        </ModalGeneric>
      )}
    </>
  );
}

export default App;
