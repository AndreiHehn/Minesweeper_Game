import styled from "styled-components";

export const Container = styled.main`
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: var(--background-primary);
  overflow: hidden;

  .field {
    @media (max-width: 1100px) {
      overflow-x: auto;
    }
  }
`;
