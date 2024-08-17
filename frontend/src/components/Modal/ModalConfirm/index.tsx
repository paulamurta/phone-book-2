import { ModalProps } from "./types";
import { DefaultModal } from "../DefaultModal";
import { Body1, Header3 } from "../../../styles/typography";
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
  children,
}: ModalProps) {
  const { colors: theme } = useTheme();

  return (
    <DefaultModal
      isOpen={isModalActive}
      onClose={handleClose}
      width={"25vw"}
      height={"57vh"}
    >
      <WrapperConfirm>
        <WrapperText>
          {title && <Header3>{title}</Header3>}
          {message && <Body1>{message}</Body1>}
        </WrapperText>
        {children ? (
          children
        ) : (
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
        )}
      </WrapperConfirm>
    </DefaultModal>
  );
}
