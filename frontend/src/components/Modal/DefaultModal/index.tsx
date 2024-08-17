import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { X } from "@phosphor-icons/react";
import { useTheme } from "styled-components";
import {
  CloseBtn,
  MainBox,
  TitleBox,
} from "../../../styles/common/Modal/styles";
import { Header4 } from "../../../styles/typography";
import { DefaultModalProps } from "./types";

export function DefaultModal({
  isOpen,
  height,
  width,
  title,
  children,
  closeButton,
  onClose,
}: DefaultModalProps) {
  const { colors: theme } = useTheme();

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
        sx={{
          border: "none",
          backdropFilter: "blur(3px)",
          backgroundColor: "rgba(200, 200, 200, 0.497)",
        }}
      >
        <Box
          sx={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: width ? width : "auto",
            height: height ? height : "auto",
            bgcolor: theme.background.white,
            borderRadius: "2vh",
            boxShadow: 12,
            padding: "1.5vw 2vw",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          {closeButton && (
            <CloseBtn onClick={onClose}>
              <X />
            </CloseBtn>
          )}
          {title && (
            <TitleBox>
              <Header4 $bold>{title}</Header4>
            </TitleBox>
          )}
          <MainBox $hasTitle={!!title}>{children}</MainBox>
        </Box>
      </Modal>
    </div>
  );
}
