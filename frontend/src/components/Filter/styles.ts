import styled from "styled-components";

export const Container = styled.div`
  position: relative;
`;

interface IConfirmButton {
  $clear?: boolean;
}

interface IRow {
  $position?: string;
  $marginTop?: string;
}

export const ConfirmButton = styled.button<IConfirmButton>`
  display: flex;
  gap: 1vh;
  border: none;
  background-color: transparent;
  font-family: "Inter 600", sans-serif;
  font-size: clamp(1.2vh, 0.3rem + 1.3vh, 2.5vh);

  color: ${({ theme, $clear }) =>
    $clear ? theme.colors.danger.main : theme.colors.typography.darkGray};

  &:hover {
    color: ${({ $clear, theme }) => ($clear ? null : theme.colors.light.main)};
  }

  &:disabled {
    color: ${({ $clear, theme }) => ($clear ? null : theme.colors.light.main)};
  }
`;

export const FilterBtn = styled.button`
  position: relative;
  height: 5vh;
  outline: 1.5px solid ${({ theme }) => theme.colors.border.main};
  border-radius: 1vh;
  padding: 0 0.9vw;
  gap: 0.5vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  font-family: "Inter 600", sans-serif;
  color: ${({ theme }) => theme.colors.typography.body};
  font-size: clamp(2vh, 0.5rem + 1.7vh, 1.8vh);

  &:hover,
  &:active {
    background-color: ${({ theme }) => theme.colors.background.gray};
  }

  svg {
    height: 3.2vh;
    width: 3.2vh;
    color: ${({ theme }) => theme.colors.typography.body};
  }
`;

export const CountFilter = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.background.white};
  height: 1.5vw;
  width: 1.5vw;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Row = styled.div<IRow>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ $position }) => ($position ? $position : "center")};
  align-items: flex-end;
  gap: 1vw;
  width: 100%;
  margin-top: ${({ $marginTop }) => ($marginTop ? $marginTop : "")};
`;

export const FilterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 2vh;
  border-radius: 1vh;
  padding: 1vh 1vw;
  background-color: ${({ theme }) => theme.colors.background.white};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  z-index: 10;
  position: absolute;
  top: 7vh;
  box-shadow: 2px 2px 10px #2d2d2d29;
`;
