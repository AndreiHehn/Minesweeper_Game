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
    h1 {
      font-size: 70px;
      font-family: Monoton;
      color: var(--text-primary);
    }

    .mineIcon {
      width: 100px;
      height: 100px;
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
  }
`;
