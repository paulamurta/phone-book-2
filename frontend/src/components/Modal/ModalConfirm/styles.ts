import styled from "styled-components";

interface IButton {
  $fontColor?: string;
  $hovercolor?: string;
}

export const Button = styled.button<IButton>`
  min-width: 4vw;
  height: 4vh;
  border-radius: 3vh;
  font-family: "Inter 600", sans-serif;
  font-size: clamp(0.3rem, 0.2rem + 1.3vh, 1.7rem);
  background-color: transparent;
  border: 1px solid ${({ $fontColor }) => $fontColor};
  color: ${({ $fontColor }) => $fontColor};
  transition: background-color 0.2s ease-in;

  &:hover {
    background-color: ${({ $hovercolor }) => $hovercolor};
    transition: background-color 0.2s ease-in;
  }
`;

export const WrapperConfirm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  gap: 4vh;
`;

export const WrapperText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5vh;
  text-align: center;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
`;
