import styled, { css } from "styled-components";
import { ActionButtonProps } from "./types";

export type IFavorite = {
  $favorite: boolean;
};

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2vh;
  gap: 1vh;
  width: 100%;
  color: ${({ theme }) => theme.colors.typography.body};
  background-color: ${({ theme }) => theme.colors.background.white};
  font-size: clamp(0.6rem, 0.5rem + 2.3vh, 1.8rem);

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.mediumGray};
    transition: background-color 0.3s ease-in-out;
  }

  .birthday-icon {
    color: ${({ theme }) => theme.colors.danger.light};
    margin-right: 2vw;
  }
`;

export const NameAndGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.1vh;
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.3vw;
  color: ${({ theme }) => theme.colors.typography.lightGray};
  font-size: clamp(0.6rem, 0.5rem + 2.3vh, 1.8rem);

  svg {
    height: 2vh;
    width: 2vh;
  }
`;

export const FavoriteButton = styled.button<IFavorite>`
  display: flex;
  height: 3vh;
  width: 3vh;
  background-color: transparent;
  border: none;

  svg {
    height: 100%;
    width: 100%;
    color: ${({ $favorite, theme }) =>
      $favorite ? theme.colors.danger.main : theme.colors.border.main};

    &:hover {
      color: ${({ $favorite, theme }) =>
        $favorite ? theme.colors.danger.light : "pink"};
    }
  }
`;

export const ActionButon = styled.button<ActionButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3vw;
  height: 3vw;
  border-radius: 1vh;
  color: ${({ theme }) => theme.colors.typography.white};
  font-size: clamp(0.6rem, 0.5rem + 2.3vh, 1.8rem);
  ${(props) =>
    props.action === "delete"
      ? css`
          background-color: ${({ theme }) => theme.colors.danger.main};
        `
      : css`
          background-color: ${({ theme }) => theme.colors.success.main};
        `}

  &:hover {
    transition: background-color 0.5s ease-in-out;
    ${(props) =>
      props.action === "delete"
        ? css`
            background-color: ${({ theme }) => theme.colors.danger.light};
          `
        : css`
            background-color: ${({ theme }) => theme.colors.success.light};
          `}
  }

  svg {
    height: 50%;
    width: 50%;
  }
`;
