import { useContext } from "react";
import { Button } from "../generic/Button";
import { Container } from "../styles/Header";
import { AppContext } from "../lib/context";
import { useTranslation } from "react-i18next";

interface GameProps {
  goToPage: () => void;
}

export default function Game({ goToPage }: GameProps) {
  const { selectedAvatar, username, selectedDifficulty, setLoadingMessage } =
    useContext(AppContext);
  const { t } = useTranslation();
  const minesRemaining = 10;

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
          {t("Mines Remaining:")}{" "}
          <span className="minesText">{minesRemaining}</span>
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
