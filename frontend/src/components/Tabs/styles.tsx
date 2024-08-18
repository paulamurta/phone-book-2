import styled from "styled-components";

interface ITabBtn {
  $position: string;
  $selected: boolean;
}

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const TabBtn = styled.button<ITabBtn>`
  width: 7vw;
  height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4vw;

  border-top-right-radius: ${({ $position }) =>
    $position === "right" ? "1vh" : "0"};
  border-bottom-right-radius: ${({ $position }) =>
    $position === "right" ? "1vh" : "0"};
  border-top-left-radius: ${({ $position }) =>
    $position === "left" ? "1vh" : "0"};
  border-bottom-left-radius: ${({ $position }) =>
    $position === "left" ? "1vh" : "0"};
  font-family: "Inter 600", sans-serif;
  font-size: clamp(2vh, 0.5rem + 1.7vh, 1.8vh);
  background-color: ${({ $selected, theme }) =>
    $selected ? theme.colors.background.darkGray : "transparent"};
  border: 1.5px solid ${({ theme }) => theme.colors.border.main};
  font-family: "Inter 600", sans-serif;
  color: ${({ theme }) => theme.colors.typography.body};
  transition: background-color 0.2s ease-in;

  svg {
    height: 2.2vh;
    width: 2.2vh;
    color: ${({ theme }) => theme.colors.danger.main};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.gray};
    transition: background-color 0.2s ease-in;
  }
`;
