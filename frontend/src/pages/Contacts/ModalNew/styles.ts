import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2vh;
  gap: 1vh;
  width: 100%;
  color: ${({ theme }) => theme.colors.typography.body};
  background-color: ${({ theme }) => theme.colors.warning.main};
  font-size: clamp(0.6rem, 0.5rem + 2.3vh, 1.8rem);
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.mediumGray};
    transition: background-color 0.3s ease-in-out;
  }
`;

export const WrapperModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4vh;
  padding: 2vw;
  background-color: ${({ theme }) => theme.colors.background.white};
  max-height: 60%;
  width: 50%;
  border-radius: 10px;
  box-shadow: 0px 1px 4px #00000029;

  svg {
    height: 30px;
    width: 30px;
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;
