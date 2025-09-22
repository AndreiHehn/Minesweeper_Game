import styled from "styled-components";

export const Container = styled.div`
  .match-duration {
    font-size: 16px;
    color: var(--text-primary);
    font-weight: 400;
    display: flex;
    justify-content: center;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  .duration {
    margin-left: 5px;
  }

  .chart {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }

  .chart-info {
    display: flex;
    flex-direction: column;
  }

  .matches-played,
  .matches-won,
  .matches-lost,
  .chart-data {
    font-size: 16px;
    color: var(--text-primary);
    font-weight: 400;
    width: 60px;
  }

  .chart-data {
    font-weight: 600;
  }

  #won {
    color: #29ba3c;
  }

  #lost {
    color: #cd2e2e;
  }

  .footer-buttons {
    display: flex;
    justify-content: space-between;
  }
`;
