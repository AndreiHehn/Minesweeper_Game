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

  return (
    <Container rows={rows} cols={cols}>
      {Array.from({ length: rows * cols }).map((_, index) => (
        <Cell
          key={index}
          enableClick={true}
          hiddenContent={minePositions.includes(index) ? "mine" : undefined}
        />
      ))}
    </Container>
  );
}
