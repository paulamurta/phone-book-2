import { useState } from "react";
import { Search } from "../../components/Input/Search";
import { ContainerRow, LogoBox } from "../../styles/global";
import { Header3, Header1, Body3, Small, Body1 } from "../../styles/typography";
import {
  AvatarContainer,
  Background,
  Content,
  Header,
  List,
  SignOutButton,
  UserInfo,
} from "./styles";
import { motion } from "framer-motion";
import { BiSolidContact } from "react-icons/bi";
import { useTheme } from "styled-components";
import { useQuery } from "react-query";
import { IContact } from "../../interfaces/IContact";
import { Card } from "../../components/Card";
import { ButtonConfirm } from "../../components/Button/ButtonConfirm";
import { SignOut } from "@phosphor-icons/react";
import { Tabs } from "../../components/Tabs";
import { NewContact } from "./NewContact";
import { EditContact } from "./EditContact";
import { DeleteContact } from "./DeleteContact";
import { getAllContacts } from "../../services/contacts.service";
import { Filter } from "../../components/Filter";
import { ISelectCurrentValue } from "../../components/Select/types";
import { ManageGroups } from "../Groups";
import { useAuthGlobal } from "../../contexts/AuthContext/useAuthGlobal";
import { ModalConfirm } from "../../components/Modal/ModalConfirm";

function Contacts() {
  const { colors: theme } = useTheme();
  const [searchParam, setSearchParam] = useState("");
  const [contacts, setContacts] = useState<IContact[]>([]);

  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [isManageGroupsOpen, setIsManageGroupsOpen] = useState(false);
  const [isNewContactOpen, setIsNewContactOpen] = useState(false);
  const [isEditContactOpen, setIsEditContactOpen] = useState(false);
  const [isDeleteContactOpen, setIsDeleteContactOpen] = useState(false);
  const [id, setId] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [isFavoriteTabOn, setIsFavoriteTabOn] = useState<boolean>(false);
  const [group, setGroup] = useState<ISelectCurrentValue | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { logout, name, email } = useAuthGlobal();

  const { refetch } = useQuery(
    ["contacts", searchParam, group?.id, isFavoriteTabOn],
    () => {
      return getAllContacts(searchParam, isFavoriteTabOn, group?.id);
    },
    {
      onSuccess: (dataOnSuccess) => {
        const processedContacts = dataOnSuccess?.data.map(
          (contact: IContact) => {
            if (contact.photo && contact.photo.photoData?.data) {
              const byteArray = new Uint8Array(contact.photo.photoData.data);

              const base64String = btoa(
                byteArray.reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  "",
                ),
              );
              contact.photoUrl = `data:${contact.photo.mimeType};base64,${base64String}`;
            } else {
              contact.photoUrl = null;
            }
            return contact;
          },
        );

        setContacts(processedContacts);
      },
    },
  );

  const handleOpenFilter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setAnchorEl(null);
    setIsFilterOpen(false);
  };

  function handleCloseModal() {
    setIsModalConfirmOpen(false);
    logout && logout();
  }

  return (
    <>
      <ModalConfirm
        isModalActive={isModalConfirmOpen}
        setIsModalActive={setIsModalConfirmOpen}
        handleCancel={() => setIsModalConfirmOpen(false)}
        handleClose={handleCloseModal}
        title="Logout?"
        message="You are leaving this session."
      />
      <ManageGroups
        isManageGroupsOpen={isManageGroupsOpen}
        closeManageGroups={() => {
          refetch();
          setIsManageGroupsOpen(false);
        }}
      />
      <NewContact
        isNewContactOpen={isNewContactOpen}
        closeNewContact={() => {
          refetch();
          setIsNewContactOpen(false);
        }}
      />
      <EditContact
        keyId={id}
        setKeyId={setId}
        isEditContactOpen={isEditContactOpen}
        closeEditContact={() => {
          refetch();
          setIsEditContactOpen(false);
        }}
      />
      <DeleteContact
        keyId={id}
        isDeleteContactOpen={isDeleteContactOpen}
        firstName={firstName}
        lastName={lastName}
        closeDeleteContact={() => {
          refetch();
          setIsDeleteContactOpen(false);
        }}
      />

      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "-100%" }}
        transition={{ duration: 1 }}
      >
        <Header>
          <UserInfo>
            <Body3 $fontColor={theme.typography.white}>{name}</Body3>
            <Small $bold $fontColor={theme.typography.white}>
              {email}
            </Small>
          </UserInfo>
          <AvatarContainer>
            <Body1 $fontColor={theme.typography.darkGray}>
              {name?.split("")[0]}
            </Body1>
          </AvatarContainer>
          <SignOutButton onClick={() => setIsModalConfirmOpen(true)}>
            <SignOut weight={"bold"} />
          </SignOutButton>
        </Header>
        <Background>
          <Content>
            <LogoBox>
              <BiSolidContact />
              <Header1 $fontColor={theme.typography.body}>
                Phone Book App
              </Header1>
            </LogoBox>

            <ContainerRow>
              <Header3>Contacts</Header3>

              <ButtonConfirm
                onClick={() => setIsNewContactOpen(true)}
                width={"14vw"}
                label={"+ Add Contact"}
              />
            </ContainerRow>
            <ContainerRow>
              <ContainerRow $width={"auto"}>
                <Tabs
                  favorites={isFavoriteTabOn}
                  setFavorites={setIsFavoriteTabOn}
                />
                <Filter
                  setGroup={setGroup}
                  width="17vw"
                  refetch={refetch}
                  isFilterOpen={isFilterOpen}
                  anchorEl={anchorEl}
                  handleOpenFilter={handleOpenFilter}
                  handleCloseFilter={handleCloseFilter}
                />
              </ContainerRow>

              <ButtonConfirm
                onClick={() => setIsManageGroupsOpen(true)}
                width={"14vw"}
                label={"Manage groups"}
              />
            </ContainerRow>

            <Search
              message={"Search for contact by name/last name..."}
              onSearch={(value) => {
                setSearchParam(value);
              }}
            />

            <List>
              {contacts.map((contact) => (
                <Card
                  key={contact.id}
                  id={contact.id}
                  setId={setId}
                  firstName={contact.firstName}
                  lastName={contact.lastName}
                  phone={contact.phoneNumber}
                  email={contact.email}
                  favorite={contact.favorite}
                  birthday={contact?.birthday || null}
                  groupName={contact?.group?.name}
                  photo={contact?.photoUrl || null}
                  setModalEditContact={setIsEditContactOpen}
                  modalEditContact={isEditContactOpen}
                  setModalDeleteContact={setIsDeleteContactOpen}
                  modalDeleteContact={isDeleteContactOpen}
                  setFirstName={setFirstName}
                  setLastName={setLastName}
                  refetch={refetch}
                />
              ))}
            </List>
          </Content>
        </Background>
      </motion.div>
    </>
  );
}

export default Contacts;
