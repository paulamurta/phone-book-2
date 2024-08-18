import styled from "styled-components";
import { IContainer } from "../../../styles/types";

export const Container = styled.div<IContainer>`
  width: ${({ $size }) => ($size ? $size : "100%")};
  display: flex;
  height: 6vh;
  padding: 0.5vw 1vw;
  border-radius: 1vh;
  border: 1.5px solid ${({ theme }) => theme.colors.border.main};
  transition: all 0.2s ease-in;
  background-color: ${({ theme }) => theme.colors.background.white};

  &:hover {
    outline-width: 0.25vh;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  &:focus-within {
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
  }

  input::placeholder {
    color: ${({ theme }) => theme.colors.light.main};
    font-size: clamp(0.2rem, 0.17rem + 1.8vh, 3rem);
    font-family: "Inter 400";
  }

  & input {
    flex-grow: 1;
    border: none;
    height: 100%;
    margin-left: 0.8vw;
    color: ${({ theme }) => theme.colors.dark.light};
    font-size: clamp(0.2rem, 0.17rem + 1.8vh, 3rem);
    font-family: "Inter 400";
  }

  & button {
    background-color: transparent;
  }
`;

export const IconBox = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  svg {
    height: 100%;
    width: 1.5rem;
    color: ${({ theme }) => theme.colors.dark.light};
  }
`;
