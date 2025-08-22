import { useTranslation } from "react-i18next";
import { Button } from "../generic/Button";
import { Container } from "../styles/Home";
import MineIcon from "../assets/icons/MineIcon.png";
import { useContext } from "react";
import { AppContext } from "../lib/context";
import { ModalMessage } from "../generic/ModalMessage";
import i18n from "../lib/language";

export default function Home() {
  const { t } = useTranslation();
  const {
    setShowModalSettings,
    resetSettings,
    setResetSettings,
    setTheme,
    setSelectedLanguage,
    quitSettings,
    setQuitSettings,
    setSelectedDifficulty,
  } = useContext(AppContext);

  function ResetDefaults() {
    setTheme("light");
    setSelectedLanguage("en");
    setSelectedDifficulty("easy");
    localStorage.setItem("minesweeper_theme", "light");
    localStorage.setItem("minesweeper_language", "en");
    localStorage.setItem("minesweeper_difficulty", "easy");

    i18n.changeLanguage("en");
  }
  return (
    <Container>
      <div className="app-header">
        <img src={MineIcon} alt="Mine" className="mineIcon" />
        <h1 className="app-title">REACT</h1>
        <h1 className="app-title">MINESWEEPER</h1>
        <img src={MineIcon} alt="Mine" className="mineIcon" />
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
          {t("How to Play")}
        </Button>
        <Button
          color="blue"
          borderRadius="4px"
          width="130px"
          functionButton={() => console.log("Stats")}
        >
          {t("Game Stats")}
        </Button>
        <Button
          color="gray"
          borderRadius="4px"
          width="130px"
          functionButton={() => setShowModalSettings(true)}
        >
          {t("Settings")}
        </Button>
      </div>

      {quitSettings && (
        <ModalMessage
          textMessage={t("Do you want to quit without saving?")}
          textButton1={t("Cancel")}
          onClick1={() => setQuitSettings(false)}
          textButton2={t("Yes")}
          onClick2={() => (setQuitSettings(false), setShowModalSettings(false))}
        />
      )}
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
    </Container>
  );
}
