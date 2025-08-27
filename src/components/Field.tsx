/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useMemo } from "react";
import { Container } from "../styles/Field";
import Cell from "./Cell";
import { AppContext } from "../lib/context";

export default function Field() {
  const { fieldSize } = useContext(AppContext);
  const { rows, cols, mines } = fieldSize;

  // Gera posições únicas para as minas
  const minePositions = useMemo(() => {
    const positions: number[] = [];
    const totalCells = rows * cols;

    while (positions.length < mines) {
      const pos = Math.floor(Math.random() * totalCells);
      if (!positions.includes(pos)) {
        positions.push(pos);
      }
    }
    return positions;
  }, [rows, cols, mines]);

  // Calcula o conteúdo oculto (mina ou número)
  const hiddenContents = useMemo(() => {
    const totalCells = rows * cols;
    const contents: (string | undefined)[] = Array(totalCells).fill(undefined);

    const getIndex = (r: number, c: number) => r * cols + c;

    // Direções possíveis (8 vizinhos)
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

        if (minePositions.includes(index)) {
          contents[index] = "mine";
        } else {
          let count = 0;
          for (const [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
              const neighborIndex = getIndex(nr, nc);
              if (minePositions.includes(neighborIndex)) {
                count++;
              }
            }
          }
          if (count > 0) contents[index] = count.toString();
        }
      }
    }

    return contents;
  }, [rows, cols, minePositions]);

  return (
    <Container rows={rows} cols={cols}>
      {Array.from({ length: rows * cols }).map((_, index) => (
        <Cell
          key={index}
          enableClick={true}
          hiddenContent={hiddenContents[index] as any}
        />
      ))}
    </Container>
  );
}
