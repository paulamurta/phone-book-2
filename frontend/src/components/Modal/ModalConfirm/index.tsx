import { ModalProps } from "./types";
import { DefaultModal } from "../DefaultModal";
import { Body3, Header4 } from "../../../styles/typography";
import { useTheme } from "styled-components";
import {
  SmallButton,
  SmallButtonsBox,
  WrapperText,
  WrapperConfirm,
} from "../../../styles/common/Modal/styles";

export function ModalConfirm({
  isModalActive,
  handleCancel,
  handleClose,
  handleSubmit,
  title,
  message,
}: ModalProps) {
  const { colors: theme } = useTheme();

  return (
    <DefaultModal isOpen={isModalActive} onClose={handleClose} width={"25vw"}>
      <WrapperConfirm>
        {title && <Header4>{title}</Header4>}
        <WrapperText>
          {message && <Body3>{message}</Body3>}
          <Body3>Would you like to continue?</Body3>
        </WrapperText>

        <SmallButtonsBox>
          <SmallButton
            $fontColor={theme.danger.main}
            $hovercolor={theme.background.mediumGray}
            onClick={() => (handleSubmit ? handleSubmit() : handleClose())}
          >
            Yes
          </SmallButton>
          <SmallButton
            $fontColor={theme.primary.main}
            $hovercolor={theme.background.mediumGray}
            onClick={handleCancel}
          >
            No
          </SmallButton>
        </SmallButtonsBox>
      </WrapperConfirm>
    </DefaultModal>
  );
}
