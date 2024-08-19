import { motion } from "framer-motion";
import styled, { css } from "styled-components";

export const ContainerBox = styled.div`
  position: fixed;
  right: 0;
  z-index: 99999;
`;

export const Box = styled(motion.div)`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${theme.colors.toast.error.bg};
    opacity: 1;
    padding: 1vh 1vw;
    gap: 0.5vw;
    margin-top: 3vh;
    margin-right: 3vh;
    border: 2px solid ${theme.colors.toast.error.border};
    border-radius: 1vh;

    p {
      color: ${theme.colors.toast.error.text};
      font-family: "Inter 400", sans-serif;
      font-size: 0.85vw;
    }

    svg {
      height: 2.8vh;
      width: 2.8vh;
      fill: ${theme.colors.toast.error.icon};
    }

    &.toast-success {
      background-color: ${theme.colors.toast.success.bg};
      border: 2px solid ${theme.colors.toast.success.border};
      p {
        color: ${theme.colors.toast.success.text};
      }
      svg {
        fill: ${theme.colors.toast.success.icon};
      }
    }

    &.toast-info {
      background-color: ${theme.colors.toast.info.bg};
      border: 2px solid ${theme.colors.toast.info.border};
      p {
        color: ${theme.colors.toast.info.text};
      }
      svg {
        fill: ${theme.colors.toast.info.icon};
      }
    }
  `}
`;

export const BoxIcon = styled.div`
  display: flex;
  gap: 0.5rem;
`;
