/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState, useCallback, useEffect } from "react";
import { Container } from "../styles/Field";
import Cell from "./Cell";
import { AppContext } from "../lib/context";

export default function Field() {
  const {
    fieldSize,
    endGame,
    setEndGame,
    setShowModalEndGame,
    gameResult,
    setGameResult,
    setMatchTime,
    addWin,
    addDefeat,
    selectedDifficulty,
    matchTime,
  } = useContext(AppContext);
  const { rows, cols, mines } = fieldSize;

  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [minePositions, setMinePositions] = useState<number[]>([]);
  const [firstClickDone, setFirstClickDone] = useState(false);

  // Função para gerar minas garantindo célula segura
  const generateMines = (safeIndex: number) => {
    const positions: number[] = [];
    const totalCells = rows * cols;

    while (positions.length < mines) {
      const pos = Math.floor(Math.random() * totalCells);
      if (pos !== safeIndex && !positions.includes(pos)) positions.push(pos);
    }

    return positions;
  };

  // Calcula conteúdo oculto (mina ou número)
  const getHiddenContents = (positions: number[]) => {
    const totalCells = rows * cols;
    const contents: (string | undefined)[] = Array(totalCells).fill(undefined);

    const getIndex = (r: number, c: number) => r * cols + c;
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const index = getIndex(r, c);
        if (positions.includes(index)) {
          contents[index] = "mine";
        } else {
          let count = 0;
          for (const [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
              const neighborIndex = getIndex(nr, nc);
              if (positions.includes(neighborIndex)) count++;
            }
          }
          if (count > 0) contents[index] = count.toString();
        }
      }
    }

    return contents;
  };

  const revealCell = useCallback(
    (clickedIndex: number) => {
      let positions = minePositions;

      if (!firstClickDone) {
        positions = generateMines(clickedIndex);
        setMinePositions(positions);
        setFirstClickDone(true);
      }

      const hiddenContents = getHiddenContents(positions);

      // Se clicou em mina, revela só ela e encerra o jogo
      if (hiddenContents[clickedIndex] === "mine") {
        setRevealed((prev) => new Set(prev).add(clickedIndex));
        setGameResult("Defeat");
        setEndGame(true);
        return;
      }

      const newRevealed = new Set<number>();
      const stack = [clickedIndex];
      const directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ];

      while (stack.length > 0) {
        const index = stack.pop()!;
        if (newRevealed.has(index)) continue;

        newRevealed.add(index);
        const r = Math.floor(index / cols);
        const c = index % cols;
        const content = hiddenContents[index];

        // Propaga somente se a célula for vazia
        if (!content) {
          for (const [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
              const neighborIndex = nr * cols + nc;
              const neighborContent = hiddenContents[neighborIndex];

              // Empilha apenas células não-mina
              if (
                neighborContent !== "mine" &&
                !newRevealed.has(neighborIndex)
              ) {
                stack.push(neighborIndex);
              }
            }
          }
        }
      }

      // Atualiza o estado apenas no final
      setRevealed((prev) => new Set([...prev, ...newRevealed]));
    },
    [
      cols,
      rows,
      minePositions,
      firstClickDone,
      generateMines,
      getHiddenContents,
    ]
  );

  const hiddenContents = getHiddenContents(minePositions);

  // Disable Right Click
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  useEffect(() => {
    if (gameResult == "Defeat") {
      const displayMinesTimer = setTimeout(() => {
        // Revela todo o tabuleiro
        setRevealed(new Set(Array.from({ length: rows * cols }, (_, i) => i)));
      }, 2000); // espera 2 segundos
      const showModalTimer = setTimeout(() => {
        setShowModalEndGame(true);
      }, 3000); // espera 2 segundos

      return () => (
        clearTimeout(displayMinesTimer), clearTimeout(showModalTimer)
      );
    }
  }, [endGame, rows, cols]);

  useEffect(() => {
    const totalCells = rows * cols;
    const nonMineCells = totalCells - mines;

    if (
      revealed.size === nonMineCells &&
      firstClickDone &&
      gameResult !== "Defeat"
    ) {
      setGameResult("Victory");
      setEndGame(true);

      const showModalTimer = setTimeout(() => {
        setShowModalEndGame(true);
      }, 2000); // pode esperar 1s só para dar feedback visual

      return () => clearTimeout(showModalTimer);
    }
  }, [revealed, rows, cols, mines, firstClickDone, gameResult]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;

    if (firstClickDone && !endGame) {
      // inicia o cronômetro
      timer = setInterval(() => {
        setMatchTime((prev) => prev + 1);
      }, 1000);
    }

    if (endGame && timer) {
      clearInterval(timer);
    }

    // cleanup no unmount ou quando partida termina
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [firstClickDone, endGame]);

  useEffect(() => {
    setMatchTime(0);
  }, [rows, cols, mines]);

  useEffect(() => {
    if (gameResult != "") {
      if (gameResult == "Victory") {
        addWin(selectedDifficulty, matchTime);
      } else {
        addDefeat(selectedDifficulty);
      }
    }
  }, [gameResult]);

  return (
    <Container rows={rows} cols={cols}>
      {Array.from({ length: rows * cols }).map((_, index) => (
        <Cell
          key={index}
          index={index}
          enableClick={!endGame}
          hiddenContent={hiddenContents[index] as any}
          revealed={revealed.has(index)}
          revealCell={revealCell}
        />
      ))}
    </Container>
  );
}
