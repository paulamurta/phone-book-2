import styled from "styled-components";

export type IFavorite = {
  $favorite: boolean;
};

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
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

export const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1vw;
`;

export const UserPhotoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5vh;
  width: 5vh;
  border-radius: 50vw !important;
  background-color: ${({ theme }) => theme.colors.background.deepGray};
  color: ${({ theme }) => theme.colors.background.white};

  p {
    font-size: clamp(2vh, 0.3rem + 1.5vh, 3vh);
    font-family: "Inter 400";
    text-transform: capitalize;
  }
`;

export const UserPhoto = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 50vw;
  object-fit: cover;
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
