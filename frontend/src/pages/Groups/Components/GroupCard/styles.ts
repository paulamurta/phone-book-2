import styled from "styled-components";

interface ITabBtn {
  $position: string;
  $selected: boolean;
}

export const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 45vw;
  gap: 1vh;
  max-height: 45vh;
  overflow-y: scroll;
`;

export const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.7vw;
  border-radius: 1vh;
  border: 1.5px solid ${({ theme }) => theme.colors.border.main};
  background-color: ${({ theme }) => theme.colors.background.mediumGray};
  cursor: pointer;

  &:hover {
    p {
      font-family: "Inter 600";
    }
  }
`;
