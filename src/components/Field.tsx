/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState, useCallback } from "react";
import { Container } from "../styles/Field";
import Cell from "./Cell";
import { AppContext } from "../lib/context";

export default function Field() {
  const { fieldSize } = useContext(AppContext);
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

      // Se clicou em mina, revela só ela
      if (hiddenContents[clickedIndex] === "mine") {
        setRevealed((prev) => new Set(prev).add(clickedIndex));
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

  return (
    <Container rows={rows} cols={cols}>
      {Array.from({ length: rows * cols }).map((_, index) => (
        <Cell
          key={index}
          index={index}
          enableClick={true}
          hiddenContent={hiddenContents[index] as any}
          revealed={revealed.has(index)}
          revealCell={revealCell}
        />
      ))}
    </Container>
  );
}
