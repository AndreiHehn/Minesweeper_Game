import { useTranslation } from "react-i18next";
import GenericPieChart from "../generic/PieChart";
import { Container } from "../styles/ModalStatistics";

export default function ModalStatistics() {
  const { t } = useTranslation();
  const easyData = [
    { name: "Vitórias", value: 12 },
    { name: "Derrotas", value: 1 },
  ];
  const mediumData = [
    { name: "Vitórias", value: 22 },
    { name: "Derrotas", value: 8 },
  ];
  const hardData = [
    { name: "Vitórias", value: 3 },
    { name: "Derrotas", value: 5 },
  ];
  const easyBest = "00:00";
  const mediumBest = "00:00";
  const hardBest = "00:00";

  const colors = ["#29ba3c", "#cd2e2e"];
  return (
    <Container>
      <section className="charts">
        <div className="chart">
          <h2 className="chartTitle">{t("Easy")}</h2>
          <h3 className="chartBest">
            {t("Best Time")}: {easyBest}
          </h3>
          <GenericPieChart
            data={easyData}
            dataColors={colors}
            centerData={
              Math.round(
                (easyData[0].value / (easyData[0].value + easyData[1].value)) *
                  100
              ).toString() + "%"
            }
            displayTooltip={true}
            width={170}
            height={170}
          ></GenericPieChart>
        </div>

        <div className="chart">
          <h2 className="chartTitle">{t("Medium")}</h2>
          <h3 className="chartBest">
            {t("Best Time")}: {mediumBest}
          </h3>
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
        </div>
        <div className="chart">
          <h2 className="chartTitle">{t("Hard")}</h2>
          <h3 className="chartBest">
            {t("Best Time")}: {hardBest}
          </h3>
          <GenericPieChart
            data={hardData}
            dataColors={colors}
            centerData={
              Math.round(
                (hardData[0].value / (hardData[0].value + hardData[1].value)) *
                  100
              ).toString() + "%"
            }
            displayTooltip={true}
            width={170}
            height={170}
          ></GenericPieChart>
        </div>
      </section>
    </Container>
  );
}
