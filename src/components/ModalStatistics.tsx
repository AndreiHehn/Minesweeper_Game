import { useTranslation } from "react-i18next";
import GenericPieChart from "../generic/PieChart";
import { Container } from "../styles/ModalStatistics";
import { useContext } from "react";
import { AppContext } from "../lib/context";
import { FormatTime } from "../lib/functions";
import { Button } from "../generic/Button";

export default function ModalStatistics() {
  const { t } = useTranslation();
  const { stats, setResetStats } = useContext(AppContext);

  const easyData = [
    { name: "Vitórias", value: stats.Easy.wins },
    { name: "Derrotas", value: stats.Easy.defeats },
  ];
  const mediumData = [
    { name: "Vitórias", value: stats.Medium.wins },
    { name: "Derrotas", value: stats.Medium.defeats },
  ];
  const hardData = [
    { name: "Vitórias", value: stats.Hard.wins },
    { name: "Derrotas", value: stats.Hard.defeats },
  ];

  const colors = ["#29ba3c", "#cd2e2e"];
  return (
    <Container>
      <section className="charts">
        <div className="chart">
          <h2 className="chartTitle">{t("Easy")}</h2>
          <h3 className="chartBest">
            {t("Best Time")}: {FormatTime(stats.Easy.best)}
          </h3>
          {easyData[0].value + easyData[1].value == 0 ? (
            <h4 className="no-matches">{t("0 matches played")}</h4>
          ) : (
            <GenericPieChart
              data={easyData}
              dataColors={colors}
              centerData={
                Math.round(
                  (easyData[0].value /
                    (easyData[0].value + easyData[1].value)) *
                    100
                ).toString() + "%"
              }
              displayTooltip={true}
              width={170}
              height={170}
            ></GenericPieChart>
          )}
        </div>

        <div className="chart">
          <h2 className="chartTitle">{t("Medium")}</h2>
          <h3 className="chartBest">
            {t("Best Time")}: {FormatTime(stats.Medium.best)}
          </h3>
          {mediumData[0].value + mediumData[1].value == 0 ? (
            <h4 className="no-matches">{t("0 matches played")}</h4>
          ) : (
            <GenericPieChart
              data={mediumData}
              dataColors={colors}
              centerData={
                Math.round(
                  (mediumData[0].value /
                    (mediumData[0].value + mediumData[1].value)) *
                    100
                ).toString() + "%"
              }
              displayTooltip={true}
              width={170}
              height={170}
            ></GenericPieChart>
          )}
        </div>
        <div className="chart">
          <h2 className="chartTitle">{t("Hard")}</h2>
          <h3 className="chartBest">
            {t("Best Time")}: {FormatTime(stats.Hard.best)}
          </h3>
          {hardData[0].value + hardData[1].value == 0 ? (
            <h4 className="no-matches">{t("0 matches played")}</h4>
          ) : (
            <GenericPieChart
              data={hardData}
              dataColors={colors}
              centerData={
                Math.round(
                  (hardData[0].value /
                    (hardData[0].value + hardData[1].value)) *
                    100
                ).toString() + "%"
              }
              displayTooltip={true}
              width={170}
              height={170}
            ></GenericPieChart>
          )}
        </div>
      </section>
      <footer className="reset-stats">
        <Button
          color="red"
          borderRadius="4px"
          width="130px"
          height="30px"
          functionButton={() => setResetStats(true)}
        >
          {t("Reset")}
        </Button>
      </footer>
    </Container>
  );
}
