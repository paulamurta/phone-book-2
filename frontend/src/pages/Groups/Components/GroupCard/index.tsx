import { CustomTooltip } from "../../../../components/Tooltip";
import { ActionButon, ContainerRow } from "../../../../styles/global";
import { Body2 } from "../../../../styles/typography";
import { CardWrapper } from "./styles";
import { GroupCardProps } from "./types";
import {
  PencilSimpleLine as EditIcon,
  Trash as DeleteIcon,
} from "@phosphor-icons/react";

export function GroupCard({ name, id }: GroupCardProps) {
  return (
    <CardWrapper>
      <Body2>{name}</Body2>
      <ContainerRow $position="right" $width="auto">
        <CustomTooltip title={"Edit group name"} placement="bottom">
          <ActionButon
            action="edit"
            onClick={() => {
              // setModalEditContact(!modalEditContact);
              // setId(id);
            }}
          >
            <EditIcon />
          </ActionButon>
        </CustomTooltip>
        <CustomTooltip title={"Delete group"} placement="bottom">
          <ActionButon
            action="delete"
            onClick={() => {
              // setModalDeleteContact(!modalDeleteContact);
              // setId(id);
              // setFirstName(firstName);
              // setLastName(lastName);
            }}
          >
            <DeleteIcon />
          </ActionButon>
        </CustomTooltip>
      </ContainerRow>
    </CardWrapper>
  );
}
