import styled from "styled-components";

interface Props {
  rows: number;
  cols: number;
}

export const Container = styled.div<Props>`
  display: grid;
  grid-template-rows: repeat(${(props) => props.rows}, 1fr);
  grid-template-columns: repeat(${(props) => props.cols}, 1fr);
  background-color: #1e3a5f;
  border-radius: 4px;
  margin-top: 40px;
  padding: 4px;
`;
