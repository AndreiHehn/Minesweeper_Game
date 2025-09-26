import styled from "styled-components";

export const Container = styled.section`
  width: 500px;
  .pageTitle {
    margin-top: 5px;
    font-size: 20px;
    font-weight: 800;
    color: var(--text-primary);
  }
  .sectionLine {
    width: 100%;
    height: 0;
    border: none;
    border-top: 1px solid var(--app-color);
    margin-top: 20px;
  }
  .pageInfo {
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;

    .pageText {
      width: 100%;
      font-size: 16px;
      color: var(--text-primary);
      font-weight: 400;
      text-align: justify;
      margin-right: 10px;
    }
  }
`;
