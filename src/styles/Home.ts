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

  .app-header {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 20px;
    gap: 20px;
    h1 {
      font-size: 70px;
      font-family: Monoton;
      color: var(--text-primary);
    }

    .bombIcon {
      width: 50px;
      height: 50px;

      path {
        fill: var(--text-secondary);
      }
    }
  }

  .home-buttons {
    display: flex;
    gap: 10px;
    height: 40px;
  }
`;
