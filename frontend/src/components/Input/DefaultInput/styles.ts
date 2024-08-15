import styled from "styled-components";
import { IContainer } from "./types";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  background-color: transparent;
  text-align: left;
  gap: 1vh;
`;

export const InputContainer = styled.div<IContainer>`
  width: ${({ width }) => (width ? width : "100%")};
  height: ${({ height }) => (height ? height : "5vh")};
  display: flex;
  padding: 0.5vw 1vw;
  border-radius: 12px;
  outline: 1.5px solid ${({ theme }) => theme.colors.border.main};
  transition: all 0.2s ease-in;
  background-color: transparent;

  input::placeholder {
    color: ${({ theme }) => theme.colors.light.main};
    font-size: clamp(0.2rem, 0.17rem + 1.8vh, 3rem);
    font-family: "Inter 400";
  }

  & input {
    flex-grow: 1;
    border: none;
    height: 100%;
    color: ${({ theme }) => theme.colors.typography.body};
    font-size: clamp(0.2rem, 0.17rem + 1.8vh, 3rem);
    font-family: "Inter 400";
    background-color: transparent;
  }
`;
