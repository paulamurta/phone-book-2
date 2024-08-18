import toast from "react-hot-toast";
import { useTheme } from "styled-components";
import { DefaultModal } from "../../components/Modal/DefaultModal";
import { ISelectCurrentValue } from "../../components/Select/types";
import { useState } from "react";
import { ManageGroupsProps } from "./types";
import { Body1, Body2, Body3, Header4 } from "../../styles/typography";
import { GroupCard } from "./Components/GroupCard";
import { ModalConfirm } from "./../../components/Modal/ModalConfirm/index";
import { CardsContainer } from "./Components/GroupCard/styles";
import { ButtonConfirm } from "../../components/Button/ButtonConfirm";
import { NewGroup } from "./NewGroup/index";
import { ContainerColumn, ContainerRow } from "../../styles/global";
import { WrapperGroups } from "./styles";

export function ManageGroups({
  isManageGroupsOpen,
  closeManageGroups,
}: ManageGroupsProps) {
  const { colors: theme } = useTheme();
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [isNewGroupOpen, setIsNewGroupOpen] = useState(false);
  const [group, setGroup] = useState<ISelectCurrentValue | null>(null);
  // const { groupList } = useFetchPlants();
  const groupList = [
    {
      id: 1,
      value: "Work",
    },
    {
      id: 2,
      value: "School",
    },
    {
      id: 3,
      value: "Gym",
    },
    {
      id: 4,
      value: "Church",
    },
  ];

  function onTryToClose() {
    setIsModalConfirmOpen(true);
  }

  function handleCloseModal() {
    closeManageGroups();
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
        title="Cancel Manage groups?"
        message="You are leaving Manage groups."
      />

      <NewGroup
        isNewGroupOpen={isNewGroupOpen}
        closeNewGroup={() => setIsNewGroupOpen(false)}
      />
      <DefaultModal
        isOpen={isManageGroupsOpen}
        onClose={onTryToClose}
        closeButton
      >
        <WrapperGroups>
          <Header4 $align={"start"} $bold>
            Manage groups
          </Header4>
          <ButtonConfirm
            onClick={() => setIsNewGroupOpen(true)}
            width={"10vw"}
            label={"+ Add group"}
          />
          <CardsContainer>
            {groupList.map((group) => (
              <GroupCard key={group.id} id={group.id} name={group.value} />
            ))}
          </CardsContainer>
        </WrapperGroups>
      </DefaultModal>
    </>
  );
}
