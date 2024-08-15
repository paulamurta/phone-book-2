import styled from "styled-components";

interface IButton {
  fontcolor?: string;
  hovercolor?: string;
}

export const Button = styled.button<IButton>`
  min-width: 4vw;
  height: 3vh;
  border-radius: 3px;
  padding: 0 2px;
  font-family: "Inter 600", sans-serif;
  font-size: clamp(0.3rem, 0.2rem + 1.3vh, 1.7rem);
  background-color: transparent;
  border: none;
  color: ${({ fontcolor }) => fontcolor};
  transition: background-color 0.2s ease-in;

  &:hover {
    background-color: ${({ hovercolor }) => hovercolor};
    transition: background-color 0.2s ease-in;
  }
`;

export const WrapperConfirm = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background.white};
  border-radius: 16px;
  min-height: 20%;
  max-width: 30%;
  box-shadow: 0px 3px 6px #00000029;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 2vw;
  gap: 2vh;
`;

export const WrapperText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 2vh;
  text-align: center;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
`;
