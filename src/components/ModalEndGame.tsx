import { useTranslation } from "react-i18next";
import GenericPieChart from "../generic/PieChart";
import { Container } from "../styles/ModalEndGame";
import { Button } from "../generic/Button";
import { useContext } from "react";
import { AppContext } from "../lib/context";

interface GameProps {
  goToPage: () => void;
}

export default function ModalEndGame({ goToPage }: GameProps) {
  const { t } = useTranslation();
  const {
    setShowModalEndGame,
    setEndGame,
    setResetField,
    gameResult,
    setGameResult,
  } = useContext(AppContext);
  const easyData = [
    { name: "Vitórias", value: 12 },
    { name: "Derrotas", value: 1 },
  ];
  const easyBest = "00:00";

  const colors = ["#029715", "#a62222"];
  return (
    <Container>
      <footer className="footer-buttons">
        <Button
          color="green"
          borderRadius="4px"
          width="125px"
          height="32px"
          functionButton={() => (
            setShowModalEndGame(false),
            setEndGame(false),
            setGameResult(""),
            setResetField((prev: number) => prev + 1)
          )}
        >
          {t("Play Again")}
        </Button>
        <Button
          color="gray"
          borderRadius="4px"
          width="125px"
          height="32px"
          functionButton={() => (setShowModalEndGame(false), goToPage())}
        >
          {t("Back to Menu")}
        </Button>
      </footer>
    </Container>
  );
}
