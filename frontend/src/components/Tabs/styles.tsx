import styled from "styled-components";

interface IButton {
  $fontColor?: string;
  hovercolor?: string;
}

export const Wrapper = styled.div`
  width: auto;
  height: auto;
`;

export const Button = styled.button<IButton>`
  min-width: 4vw;
  height: 3vh;
  border-radius: 3px;
  padding: 0 2px;
  font-family: "Inter 600", sans-serif;
  font-size: clamp(0.3rem, 0.2rem + 1.3vh, 1.7rem);
  background-color: transparent;
  border: none;
  color: ${({ $fontColor }) => $fontColor};
  transition: background-color 0.2s ease-in;

  &:hover {
    background-color: ${({ hovercolor }) => hovercolor};
    transition: background-color 0.2s ease-in;
  }
`;
