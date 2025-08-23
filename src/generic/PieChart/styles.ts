import styled from "styled-components";

export const Container = styled.div`
  .recharts-legend-wrapper {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 12px;
  }

  svg path:focus {
    outline: none;
  }

  .recharts-wrapper {
    path:focus {
      outline: none;
    }
  }

  .recharts-surface {
    width: fit-content;
    height: fit-content;
  }
`;
