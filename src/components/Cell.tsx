import { useContext, useState, useEffect } from "react";
import { Container } from "../styles/Cell";
import { AppContext } from "../lib/context";

import MineIcon from "../assets/icons/MineIcon.png";
import FlagIcon from "../assets/icons/FlagIcon.png";
import Img1 from "../assets/icons/01.png";
import Img2 from "../assets/icons/02.png";
import Img3 from "../assets/icons/03.png";
import Img4 from "../assets/icons/04.png";

type CellContent = "mine" | "flag" | "1" | "2" | "3" | "4";

interface Props {
  cellContent?: CellContent;
  enableClick: boolean;
}

export default function Cell({ cellContent, enableClick }: Props) {
  const { selectedDifficulty } = useContext(AppContext);
  const [clickable, setClickable] = useState(enableClick);

  const [visibleContent, setVisibleContent] = useState<CellContent | null>(
    cellContent ?? null
  );
  const [isExiting, setIsExiting] = useState(false);

  const cellSize =
    selectedDifficulty === "easy"
      ? "56px"
      : selectedDifficulty === "medium"
      ? "48px"
      : "32px";

  const cellContentMap: Record<CellContent, string> = {
    mine: MineIcon,
    flag: FlagIcon,
    "1": Img1,
    "2": Img2,
    "3": Img3,
    "4": Img4,
  };

  const isClickable = visibleContent ? false : clickable;

  const handleClick = () => {
    if (isClickable) setClickable(false);
  };

  // Controla animação de desaparecimento
  useEffect(() => {
    if (!cellContent && visibleContent) {
      setIsExiting(true);
      const timer = setTimeout(() => setVisibleContent(null), 400); // duração da transição
      return () => clearTimeout(timer);
    } else if (cellContent) {
      setVisibleContent(cellContent);
      setIsExiting(false);
    }
  }, [cellContent]);

  return (
    <Container
      cellSize={cellSize}
      enableClick={isClickable}
      cellContent={cellContent ?? ""}
      onClick={handleClick}
    >
      {visibleContent && (
        <img
          src={cellContentMap[visibleContent]}
          alt={visibleContent}
          className={`cellContent ${isExiting ? "exit" : "enter"}`}
        />
      )}
    </Container>
  );
}
