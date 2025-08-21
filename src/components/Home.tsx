import { useTranslation } from "react-i18next";
import { Button } from "../generic/Button";
import { Container } from "../styles/Home";
import BombIcon from "../assets/icons/BombIcon.svg?react";
import { useContext } from "react";
import { AppContext } from "../lib/context";
import { ModalMessage } from "../generic/ModalMessage";

export default function Home() {
  const { t } = useTranslation();
  const { setShowModalSettings, resetSettings, setResetSettings, setTheme } =
    useContext(AppContext);

  function ResetDefaults() {
    setTheme("light");
    localStorage.setItem("minesweeper_theme", "light");
  }
  return (
    <Container>
      <div className="app-header">
        <BombIcon className="bombIcon"></BombIcon>
        <h1 className="app-title">REACT</h1>
        <h1 className="app-title">MINESWEEPER</h1>
        <BombIcon className="bombIcon"></BombIcon>
      </div>
      <div className="home-buttons">
        <Button
          color="blue"
          borderRadius="4px"
          width="130px"
          functionButton={() => console.log("Start")}
        >
          {t("Start Game")}
        </Button>
        <Button
          color="gray"
          borderRadius="4px"
          width="130px"
          functionButton={() => console.log("How to Play")}
        >
          {t("How To Play")}
        </Button>
        <Button
          color="blue"
          borderRadius="4px"
          width="130px"
          functionButton={() => setShowModalSettings(true)}
        >
          {t("Settings")}
        </Button>
      </div>
      `
      {resetSettings && (
        <ModalMessage
          textMessage={t("Do you want to reset the settings?")}
          onClick1={() => setResetSettings(false)}
          onClick2={() => (
            ResetDefaults(),
            setResetSettings(false),
            setShowModalSettings(false)
          )}
          textButton1={t("Cancel")}
          textButton2={t("Yes")}
        ></ModalMessage>
      )}
      `
    </Container>
  );
}
