import { useContext, useEffect } from "react";
import { Button } from "../generic/Button";
import { Container } from "../styles/Header";
import { AppContext } from "../lib/context";
import { useTranslation } from "react-i18next";
import MineIcon from "../assets/icons/MineIcon.png";
import TimeIcon from "../assets/icons/TimeIcon.svg?react";
import HomeIcon from "../assets/icons/HomeIcon.svg?react";
import { FormatTime } from "../lib/functions";
import Home from "./Home";

interface GameProps {
  goToPage: () => void;
}

export default function Header({ goToPage }: GameProps) {
  const {
    selectedAvatar,
    username,
    selectedDifficulty,
    setLoadingMessage,
    minesRemaining,
    setMinesRemaining,
    fieldSize,
    resetField,
    matchTime,
  } = useContext(AppContext);
  const { t } = useTranslation();
  const screenSize = window.innerWidth;

  // Update mines amount after every new game
  useEffect(() => {
    setMinesRemaining(fieldSize.mines);
  }, [resetField]);

  return (
    <Container>
      <div className="userContainer">
        <img src={selectedAvatar} alt="User Avatar" className="avatar" />

        <h2 className="username">{username}</h2>
      </div>
      <div className="difficultyContainer">
        <h2 className="difficulty">
          {screenSize > 450 && t("Difficulty") + ": "}

          <span className="difficultyText">{t(selectedDifficulty)}</span>
        </h2>
      </div>
      <div className="minesContainer">
        <h2 className="mines">
          <img src={MineIcon} alt="MineIcon" className="MineIcon" />
          <span className="minesText">{minesRemaining}</span>
        </h2>
      </div>
      <div className="timeContainer">
        <h2 className="time">
          {screenSize > 500 && <TimeIcon className="TimeIcon"></TimeIcon>}
          <span className="timeText">{FormatTime(matchTime)}</span>
        </h2>
      </div>
      {screenSize > 810 ? (
        <Button
          color="gray"
          borderRadius="4px"
          width="130px"
          height="40px"
          functionButton={() => (
            goToPage(), setLoadingMessage("Wait, deactivating the mines")
          )}
        >
          {t("Back to Menu")}
        </Button>
      ) : (
        <HomeIcon
          className="homeIcon"
          onClick={() => (
            goToPage(), setLoadingMessage("Wait, deactivating the mines")
          )}
        ></HomeIcon>
      )}
    </Container>
  );
}
