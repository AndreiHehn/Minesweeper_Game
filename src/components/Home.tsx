import { useTranslation } from "react-i18next";
import { Button } from "../generic/Button";
import { Container } from "../styles/Home";
import MineIcon from "../assets/icons/MineIcon.png";
import { useContext } from "react";
import { AppContext } from "../lib/context";
import { ModalMessage } from "../generic/ModalMessage";
import i18n from "../lib/language";

interface HomeProps {
  goToPage: () => void;
}

export default function Home({ goToPage }: HomeProps) {
  const { t } = useTranslation();
  const {
    username,
    setUsername,
    setShowModalSettings,
    resetSettings,
    setResetSettings,
    setTheme,
    setSelectedLanguage,
    quitSettings,
    setQuitSettings,
    setSelectedDifficulty,
    emptyUsername,
    setEmptyUsername,
    setShowModalAvatar,
    selectedAvatar,
    quitAvatar,
    setQuitAvatar,
    setShowModalStatistics,
  } = useContext(AppContext);

  function ResetDefaults() {
    setUsername("Player 001");
    setTheme("light");
    setSelectedLanguage("en");
    setSelectedDifficulty("easy");
    localStorage.setItem("minesweeper_username", "Player 001");
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
      <div className="subheader">
        <div className="avatarContainer">
          <img
            src={selectedAvatar}
            alt="User Avatar"
            className="avatar"
            onClick={() => setShowModalAvatar(true)}
          />
          <h3
            className="changeAvatarText"
            onClick={() => setShowModalAvatar(true)}
          >
            {t("Change Avatar")}
          </h3>
        </div>
        <h2 className="welcomeText">
          {t("Welcome")}, <span className="username">{username}</span>
        </h2>
      </div>
      <div className="home-buttons">
        <Button
          color="blue"
          borderRadius="4px"
          width="130px"
          functionButton={goToPage}
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
          functionButton={() => setShowModalStatistics(true)}
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
      {quitAvatar && (
        <ModalMessage
          textMessage={t("Do you want to quit without saving?")}
          textButton1={t("Cancel")}
          onClick1={() => setQuitAvatar(false)}
          textButton2={t("Yes")}
          onClick2={() => (setQuitAvatar(false), setShowModalAvatar(false))}
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
      {emptyUsername && (
        <ModalMessage
          textMessage={t("Your username cannot be empty!")}
          onClick1={() => setEmptyUsername(false)}
          textButton1={t("OK")}
        ></ModalMessage>
      )}
    </Container>
  );
}
