import toast from "react-hot-toast";
import { DeleteGroupProps } from "./types";
import { Body3, Header4 } from "../../../styles/typography";
import { useTheme } from "styled-components";
import { DefaultModal } from "../../../components/Modal/DefaultModal";
import {
  SmallButton,
  SmallButtonsBox,
  WrapperText,
} from "../../../styles/common/Modal/styles";
import { FormEvent } from "react";
import { deleteGroup } from "../../../services/groups.service";

export function DeleteGroup({
  isDeleteGroupOpen,
  closeDeleteGroup,
  keyId,
}: DeleteGroupProps) {
  const { colors: theme } = useTheme();

  async function onSaveFields() {
    await deleteGroup(keyId)
      .then(async () => {
        toast.success("Group deleted successfully!");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message);
      });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await onSaveFields();
    closeDeleteGroup();
  }

  return (
    <DefaultModal
      isOpen={isDeleteGroupOpen}
      onClose={closeDeleteGroup}
      width={"30vw"}
    >
      <>
        <WrapperText>
          <Header4>Are you sure you want to delete this group?</Header4>
          <Body3>
            The contacts within this group will not be deleted, but they will be
            left ungrouped.
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
            onClick={closeDeleteGroup}
          >
            No
          </SmallButton>
        </SmallButtonsBox>
      </>
    </DefaultModal>
  );
}
