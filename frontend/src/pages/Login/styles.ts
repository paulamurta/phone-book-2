import styled from "styled-components";
import backgroundImage from "../../assets/images/maxim-ilyahov-0aRycsfH57A-unsplash.jpg";

export const Background = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  width: 100vw;
  height: 100vh;
  position: relative;
  background: url(${backgroundImage}) no-repeat center center fixed;
  background-size: cover;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 0;
  }
`;

export const GlassHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0 2vw;
  gap: 3vw;
  width: 100%;
  height: 8%;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4.5px);
  -webkit-backdrop-filter: blur(6.3px);
  z-index: 1;
`;

export const HeaderButton = styled.button`
  color: ${({ theme }) => theme.colors.typography.white};
  font-size: clamp(0.1rem, 0.1rem + 1.8vh, 1.3rem);
  font-family: "Inter 600";
  cursor: pointer;
  background-color: transparent;

  &:hover {
    color: ${({ theme }) => theme.colors.typography.darkGray};
    transition: color 0.5s ease-in-out;
  }

  svg {
    height: clamp(0.3rem, 0.3rem + 2vh, 1.5rem);
    width: clamp(0.3rem, 0.3rem + 2vh, 1.5rem);
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 50%;
  height: 100%;
  gap: 6vh;
  padding-right: 5vw;
  z-index: 1;

  .logo-box {
    display: flex;
    flex-direction: column;
    gap: 10vh;
  }

  .login-box {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 3vh;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30vw;
  height: 50vh;
  background-color: ${({ theme }) => theme.colors.login.boxBg};
  border-radius: 2vh;
`;
