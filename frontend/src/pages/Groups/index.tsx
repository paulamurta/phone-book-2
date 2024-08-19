import { DefaultModal } from "../../components/Modal/DefaultModal";
import { useState } from "react";
import { ManageGroupsProps } from "./types";
import { Header4 } from "../../styles/typography";
import { GroupCard } from "./Components/GroupCard";

import { CardsContainer } from "./Components/GroupCard/styles";
import { ButtonConfirm } from "../../components/Button/ButtonConfirm";
import { NewGroup } from "./NewGroup/index";
import { WrapperGroups } from "./styles";
import { EditGroup } from "./EditGroup";
import { DeleteGroup } from "./DeleteGroup";
import { useFetchGroups } from "../../hooks/useFetchGroups";

export function ManageGroups({
  isManageGroupsOpen,
  closeManageGroups,
}: ManageGroupsProps) {
  const [isNewGroupOpen, setIsNewGroupOpen] = useState(false);
  const [isDeleteGroupOpen, setIsDeleteGroupOpen] = useState(false);
  const [isEditGroupOpen, setIsEditGroupOpen] = useState(false);
  const [id, setId] = useState<string>("");
  const { groups, refetch } = useFetchGroups();

  return (
    <>
      <DeleteGroup
        keyId={id}
        isDeleteGroupOpen={isDeleteGroupOpen}
        closeDeleteGroup={() => {
          setIsDeleteGroupOpen(false);
          refetch();
        }}
      />
      <NewGroup
        isNewGroupOpen={isNewGroupOpen}
        closeNewGroup={() => {
          setIsNewGroupOpen(false);
          refetch();
        }}
      />
      <EditGroup
        keyId={id}
        setKeyId={setId}
        isEditGroupOpen={isEditGroupOpen}
        closeEditGroup={() => {
          setIsEditGroupOpen(false);
          refetch();
        }}
      />
      <DefaultModal
        isOpen={isManageGroupsOpen}
        onClose={closeManageGroups}
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
            {groups?.map((group) => (
              <GroupCard
                key={group.id}
                id={group.id}
                setId={setId}
                name={group.value}
                setIsEditGroupOpen={setIsEditGroupOpen}
                setIsDeleteGroupOpen={setIsDeleteGroupOpen}
              />
            ))}
          </CardsContainer>
        </WrapperGroups>
      </DefaultModal>
    </>
  );
}
