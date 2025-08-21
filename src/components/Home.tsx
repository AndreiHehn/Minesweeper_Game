import { useTranslation } from "react-i18next";
import { Button } from "../generic/Button";
import { Container } from "../styles/Home";
import BombIcon from "../assets/icons/BombIcon.svg?react";

export default function Home() {
  const { t } = useTranslation();
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
          width="120px"
          functionButton={() => console.log("Start")}
        >
          {t("Start Game")}
        </Button>
        <Button
          color="gray"
          borderRadius="4px"
          width="120px"
          functionButton={() => console.log("How to Play")}
        >
          {t("How To Play")}
        </Button>
        <Button
          color="blue"
          borderRadius="4px"
          width="120px"
          functionButton={() => console.log("Settings")}
        >
          {t("Settings")}
        </Button>
      </div>
    </Container>
  );
}
