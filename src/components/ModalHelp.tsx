/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import { Container } from "../styles/ModalHelp";
import { Page } from "./HelpPage";
import ArrowNextIcon from "../../src/assets/icons/ArrowNextIcon.svg?react";
import ArrowPrevIcon from "../../src/assets/icons/ArrowPrevIcon.svg?react";

export function ModalHelp() {
  const { t } = useTranslation();
  const screenSize = window.innerWidth;

  function NextArrow(props: any) {
    const { onClick } = props;
    return <ArrowNextIcon className="carouselArrow" onClick={onClick} />;
  }

  function PrevArrow(props: any) {
    const { onClick } = props;
    return <ArrowPrevIcon className="carouselArrow" onClick={onClick} />;
  }

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    draggable: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Container>
      {screenSize > 768 ? (
        <Slider {...carouselSettings}>
          <Page
            pageTitle={t("Welcome to the Minesweeper!")}
            pageText={t(
              "Minesweeper is game where your objetive is reveal the field, avoiding the mines. Try not to explode yourself!"
            )}
          />
          <Page
            pageTitle={t("Difficulty Selection")}
            pageText={t(
              "In the settings menu, you are able to select the game difficulty, impacting on the field size and number of mines."
            )}
          />
          <Page
            pageTitle={t("Cells") + " (1 / 2)"}
            pageText={t(
              "If you click on a cell with the left mouse button, you will reveal the cell content. A cell may have a number, according to the number of mines on adjacent cells."
            )}
          />
          <Page
            pageTitle={t("Cells") + " (2 / 2)"}
            pageText={t(
              "If the clicked cell has a mine, the game is finished immediatly, and the field is revealed for you."
            )}
          />
          <Page
            pageTitle={t("Flags")}
            pageText={t(
              "With the right mouse button, you can put a flag on a cell. It is usefull to mark the cells you think there is a mine."
            )}
          />
        </Slider>
      ) : (
        <div className="mobile-pages">
          <Page
            pageTitle={t("Welcome to the Minesweeper!")}
            pageText={t(
              "Minesweeper is game where your objetive is reveal the field, avoiding the mines. Try not to explode yourself!"
            )}
          />
          <Page
            pageTitle={t("Difficulty Selection")}
            pageText={t(
              "In the settings menu, you are able to select the game difficulty, impacting on the field size and number of mines."
            )}
          />
          <Page
            pageTitle={t("Cells") + " (1 / 2)"}
            pageText={t(
              "If you click on a cell with the left mouse button, you will reveal the cell content. A cell may have a number, according to the number of mines on adjacent cells."
            )}
          />
          <Page
            pageTitle={t("Cells") + " (2 / 2)"}
            pageText={t(
              "If the clicked cell has a mine, the game is finished immediatly, and the field is revealed for you."
            )}
          />
          <Page
            pageTitle={t("Flags")}
            pageText={t(
              "With the right mouse button, you can put a flag on a cell. It is usefull to mark the cells you think there is a mine."
            )}
          />
        </div>
      )}
    </Container>
  );
}
