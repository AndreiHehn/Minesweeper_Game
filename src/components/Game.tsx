import { Container } from "../styles/Game";
import Field from "./Field";
import Header from "./Header";

interface GameProps {
  goToPage: () => void;
}

export default function Game({ goToPage }: GameProps) {
  return (
    <Container>
      <Header goToPage={goToPage}></Header>
      <Field></Field>
    </Container>
  );
}
