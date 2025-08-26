import { Container } from "../styles/Game";
import Header from "./Header";

interface GameProps {
  goToPage: () => void;
}

export default function Game({ goToPage }: GameProps) {
  return (
    <Container>
      <Header goToPage={goToPage}></Header>
    </Container>
  );
}
