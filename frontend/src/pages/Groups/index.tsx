import { DefaultModal } from "../../components/Modal/DefaultModal";
import { ISelectCurrentValue } from "../../components/Select/types";
import { useState } from "react";
import { ManageGroupsProps } from "./types";
import { Header4 } from "../../styles/typography";
import { GroupCard } from "./Components/GroupCard";

import { CardsContainer } from "./Components/GroupCard/styles";
import { ButtonConfirm } from "../../components/Button/ButtonConfirm";
import { NewGroup } from "./NewGroup/index";
import { WrapperGroups } from "./styles";

export function ManageGroups({
  isManageGroupsOpen,
  closeManageGroups,
}: ManageGroupsProps) {
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

  return (
    <>
      <NewGroup
        isNewGroupOpen={isNewGroupOpen}
        closeNewGroup={() => setIsNewGroupOpen(false)}
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
            {groupList.map((group) => (
              <GroupCard key={group.id} id={group.id} name={group.value} />
            ))}
          </CardsContainer>
        </WrapperGroups>
      </DefaultModal>
    </>
  );
}
