import styled from "styled-components";
import { ButtonCancelProps } from "./types";

export const Button = styled.button<ButtonCancelProps>`
  width: ${({ width }) => (width ? width : "100%")};
  height: ${({ height }) => (height ? height : "5vh")};
  color: ${({ theme }) => theme.colors.primary.main};
  background-color: ${({ theme }) => theme.colors.background.white};
  border-radius: 8px;
  font-size: clamp(0.3rem, 0.4rem + 1.5vh, 1.8rem);
  white-space: nowrap;
  font-family: "Inter 600";
  border: 1px solid ${({ theme }) => theme.colors.primary.main};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.typography.blueGray};
    transition: background-color 0.3s ease-in-out;
  }
`;
