import styled from "styled-components";

interface IMainBox {
  $hasTitle?: boolean;
}

interface ISmallButton {
  $fontColor?: string;
  $hovercolor?: string;
}

export const WrapperModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  gap: 4vh;
  height: 60vh;
  overflow-y: scroll;
  padding: 1vw;
`;

export const MainBox = styled.div<IMainBox>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 3vh;
  width: 100%;
  height: ${({ $hasTitle }) => ($hasTitle ? "85%" : "100%")};
`;

export const CloseBtn = styled.button`
  height: 2.3vh;
  width: 2.3vh;
  position: absolute;
  top: 3vh;
  right: 3vh;
  border: none;
  background-color: transparent;

  svg {
    color: ${({ theme }) => theme.colors.dark.light};
    height: 100%;
    width: 100%;
  }
`;

export const TitleBox = styled.div`
  height: 15%;
  width: 100%;
`;

export const SmallButtonsBox = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  justify-content: center;
  gap: 1vw;
`;

export const SmallButton = styled.button<ISmallButton>`
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

export const WrapperText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5vh;
  text-align: center;
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
