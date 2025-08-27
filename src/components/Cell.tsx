import { useContext, useEffect, useState } from "react";
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
  loadingCell?: boolean;
  hiddenContent?: CellContent; // o que está por baixo da célula
  enableClick: boolean;
}

export default function Cell({
  loadingCell,
  hiddenContent,
  enableClick,
}: Props) {
  const { selectedDifficulty, minesRemaining, setMinesRemaining, fieldSize } =
    useContext(AppContext);
  const [clickable, setClickable] = useState(enableClick);

  // o que o jogador vê (nulo = célula fechada)
  const [visibleContent, setVisibleContent] = useState<CellContent | null>(
    null
  );

  const [isExiting] = useState(false);

  const cellSize = selectedDifficulty === "Easy" ? "56px" : "32px";

  const cellContentMap: Record<CellContent, string> = {
    mine: MineIcon,
    flag: FlagIcon,
    "1": Img1,
    "2": Img2,
    "3": Img3,
    "4": Img4,
  };

  const isClickable = visibleContent ? false : clickable;

  const handleClick = (e: React.MouseEvent) => {
    if (isClickable) {
      e.preventDefault();
      setClickable(false);
      if (hiddenContent) {
        setVisibleContent(hiddenContent); // revela mina ou número
      } else {
        setVisibleContent(null); // célula vazia
      }
    }
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Se célula vazia → marca bandeira
    if (!visibleContent) {
      setVisibleContent("flag");
      if (minesRemaining == 0) {
        setMinesRemaining(0);
      } else {
        setMinesRemaining(minesRemaining - 1);
      }
    }
    // Se já tiver bandeira → remove
    else if (visibleContent === "flag") {
      setVisibleContent(null);
      if (minesRemaining == fieldSize.mines) {
        setMinesRemaining(fieldSize.mines);
      } else {
        setMinesRemaining(minesRemaining + 1);
      }
    }
  };

  useEffect(() => {
    if (loadingCell) {
      setVisibleContent(hiddenContent ?? null);
    }
  }, [hiddenContent, loadingCell]);

  return (
    <Container
      cellSize={cellSize}
      enableClick={isClickable}
      cellContent={visibleContent ?? ""}
      onClick={handleClick}
      onContextMenu={handleRightClick}
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
