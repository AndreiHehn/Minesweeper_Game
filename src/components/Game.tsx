import { useContext } from "react";
import { Container } from "../styles/Game";
import Field from "./Field";
import Header from "./Header";
import { AppContext } from "../lib/context";

interface GameProps {
  goToPage: () => void;
}

export default function Game({ goToPage }: GameProps) {
  const { resetField } = useContext(AppContext);
  return (
    <Container>
      <Header goToPage={goToPage}></Header>
      <article className="field">
        <Field key={resetField}></Field>
      </article>
    </Container>
  );
}
