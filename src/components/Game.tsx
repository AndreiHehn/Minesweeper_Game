import { Button } from "../generic/Button";
import { Container } from "../styles/Game";

interface GameProps {
  goToPage: () => void;
}

export default function Game({ goToPage }: GameProps) {
  return (
    <Container>
      <Button color="blue" functionButton={goToPage}>
        Back to Menu
      </Button>
    </Container>
  );
}
