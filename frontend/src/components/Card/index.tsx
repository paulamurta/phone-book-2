import { formatPhoneNumber } from "../../common/utils/format/formatPhoneNumber";
import { ContainerColumn, ContainerRow } from "../../styles/global";
import { Body1, Body2 } from "../../styles/typography";
import { ActionButon, Container, PhoneContainer } from "./styles";
import { FaPhone } from "react-icons/fa6";
import { useTheme } from "styled-components";
import { FiEdit2 as EditIcon } from "react-icons/fi";
import { FiTrash2 as DeleteIcon } from "react-icons/fi";
import { CardProps } from "./types";

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
}: CardProps) {
  const { colors: theme } = useTheme();
  const formattedPhone = formatPhoneNumber(phone);
  return (
    <Container>
      <ContainerColumn>
        <Body1>
          {firstName} {lastName}
        </Body1>
        <PhoneContainer>
          <FaPhone />
          <Body2 $fontColor={theme.typography.lightGray}>
            {formattedPhone}
          </Body2>
        </PhoneContainer>
      </ContainerColumn>
      <ContainerRow position="right">
        <ActionButon
          action="edit"
          onClick={() => {
            setModalEditContact(!modalEditContact);
            setId(id);
          }}
        >
          <EditIcon />
        </ActionButon>
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
      </ContainerRow>
    </Container>
  );
}
