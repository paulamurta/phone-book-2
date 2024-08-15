import toast from "react-hot-toast";
import ReactDOM from "react-dom";
import { ModalDeleteProps } from "./types";
import { useState, useEffect, FormEvent } from "react";
import { Body3, Header4 } from "../../../styles/typography";
import { Button, WrapperConfirm, WrapperText } from "./styles";
import { useTheme } from "styled-components";
import { OverlayModal, SmallButtonsBox } from "../../../styles/global";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api/api";

export function ModalDeleteContact({
  isModalActive,
  closeModal,
  keyId,
  firstName,
  lastName,
}: ModalDeleteProps) {
  const modalRoot = document.getElementById("modal") as HTMLElement;
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const { colors: theme } = useTheme();

  const navigate = useNavigate();

  function handleCloseModal() {
    closeModal();
    navigate("/contacts");
    setIsModalConfirmOpen(false);
  }

  async function onSaveFields() {
    await api
      .delete(`/contacts/${keyId}`)
      .then(async (res) => {
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
      <WrapperConfirm>
        <WrapperText>
          <Header4>Are you sure you want to delete this contact?</Header4>
          <Body3>
            {firstName} {lastName}
          </Body3>
        </WrapperText>
        <SmallButtonsBox>
          <Button
            fontcolor={theme.danger.main}
            hovercolor={theme.background.mediumGray}
            onClick={handleSubmit}
          >
            Yes
          </Button>
          <Button
            fontcolor={theme.typography.darkGray}
            hovercolor={theme.background.mediumGray}
            onClick={handleCloseModal}
          >
            No
          </Button>
        </SmallButtonsBox>
      </WrapperConfirm>
    </OverlayModal>,
    modalRoot,
  );
}
