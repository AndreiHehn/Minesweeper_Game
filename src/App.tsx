import { useContext, useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import { AppContext } from "./lib/context";
import { useTranslation } from "react-i18next";
import { ModalGeneric } from "./generic/GenericModal";
import { ModalSettings } from "./components/ModalSettings";
import ModalAvatar from "./components/ModalAvatar";
import ModalStatistics from "./components/ModalStatistics";

function App() {
  const {
    theme,
    showModalAvatar,
    setShowModalAvatar,
    showModalSettings,
    setShowModalSettings,
    settingsChanged,
    avatarChanged,
    setQuitSettings,
    setQuitAvatar,
    showModalStatistics,
    setShowModalStatistics,
  } = useContext(AppContext);
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

  function VerifySettings() {
    if (settingsChanged) {
      setQuitSettings(true);
    } else {
      setShowModalSettings(false);
    }
  }

  function VerifyAvatar() {
    if (avatarChanged) {
      setQuitAvatar(true);
    } else {
      setShowModalAvatar(false);
    }
  }

  return (
    <>
      <Home></Home>
      {showModalAvatar && (
        <ModalGeneric
          functionCloseModal={VerifyAvatar}
          mobileFullScreen
          top="50%"
          left="50%"
          title={t("Select your Avatar")}
          width="400px"
        >
          <ModalAvatar />
        </ModalGeneric>
      )}
      {showModalStatistics && (
        <ModalGeneric
          functionCloseModal={() => setShowModalStatistics(false)}
          mobileFullScreen
          top="50%"
          left="50%"
          title={t("Game Stats")}
          width="400px"
        >
          <ModalStatistics />
        </ModalGeneric>
      )}
      {showModalSettings && (
        <ModalGeneric
          functionCloseModal={VerifySettings}
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
