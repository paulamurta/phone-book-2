import { ModalProps } from "./types";
import { DefaultModal } from "../DefaultModal";
import { Body3, Header4 } from "../../../styles/typography";
import { Button, WrapperConfirm, WrapperText } from "./styles";
import { SmallButtonsBox } from "../../../styles/global";
import { useTheme } from "styled-components";

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
          <Button
            $fontColor={theme.danger.main}
            $hovercolor={theme.background.mediumGray}
            onClick={() => (handleSubmit ? handleSubmit() : handleClose())}
          >
            Yes
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
    </DefaultModal>
  );
}
