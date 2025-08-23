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
  const totalData = [
    { name: "Vitórias", value: 37 },
    { name: "Derrotas", value: 14 },
  ];

  const colors = ["#029715", "#a62222"];
  return (
    <Container>
      <section className="charts">
        <div className="chart">
          <h2 className="chartTitle">{t("Easy")}</h2>
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
            width={150}
            height={150}
          ></GenericPieChart>
        </div>

        <div className="chart">
          <h2 className="chartTitle">{t("Medium")}</h2>
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
            width={150}
            height={150}
          ></GenericPieChart>
        </div>
        <div className="chart">
          <h2 className="chartTitle">{t("Hard")}</h2>
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
            width={150}
            height={150}
          ></GenericPieChart>
        </div>
        <div className="chart">
          <h2 className="chartTitle">{t("Total")}</h2>
          <GenericPieChart
            data={totalData}
            dataColors={colors}
            centerData={
              Math.round(
                (totalData[0].value /
                  (totalData[0].value + totalData[1].value)) *
                  100
              ).toString() + "%"
            }
            displayTooltip={true}
            width={150}
            height={150}
          ></GenericPieChart>
        </div>
      </section>
    </Container>
  );
}
