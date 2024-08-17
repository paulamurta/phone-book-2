import ReactDOM from "react-dom";
import { ModalProps } from "./types";
import { Body3, Header4 } from "../../../styles/typography";
import { Button, WrapperConfirm, WrapperText } from "./styles";
import { useTheme } from "styled-components";
import { OverlayModal, SmallButtonsBox } from "../../../styles/global";

export const ModalConfirm = ({
  isModalActive,
  handleCancel,
  handleClose,
  handleSubmit,
  title,
  message,
  loadingMessage,
  isLoading,
}: ModalProps) => {
  const modalRoot = document.getElementById("modal") as HTMLElement;
  const { colors: theme } = useTheme();

  if (!isModalActive) {
    return null;
  }

  return ReactDOM.createPortal(
    <OverlayModal>
      <WrapperConfirm>
        <WrapperText>
          {title && <Header4>{title}</Header4>}
          {message && <Body3>{message}</Body3>}
        </WrapperText>
        <SmallButtonsBox>
          <Button
            $fontColor={theme.danger.main}
            $hovercolor={theme.background.mediumGray}
            onClick={() => (handleSubmit ? handleSubmit() : handleClose())}
          >
            {isLoading ? loadingMessage : "Yes"}
          </Button>
          <Button
            $fontColor={theme.primary.main}
            $hovercolor={theme.background.mediumGray}
            onClick={handleCancel}
          >
            No
          </Button>
        </SmallButtonsBox>
      </WrapperConfirm>
    </OverlayModal>,
    modalRoot,
  );
};
