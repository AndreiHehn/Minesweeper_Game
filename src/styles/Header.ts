import styled from "styled-components";

export const Container = styled.header`
  width: 100%;
  height: 60px;
  background-color: var(--app-color);
  display: flex;
  align-items: center;
  justify-content: start;
  user-select: none;

  button {
    position: absolute;
    right: 20px;
  }

  .userContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-right: 1px solid #f4f4f5;

    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 2px solid #f4f4f5;
      background-color: white;
      margin: 0 20px;
    }

    .username {
      color: var(--text-primary);
      font-size: 20px;
      margin-right: 20px;
    }
  }

  .difficultyContainer,
  .minesContainer {
    height: 50px;
    display: flex;
    align-items: center;
    border-right: 1px solid #f4f4f5;

    .difficulty,
    .mines {
      color: var(--text-primary);
      font-size: 20px;
      margin: 0 20px;
      font-weight: 400;

      .difficultyText,
      .minesText {
        font-weight: 700;
      }
    }
  }
`;
