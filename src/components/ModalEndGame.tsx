import { useTranslation } from "react-i18next";
import GenericPieChart from "../generic/PieChart";
import { Container } from "../styles/ModalEndGame";
import { Button } from "../generic/Button";
import { useContext } from "react";
import { AppContext } from "../lib/context";
import { FormatTime } from "../lib/functions";

interface GameProps {
  goToPage: () => void;
}

export default function ModalEndGame({ goToPage }: GameProps) {
  const { t } = useTranslation();
  const {
    setShowModalEndGame,
    setEndGame,
    setResetField,
    setGameResult,
    matchTime,
    selectedDifficulty,
    stats,
  } = useContext(AppContext);
  const data = [
    {
      name: "Vitórias",
      value:
        selectedDifficulty === "Easy"
          ? stats.Easy.wins
          : selectedDifficulty === "Medium"
          ? stats.Medium.wins
          : stats.Hard.wins,
    },
    {
      name: "Derrotas",
      value:
        selectedDifficulty === "Easy"
          ? stats.Easy.defeats
          : selectedDifficulty === "Medium"
          ? stats.Medium.defeats
          : stats.Hard.defeats,
    },
  ];

  const colors = ["#29ba3c", "#cd2e2e"];
  return (
    <Container>
      <section className="match-duration">
        {t("Match Duration")}:{" "}
        <span className="duration">{FormatTime(matchTime)}</span>
      </section>
      <div className="chart">
        <GenericPieChart
          data={data}
          dataColors={colors}
          centerData={
            Math.round(
              (data[0].value / (data[0].value + data[1].value)) * 100
            ).toString() + "%"
          }
          width={170}
          height={170}
        ></GenericPieChart>
        <div className="chart-info">
          <h2 className="matches-played">{t("Matches")}</h2>
          <span className="chart-data">{data[0].value + data[1].value}</span>
          <h2 className="matches-won">{t("Won")}</h2>
          <span className="chart-data" id="won">
            {data[0].value}{" "}
          </span>
          <h2 className="matches-lost">{t("Lost")}</h2>
          <span className="chart-data" id="lost">
            {data[1].value}
          </span>
        </div>
      </div>
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
