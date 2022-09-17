import styled from "styled-components";

export const Card = styled.div`
  width: 100%;
  padding: 1em 0;
`;

export const CardHeader = styled.div`
  width: 100%;
  border-left: 2px solid green;
  display: flex;
  gap: 0.5em;
  align-items: center;
`;

export const Day = styled.h4`
  font-size: 1.8em;
  padding: 0.2em;
`;

export const MonthYear = styled.div`
  display: flex;
  align-item: center;
  flex-direction: column;
  span {
    text-transform: capitalize;
  }
`;
