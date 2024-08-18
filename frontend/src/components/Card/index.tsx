import { formatPhoneNumber } from "../../common/utils/format/formatPhoneNumber";
import { ContainerColumn, ContainerRow } from "../../styles/global";
import { Body1, Body4 } from "../../styles/typography";
import {
  ActionButon,
  Container,
  FavoriteButton,
  NameAndGroupContainer,
  DataContainer,
} from "./styles";
import { useTheme } from "styled-components";
import {
  PencilSimpleLine as EditIcon,
  Trash as DeleteIcon,
  Phone,
  Heart,
  EnvelopeSimple,
  Cake,
  Gift,
} from "@phosphor-icons/react";

import { CardProps } from "./types";
import { useState } from "react";
import { CustomTooltip } from "../Tooltip";

export function Card({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phone,
  setModalEditContact,
  modalEditContact,
  setModalDeleteContact,
  modalDeleteContact,
  setId,
  id,
}: // favorite,
// setFavorite,
CardProps) {
  const { colors: theme } = useTheme();
  const formattedPhone = formatPhoneNumber(phone);
  const [favorite, setFavorite] = useState<boolean>(false);
  return (
    <Container>
      <ContainerColumn>
        <NameAndGroupContainer>
          <ContainerRow $position="left">
            <Body1>
              {firstName} {lastName}
            </Body1>
            <CustomTooltip
              title={
                favorite
                  ? "Remove contact from favorites"
                  : "Set contact to favorite"
              }
              placement="bottom"
            >
              <FavoriteButton
                $favorite={favorite}
                onClick={() => {
                  setFavorite(!favorite);
                }}
              >
                {favorite ? (
                  <Heart weight="fill" />
                ) : (
                  <Heart weight="regular" />
                )}
              </FavoriteButton>
            </CustomTooltip>
          </ContainerRow>
          <Body4 $bold $fontColor={theme.typography.darkGray}>
            Group
          </Body4>
        </NameAndGroupContainer>
        <ContainerRow $position="left">
          <DataContainer>
            <Phone weight="fill" />
            <Body4 $fontColor={theme.typography.lightGray}>
              {formattedPhone}
            </Body4>
          </DataContainer>
          <DataContainer>
            <EnvelopeSimple weight="bold" />
            <Body4 $fontColor={theme.typography.lightGray}>who@email.com</Body4>
          </DataContainer>
        </ContainerRow>
      </ContainerColumn>
      <ContainerRow $position="right">
        <CustomTooltip
          title={`Today's ${firstName}'s birthday! `}
          placement="bottom"
        >
          <Gift className="birthday-icon" />
        </CustomTooltip>

        <CustomTooltip title={"Edit contact"} placement="bottom">
          <ActionButon
            action="edit"
            onClick={() => {
              setModalEditContact(!modalEditContact);
              setId(id);
            }}
          >
            <EditIcon />
          </ActionButon>
        </CustomTooltip>
        <CustomTooltip title={"Delete contact"} placement="bottom">
          <ActionButon
            action="delete"
            onClick={() => {
              setModalDeleteContact(!modalDeleteContact);
              setId(id);
              setFirstName(firstName);
              setLastName(lastName);
            }}
          >
            <DeleteIcon />
          </ActionButon>
        </CustomTooltip>
      </ContainerRow>
    </Container>
  );
}
