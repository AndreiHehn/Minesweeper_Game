import { useContext } from "react";
import { Button } from "../generic/Button";
import { Container } from "../styles/Header";
import { AppContext } from "../lib/context";
import { useTranslation } from "react-i18next";
import MineIcon from "../assets/icons/MineIcon.png";
import TimeIcon from "../assets/icons/TimeIcon.svg?react";

interface GameProps {
  goToPage: () => void;
}

export default function Game({ goToPage }: GameProps) {
  const { selectedAvatar, username, selectedDifficulty, setLoadingMessage } =
    useContext(AppContext);
  const { t } = useTranslation();
  const minesRemaining = 10;
  const currentTime = "0:00";

  return (
    <Container>
      <div className="userContainer">
        <img src={selectedAvatar} alt="User Avatar" className="avatar" />
        <h2 className="username">{username}</h2>
      </div>
      <div className="difficultyContainer">
        <h2 className="difficulty">
          {t("Difficulty")}
          {": "}
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
          <TimeIcon className="TimeIcon"></TimeIcon>
          <span className="timeText">{currentTime}</span>
        </h2>
      </div>
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
    </Container>
  );
}
