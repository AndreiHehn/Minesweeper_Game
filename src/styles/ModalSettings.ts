import styled from "styled-components";

export const Container = styled.div`
  .themeSelector {
    margin-top: 10px;
    gap: 10px;

    .themeText {
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
