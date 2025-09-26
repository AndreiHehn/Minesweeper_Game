import { useContext, useEffect, useState } from "react";
import "./App.css";
import Home from "./components/Home";
import { AppContext } from "./lib/context";
import { useTranslation } from "react-i18next";
import { ModalGeneric } from "./generic/GenericModal";
import { ModalSettings } from "./components/ModalSettings";
import ModalAvatar from "./components/ModalAvatar";
import ModalStatistics from "./components/ModalStatistics";
import LoadingScreen from "./components/LoadingScreen";
import Game from "./components/Game";
import ModalEndGame from "./components/ModalEndGame";
import { ModalHelp } from "./components/ModalHelp";

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
    activePage,
    setActivePage,
    showModalEndGame,
    gameResult,
    showModalHelp,
    setShowModalHelp,
  } = useContext(AppContext);
  const { t } = useTranslation();

  const [targetPage, setTargetPage] = useState<"Home" | "Game" | null>(null);
  const [transitionStep, setTransitionStep] = useState<
    | null
    | "fadeOutCurrent"
    | "fadeInTransition"
    | "waitBeforeFadeOutTransition"
    | "fadeOutTransition"
    | "fadeInTarget"
  >(null);

  useEffect(() => {
    if (!transitionStep) return;

    const durations = {
      fadeOutCurrent: 1000,
      fadeInTransition: 1000,
      waitBeforeFadeOutTransition: 8000,
      fadeOutTransition: 1000,
      fadeInTarget: 1000,
    };

    // Controla os passos da transição
    if (transitionStep === "fadeInTarget") {
      // Deixa rodar o fade-in e só depois reseta os estados
      const timer = setTimeout(() => {
        setTransitionStep(null);
        setTargetPage(null);
      }, durations.fadeInTarget);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      switch (transitionStep) {
        case "fadeOutCurrent":
          setActivePage("Loading");
          setTransitionStep("fadeInTransition");
          break;

        case "fadeInTransition":
          setTransitionStep("waitBeforeFadeOutTransition");
          break;

        case "waitBeforeFadeOutTransition":
          setTransitionStep("fadeOutTransition");
          break;

        case "fadeOutTransition":
          if (targetPage) {
            setActivePage(targetPage);
            setTransitionStep("fadeInTarget");
          }
          break;
      }
    }, durations[transitionStep]);

    return () => clearTimeout(timer);
  }, [transitionStep, targetPage, setActivePage]);

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

  function goToPageWithTransition(target: "Home" | "Game") {
    if (activePage === target || transitionStep) return;
    setTargetPage(target);
    setTransitionStep("fadeOutCurrent");
  }

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
      {activePage === "Home" && (
        <div
          className={
            transitionStep === "fadeOutCurrent" && targetPage === "Game"
              ? "fade-out"
              : transitionStep === "fadeInTarget" && activePage === "Home"
              ? "fade-in"
              : ""
          }
        >
          <Home goToPage={() => goToPageWithTransition("Game")} />
        </div>
      )}

      {activePage === "Game" && (
        <div
          className={
            transitionStep === "fadeOutCurrent" && targetPage === "Home"
              ? "fade-out"
              : transitionStep === "fadeInTarget" && activePage === "Game"
              ? "fade-in"
              : ""
          }
        >
          <Game goToPage={() => goToPageWithTransition("Home")} />
        </div>
      )}

      {activePage === "Loading" && (
        <div
          className={
            transitionStep === "fadeInTransition"
              ? "fade-in"
              : transitionStep === "fadeOutTransition"
              ? "fade-out"
              : ""
          }
        >
          <LoadingScreen />
        </div>
      )}
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
      {showModalHelp && (
        <ModalGeneric
          functionCloseModal={() => setShowModalHelp(false)}
          mobileFullScreen
          top="50%"
          left="50%"
          title={t("How to Play")}
        >
          <ModalHelp />
        </ModalGeneric>
      )}
      {showModalStatistics && (
        <ModalGeneric
          functionCloseModal={() => setShowModalStatistics(false)}
          mobileFullScreen
          top="50%"
          left="50%"
          title={t("Game Stats")}
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
      {showModalEndGame && (
        <ModalGeneric
          // functionCloseModal={VerifySettings}
          mobileFullScreen
          top="50%"
          left="50%"
          title={
            gameResult == "Defeat"
              ? t("BOOM! You lost!")
              : t("Congratulations! You won!")
          }
          width="400px"
        >
          <ModalEndGame goToPage={() => goToPageWithTransition("Home")} />
        </ModalGeneric>
      )}
    </>
  );
}

export default App;
