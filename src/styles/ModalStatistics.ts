import styled from "styled-components";

export const Container = styled.div`
  width: auto;
  height: fit-content;
  .charts {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .chart {
    display: flex;
    flex-direction: column;
    align-items: center;

    .chartTitle {
      font-size: 16px;
      color: var(--text-primary);
      margin-bottom: -4px;
    }

    .chartBest {
      font-size: 12px;
      font-weight: 400;
      color: var(--text-primary);
      margin-top: 4px;
    }
  }
`;
