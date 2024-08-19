import { FormEvent, useState } from "react";
import { DefaultModal } from "../../../components/Modal/DefaultModal";
import { EditGroupProps } from "./types";
import { ModalConfirm } from "../../../components/Modal/ModalConfirm";
import { Header4 } from "../../../styles/typography";
import { ButtonsBox, FormModal } from "../../../styles/global";
import toast from "react-hot-toast";
import { editGroup, getGroupById } from "../../../services/groups.service";
import { DefaultInput } from "../../../components/Input/DefaultInput";
import { ButtonConfirm } from "../../../components/Button/ButtonConfirm";
import { ButtonCancel } from "../../../components/Button/ButtonCancel";
import { useQuery } from "react-query";

export function EditGroup({
  isEditGroupOpen,
  closeEditGroup,
  keyId,
  setKeyId,
}: EditGroupProps) {
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>("");

  const { data } = useQuery(
    ["keyId", keyId],

    () => {
      return getGroupById(keyId);
    },
    {
      onSuccess: (dataOnSuccess) => {
        setGroupName(dataOnSuccess?.data.name);
      },
      enabled: !!keyId,
    },
  );

  const nameChange = groupName !== data?.data.name;

  function onTryToClose() {
    setIsModalConfirmOpen(true);
  }

  function handleCloseModal() {
    setKeyId("");
    setGroupName("");
    closeEditGroup();
    setIsModalConfirmOpen(false);
  }

  async function onSaveFields() {
    const payload = {
      name: groupName,
    };

    await editGroup(keyId, payload)
      .then(async () => {
        toast.success("Group created successfully!");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message);
      });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await onSaveFields();
    handleCloseModal();
  }

  return (
    <>
      <ModalConfirm
        isModalActive={isModalConfirmOpen}
        setIsModalActive={setIsModalConfirmOpen}
        handleCancel={() => {
          setIsModalConfirmOpen(false);
        }}
        handleClose={handleCloseModal}
        title="Cancel Edit group?"
        message="You are leaving Edit group."
      />
      <DefaultModal isOpen={isEditGroupOpen} onClose={onTryToClose} closeButton>
        <>
          <Header4 $align={"start"} $bold>
            Edit group
          </Header4>
          <FormModal onSubmit={handleSubmit} noValidate autoComplete="off">
            <DefaultInput
              key="group-name"
              label={"Group Name*"}
              value={groupName}
              placeholder={"Work"}
              onChange={(value) => {
                setGroupName(value);
              }}
            />
            <ButtonsBox>
              <ButtonConfirm
                label={"Save"}
                type="submit"
                disabled={!groupName || !nameChange}
                width="15vw"
              />
              <ButtonCancel
                label={"Cancel"}
                type="button"
                width="15vw"
                onClick={() => setIsModalConfirmOpen(true)}
              />
            </ButtonsBox>
          </FormModal>
        </>
      </DefaultModal>
    </>
  );
}
