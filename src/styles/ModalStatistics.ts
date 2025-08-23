import styled from "styled-components";

export const Container = styled.div`
  width: fit-content;
  height: fit-content;
  .charts {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 20px;
  }

  .chart {
    display: flex;
    flex-direction: column;
    align-items: center;
    h2 {
      font-size: 16px;
      color: var(--text-primary);
      margin-bottom: -4px;
    }
  }
`;
