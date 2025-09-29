import { useContext, useEffect, useState } from "react";
import { Container } from "../styles/Cell";
import { AppContext } from "../lib/context";

import MineIcon from "../assets/icons/MineIcon.png";
import FlagIcon from "../assets/icons/FlagIcon.png";
import EmptyCellIcon from "../assets/icons/EmptyCellIcon.png";
import Img1 from "../assets/icons/01.png";
import Img2 from "../assets/icons/02.png";
import Img3 from "../assets/icons/03.png";
import Img4 from "../assets/icons/04.png";
import Img5 from "../assets/icons/05.png";
import Img6 from "../assets/icons/06.png";

type CellContent =
  | "mine"
  | "flag"
  | "empty"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6";

interface Props {
  index: number;
  loadingCell?: boolean;
  hiddenContent?: CellContent;
  enableClick: boolean;
  revealed?: boolean;
  revealCell?: (index: number) => void;
}

export default function Cell({
  index,
  loadingCell,
  hiddenContent,
  enableClick,
  revealed,
  revealCell,
}: Props) {
  const {
    selectedDifficulty,
    minesRemaining,
    setMinesRemaining,
    markedMines,
    setMarkedMines,
    fieldSize,
    endGame,
  } = useContext(AppContext);
  const screenSize = window.innerWidth;
  const [clickable, setClickable] = useState(enableClick);

  // o que o jogador vê (nulo = célula fechada)
  const [visibleContent, setVisibleContent] = useState<CellContent | null>(
    null
  );

  const [isExiting] = useState(false);

  const cellSize =
    selectedDifficulty === "Easy" && screenSize > 610 ? "56px" : "32px";

  const cellContentMap: Record<CellContent, string> = {
    mine: MineIcon,
    flag: FlagIcon,
    empty: EmptyCellIcon,
    "1": Img1,
    "2": Img2,
    "3": Img3,
    "4": Img4,
    "5": Img5,
    "6": Img6,
  };

  const isClickable = endGame ? false : visibleContent ? false : clickable;

  const handleClick = (e: React.MouseEvent) => {
    if (isClickable) {
      e.preventDefault();
      setClickable(false);
      if (revealCell) {
        revealCell(index);
      }
    }
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!revealed) {
      // Se célula vazia → marca bandeira
      if (!visibleContent) {
        setVisibleContent("flag");
        setMarkedMines(markedMines + 1);

        if (minesRemaining == 0) {
          setMinesRemaining(0);
        } else {
          setMinesRemaining(minesRemaining - 1);
        }
      } else if (visibleContent === "flag") {
        setVisibleContent(null);
        setMarkedMines(markedMines - 1);

        if (markedMines > fieldSize.mines) {
          setMinesRemaining(0);
        } else {
          setMinesRemaining(minesRemaining + 1);
        }
      }
    }
  };

  // Mark Flag on Mobile
  let pressTimer: NodeJS.Timeout;

  const handleTouchStart = () => {
    pressTimer = setTimeout(() => {
      const fakeEvent = {
        preventDefault: () => {},
        nativeEvent: {} as any,
        isDefaultPrevented: () => false,
        isPropagationStopped: () => false,
        persist: () => {},
      } as React.MouseEvent;
      handleRightClick(fakeEvent);
    }, 500);
  };

  const handleTouchEnd = () => {
    clearTimeout(pressTimer);
  };

  useEffect(() => {
    if (loadingCell) {
      setVisibleContent(hiddenContent ?? null);
    }
  }, [hiddenContent, loadingCell]);

  useEffect(() => {
    if (revealed) {
      // Se a célula tiver número ou mina, mantém o conteúdo
      // Se estiver vazia, define como "empty" para renderizar fundo
      if (hiddenContent) {
        setVisibleContent(hiddenContent);
      } else {
        setVisibleContent("empty" as CellContent);
      }
    }
  }, [revealed, hiddenContent]);

  return (
    <Container
      cellSize={cellSize}
      enableClick={isClickable}
      cellContent={
        loadingCell && !visibleContent
          ? "closed"
          : revealed
          ? visibleContent ?? "empty"
          : visibleContent ?? "closed"
      }
      onClick={handleClick}
      onContextMenu={handleRightClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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
