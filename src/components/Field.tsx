import { useContext, useMemo } from "react";
import { Container } from "../styles/Field";
import Cell from "./Cell";
import { AppContext } from "../lib/context";

export default function Field() {
  const { fieldSize, selectedDifficulty } = useContext(AppContext);
  const { rows, cols } = fieldSize;

  // Quantidade de minas por dificuldade
  const minesCount = useMemo(() => {
    switch (selectedDifficulty) {
      case "Easy":
        return 10;
      case "Medium":
        return 40;
      case "Hard":
        return 99;
      default:
        return 10;
    }
  }, [selectedDifficulty]);

  // Gera posições únicas para as minas
  const minePositions = useMemo(() => {
    const positions: number[] = [];
    const totalCells = rows * cols;

    while (positions.length < minesCount) {
      const pos = Math.floor(Math.random() * totalCells);
      if (!positions.includes(pos)) {
        positions.push(pos);
      }
    }
    return positions;
  }, [rows, cols, minesCount]);

  return (
    <Container rows={rows} cols={cols}>
      {Array.from({ length: rows * cols }).map((_, index) => (
        <Cell
          key={index}
          enableClick={true}
          cellContent={minePositions.includes(index) ? "mine" : undefined}
        />
      ))}
    </Container>
  );
}
