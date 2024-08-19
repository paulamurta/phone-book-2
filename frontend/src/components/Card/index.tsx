import { useTheme } from "styled-components";
import { Body1, Body4 } from "../../styles/typography";
import { CardProps } from "./types";
import { CustomTooltip } from "../Tooltip";
import { formatPhoneNumber } from "../../common/utils/format/formatPhoneNumber";
import {
  ActionButon,
  ContainerColumn,
  ContainerRow,
} from "../../styles/global";
import {
  Container,
  FavoriteButton,
  NameAndGroupContainer,
  DataContainer,
  UserPhotoBox,
  LeftWrapper,
  UserPhoto,
} from "./styles";
import {
  PencilSimpleLine as EditIcon,
  Trash as DeleteIcon,
  Phone,
  Heart,
  EnvelopeSimple,
  Gift,
} from "@phosphor-icons/react";
import { editContact } from "../../services/contacts.service";
import toast from "react-hot-toast";

export function Card({
  id,
  setId,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phone,
  email,
  photo,
  groupName,
  birthday,
  favorite,
  setModalEditContact,
  modalEditContact,
  setModalDeleteContact,
  modalDeleteContact,
  refetch,
}: CardProps) {
  const { colors: theme } = useTheme();
  const formattedPhone = phone && formatPhoneNumber(phone);
  const birthdayDate = birthday ? new Date(birthday) : null;
  const today = new Date();
  const isBirthdayToday =
    today.getUTCDate() === birthdayDate?.getUTCDate() &&
    today.getUTCMonth() === birthdayDate?.getUTCMonth();

  async function handleFavorite() {
    const formData = new FormData();
    formData.append("favorite", String(!favorite));

    await editContact(id, formData)
      .then(() => {
        favorite
          ? toast.success("Contact removed from favorites successfully!")
          : toast.success("Contact added to favorites successfully!");
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => refetch());
  }

  return (
    <Container>
      <LeftWrapper>
        <UserPhotoBox>
          {!!photo ? (
            <UserPhoto src={photo ?? undefined} />
          ) : (
            <p>{firstName?.split("")[0]}</p>
          )}
        </UserPhotoBox>
        <ContainerColumn $width="auto">
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
                <FavoriteButton $favorite={favorite} onClick={handleFavorite}>
                  {favorite ? (
                    <Heart weight="fill" />
                  ) : (
                    <Heart weight="regular" />
                  )}
                </FavoriteButton>
              </CustomTooltip>
            </ContainerRow>
            {groupName && (
              <Body4 $bold $fontColor={theme.typography.darkGray}>
                {groupName}
              </Body4>
            )}
          </NameAndGroupContainer>
          <ContainerRow $position="left">
            <DataContainer>
              <Phone weight="fill" />
              <Body4 $fontColor={theme.typography.lightGray}>
                {formattedPhone}
              </Body4>
            </DataContainer>
            {email && (
              <DataContainer>
                <EnvelopeSimple weight="bold" />
                <Body4 $fontColor={theme.typography.lightGray}>{email}</Body4>
              </DataContainer>
            )}
          </ContainerRow>
        </ContainerColumn>
      </LeftWrapper>
      <ContainerRow $position="right" $width="fit-content">
        {isBirthdayToday && (
          <CustomTooltip
            title={`Today's ${firstName}'s birthday! `}
            placement="bottom"
          >
            <Gift className="birthday-icon" />
          </CustomTooltip>
        )}

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
