import styled from "styled-components";

export const Container = styled.div`
  .sectionSeparator {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
  }
  .locationText {
    font-size: 14px;
    font-weight: 700;
    white-space: nowrap;
    color: var(--text-primary);
  }

  .sectionLine {
    width: 100%;
    height: 0;
    border: none;
    border-top: 1px solid var(--app-color);
  }
  .languageAndTheme {
    margin-top: 20px;
  }
  .languageSelector {
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 10px;

    .languageText {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
    }
  }
  .themeSelector,
  .difficultySelector {
    margin-top: 10px;
    gap: 10px;

    .themeText,
    .difficultyText {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 10px;
      color: var(--text-primary);
    }

    .radioButtons {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
  }

  .footer-buttons {
    display: flex;
    margin-top: 20px;
    gap: 10px;
    justify-content: flex-end;
  }
`;
