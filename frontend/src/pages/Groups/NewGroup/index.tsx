import { useState } from "react";
import { DefaultModal } from "../../../components/Modal/DefaultModal";
import { NewGroupProps } from "./types";
import { ModalConfirm } from "../../../components/Modal/ModalConfirm";
import { Header4 } from "../../../styles/typography";

export function NewGroup({ isNewGroupOpen, closeNewGroup }: NewGroupProps) {
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);

  function onTryToClose() {
    setIsModalConfirmOpen(true);
  }
  function handleCloseModal() {
    closeNewGroup();
    setIsModalConfirmOpen(false);
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
        title="Cancel Create group?"
        message="You are leaving Create group."
      />
      <DefaultModal isOpen={isNewGroupOpen} onClose={onTryToClose} closeButton>
        <>
          <Header4 $align={"start"} $bold>
            Create groups
          </Header4>
        </>
      </DefaultModal>
    </>
  );
}
