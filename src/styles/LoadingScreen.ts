import styled from "styled-components";

export const Container = styled.main`
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: var(--background-primary);
  overflow: hidden;

  .loading {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .cells {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
  }

  .loadingText {
    color: var(--text-primary);
  }
`;
