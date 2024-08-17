import styled from "styled-components";

interface IMainBox {
  $hasTitle?: boolean;
}

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
