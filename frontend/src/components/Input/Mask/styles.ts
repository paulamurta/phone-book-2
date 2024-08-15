import styled from "styled-components";
import InputMask from "react-input-mask";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  background-color: transparent;
  text-align: left;
  gap: 1vh;
`;

export const StyledInputMask = styled(InputMask)`
  width: ${({ width }) => (width ? width : "100%")};
  height: ${({ height }) => (height ? height : "5vh")};
  font-size: clamp(0.2rem, 0.17rem + 1.8vh, 3rem);
  font-family: "Inter 400";
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  padding: 0.5vw 1vw;
  transition: color 0.3s ease-in-out;

  &::placeholder {
    color: ${({ theme }) => theme.colors.light.main};
    font-size: clamp(0.2rem, 0.17rem + 1.8vh, 3rem);
    font-family: "Inter 400";
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.light.light};
    color: ${({ theme }) => theme.colors.typography.body};
  }
`;
