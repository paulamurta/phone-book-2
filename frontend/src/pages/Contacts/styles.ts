import styled from "styled-components";
import { theme } from "../../styles/themes/theme";

export const Background = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 100%;
  padding: 3vw;
  background-color: ${theme.colors.background.white};
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100vw;
  height: 7vh;
  gap: 2vh;
  padding-right: 1vw;
  background-color: ${theme.colors.background.deepGray};
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;

export const SignOutButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${theme.colors.background.mediumGray};
  height: 3vh;
  width: 3vh;

  svg {
    height: 100%;
    width: 100%;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 70%;
  height: 100%;
  padding: 2vw;
  gap: 2.5vh;
  background-color: ${theme.colors.background.mediumGray};
  border-radius: 3vh;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0;
  gap: 1.2px;
  border-radius: 8px;
  background-color: ${theme.colors.border.main};
  border: 1.5px solid ${({ theme }) => theme.colors.border.main};

  :first-child {
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
  }
  :last-child {
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }
`;

export const AvatarContainer = styled.div`
  height: 4.5vh;
  width: 4.5vh;
  border-radius: 50%;
  background-color: ${theme.colors.light.light};
  display: flex;
  justify-content: center;
  align-items: center;
`;
