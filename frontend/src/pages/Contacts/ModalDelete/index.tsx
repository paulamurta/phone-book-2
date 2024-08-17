import toast from "react-hot-toast";
import ReactDOM from "react-dom";
import { ModalDeleteProps } from "./types";
import { Body3, Header4 } from "../../../styles/typography";
import { Button, WrapperDelete, WrapperText } from "./styles";
import { useTheme } from "styled-components";
import { OverlayModal, SmallButtonsBox } from "../../../styles/global";
import { useNavigate } from "react-router-dom";
import api from "../../../services/Api";

export function ModalDeleteContact({
  isModalActive,
  closeModal,
  keyId,
  firstName,
  lastName,
}: ModalDeleteProps) {
  const modalRoot = document.getElementById("modal") as HTMLElement;
  const { colors: theme } = useTheme();

  const navigate = useNavigate();

  function handleCloseModal() {
    closeModal();
    navigate("/contacts");
  }

  async function onSaveFields() {
    await api
      .delete(`/contacts/${keyId}`)
      .then(async () => {
        toast.success("User deleted successfully!");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message);
      });
  }

  async function handleSubmit() {
    try {
      onSaveFields();
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    } catch (error) {}
  }

  if (!isModalActive) {
    return null;
  }

  return ReactDOM.createPortal(
    <OverlayModal>
      <WrapperDelete>
        <WrapperText>
          <Header4>Are you sure you want to delete this contact?</Header4>
          <Body3>
            {firstName} {lastName}
          </Body3>
        </WrapperText>
        <SmallButtonsBox>
          <Button
            $fontColor={theme.danger.main}
            hovercolor={theme.background.mediumGray}
            onClick={handleSubmit}
          >
            Yes
          </Button>
          <Button
            $fontColor={theme.primary.main}
            hovercolor={theme.background.mediumGray}
            onClick={handleCloseModal}
          >
            No
          </Button>
        </SmallButtonsBox>
      </WrapperDelete>
    </OverlayModal>,
    modalRoot,
  );
}
