import styled from "styled-components";
import { ButtonConfirmProps } from "./types";

export const Button = styled.button<ButtonConfirmProps>`
  width: ${({ width }) => (width ? width : "100%")};
  height: ${({ height }) => (height ? height : "5vh")};
  color: ${({ theme }) => theme.colors.typography.white};
  background-color: ${({ theme }) => theme.colors.primary.main};
  border-radius: 3vh;
  font-size: clamp(0.3rem, 0.4rem + 1.5vh, 1.8rem);
  white-space: nowrap;
  font-family: "Inter 600";
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.light};
    transition: background-color 0.3s ease-in-out;
  }
`;
