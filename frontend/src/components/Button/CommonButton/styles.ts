import styled from "styled-components";

interface IButton {
  $width?: string;
  $color?: string;
}

export const Button = styled.button<IButton>`
  width: ${({ $width }) => ($width ? $width : "fit-content")};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5vw;
  padding: 1vw;
  display: flex;
  color: ${({ $color, theme }) =>
    $color ? $color : theme.colors.typography.white};
  background-color: transparent;
  border-radius: 30px;
  font-size: clamp(0.1rem, 0.1rem + 1.8vh, 1.3rem);
  cursor: pointer;
  border: 1px solid
    ${({ theme, $color }) => ($color ? $color : theme.colors.typography.white)};

  &:hover {
    background-color: ${({ theme }) => theme.colors.typography.white};
    color: ${({ theme }) => theme.colors.typography.body};
    transition: background-color 0.5s ease-in-out;
  }

  svg {
    height: clamp(0.1rem, 0.1rem + 1.8vh, 1.3rem);
    width: clamp(0.1rem, 0.1rem + 1.8 vh, 1.3rem);
  }
`;
