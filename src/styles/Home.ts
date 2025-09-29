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
    user-select: none;

    .app-title {
      display: flex;
      gap: 20px;

      @media (max-width: 700px) {
        flex-direction: column;
        align-items: center;
        gap: 0;
      }
    }

    h1 {
      font-size: 70px;
      font-family: Monoton;
      color: var(--text-primary);

      @media (max-width: 1150px) {
        font-size: 50px;
      }

      @media (max-width: 840px) {
        font-size: 40px;
      }

      @media (max-width: 510px) {
        font-size: 25px;
      }
    }

    .mineIcon {
      width: 100px;
      height: 100px;

      @media (max-width: 1150px) {
        width: 70px;
        height: 70px;
      }

      @media (max-width: 840px) {
        width: 60px;
        height: 60px;
      }

      @media (max-width: 420px) {
        width: 50px;
        height: 50px;
      }
    }
  }

  .subheader {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;

    .avatarContainer {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .avatar {
      width: 180px;
      height: 180px;
      border-radius: 50%;
      border: 4px solid var(--app-color);
      background-color: white;
      cursor: pointer;

      &:hover {
        transform: scale(1.05);
      }
    }

    .changeAvatarText {
      margin: 10px 0 20px;
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
      cursor: pointer;

      &:hover {
        transform: scale(1.1);
        color: var(--app-color);
      }
    }

    .welcomeText,
    .username {
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      font-size: 28px;
      font-weight: 600;
      color: var(--text-primary);
    }
    .username {
      font-weight: 700;
      color: var(--app-color);
    }
  }

  .home-buttons {
    display: flex;
    gap: 10px;
    height: 40px;

    @media (max-width: 600px) {
      flex-direction: column;
    }
  }
`;
