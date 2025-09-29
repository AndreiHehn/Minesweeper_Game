import styled from "styled-components";

export const Container = styled.header`
  width: 100%;
  height: 60px;
  background-color: var(--app-color);
  display: flex;
  align-items: center;
  justify-content: start;
  user-select: none;
  position: absolute;
  top: 0;

  button {
    position: absolute;
    right: 20px;
  }

  .homeIcon {
    position: absolute;
    right: 10px;
    width: 32px;
    height: 32px;

    path {
      fill: #f4f4f5;
    }
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

      @media (max-width: 810px) {
        width: 35px;
        height: 35px;
        margin: 0 10px;
      }
    }

    .username {
      color: #f4f4f5;
      font-size: 20px;
      margin-right: 20px;

      @media (max-width: 810px) {
        font-size: 14px;
        margin-right: 10px;
      }

      @media (max-width: 450px) {
        margin-left: 10px;
      }
    }
  }

  .difficultyContainer,
  .minesContainer,
  .timeContainer {
    height: 50px;
    display: flex;
    align-items: center;
    border-right: 1px solid #f4f4f5;

    .difficulty,
    .mines,
    .time {
      color: #f4f4f5;
      font-size: 20px;
      margin: 0 20px;
      font-weight: 400;
      display: flex;
      align-items: center;

      @media (max-width: 810px) {
        font-size: 14px;
        margin: 0 10px;
      }

      .difficultyText,
      .minesText,
      .timeText {
        font-weight: 700;
        margin-left: 8px;
      }

      .timeText,
      .difficultyText {
        @media (max-width: 500px) {
          margin-left: 0;
        }
      }

      .minesText {
        width: 24px;
      }

      .MineIcon,
      .TimeIcon {
        width: 32px;
        height: 32px;
        margin-right: 4px;

        path {
          fill: #f4f4f5;
        }
      }
    }
  }
`;
