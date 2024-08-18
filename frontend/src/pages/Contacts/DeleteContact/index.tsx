import toast from "react-hot-toast";
import { ModalDeleteProps } from "./types";
import { Body3, Header4 } from "../../../styles/typography";
import { useTheme } from "styled-components";
import api from "../../../services/Api";
import { DefaultModal } from "../../../components/Modal/DefaultModal";
import {
  SmallButton,
  SmallButtonsBox,
  WrapperText,
} from "../../../styles/common/Modal/styles";
import { FormEvent } from "react";

export function DeleteContact({
  isDeleteContactOpen,
  closeDeleteContact,
  keyId,
  firstName,
  lastName,
}: ModalDeleteProps) {
  const { colors: theme } = useTheme();

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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await onSaveFields();
    closeDeleteContact();
  }

  return (
    <DefaultModal
      isOpen={isDeleteContactOpen}
      onClose={closeDeleteContact}
      width={"30vw"}
    >
      <>
        <WrapperText>
          <Header4>Are you sure you want to delete this contact?</Header4>
          <Body3>
            {firstName} {lastName}
          </Body3>
        </WrapperText>
        <SmallButtonsBox>
          <SmallButton
            $fontColor={theme.danger.main}
            $hovercolor={theme.background.mediumGray}
            onClick={(e) => handleSubmit(e)}
          >
            Yes
          </SmallButton>
          <SmallButton
            $fontColor={theme.primary.main}
            $hovercolor={theme.background.mediumGray}
            onClick={closeDeleteContact}
          >
            No
          </SmallButton>
        </SmallButtonsBox>
      </>
    </DefaultModal>
  );
}
