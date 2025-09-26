import styled from "styled-components";

export const Container = styled.div`
  width: auto;
  height: 250px;
  position: relative;
  .charts {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .chart {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 170px;

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

  .chart-info {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .no-matches {
    font-size: 16px;
    font-weight: 500;
    color: var(--text-primary);
    margin: 30px 0;
  }

  .reset-stats {
    display: flex;
    justify-content: end;
    position: absolute;
    right: 0;
    bottom: 0;
  }
`;
