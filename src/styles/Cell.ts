import styled, { keyframes } from "styled-components";

interface Props {
  cellSize: string;
  enableClick: boolean;
  cellContent: string | undefined;
}

// animação de aparecimento (pop)
const pop = keyframes`
  0% {
    transform: scale(0.6);
    opacity: 0;
  }
  70% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const Container = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.cellSize};
  height: ${(props) => props.cellSize};
  border-radius: 4px;
  margin: 2px;
  background-color: ${(props) =>
    props.cellContent === "flag" ? "#f2a917" : "#2779c6"};

  cursor: ${(props) => (props.enableClick ? "pointer" : "default")};

  &:hover {
    background-color: ${(props) =>
      props.enableClick
        ? "#3d98ed"
        : props.cellContent === "flag"
        ? "#f2a917"
        : "#2779c6"};
  }

  .cellContent {
    width: ${(props) =>
      props.cellContent === "flag" || props.cellContent === "mine"
        ? "70%"
        : "80%"};
    height: ${(props) =>
      props.cellContent === "flag" || props.cellContent === "mine"
        ? "70%"
        : "80%"};

    &.enter {
      animation: ${pop} 0.4s ease-out;
    }

    &.exit {
      opacity: 0;
      transition: opacity 0.4s ease; // esmaece sem alterar tamanho
    }
  }
`;
