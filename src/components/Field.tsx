import { useContext } from "react";
import { Container } from "../styles/Field";
import Cell from "./Cell";
import { AppContext } from "../lib/context";

export default function Field() {
  const { fieldSize } = useContext(AppContext);
  const { rows, cols } = fieldSize;

  return (
    <Container rows={rows} cols={cols}>
      {Array.from({ length: rows * cols }).map((_, index) => (
        <Cell key={index} enableClick={true} />
      ))}
    </Container>
  );
}
