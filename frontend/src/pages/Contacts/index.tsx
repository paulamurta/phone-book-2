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
import { useNavigate } from "react-router-dom";
import { Tabs } from "../../components/Tabs";
import { NewContact } from "./NewContact";
import { EditContact } from "./EditContact";
import { DeleteContact } from "./DeleteContact";
import {
  getAllContacts,
  getAllContactsSearch,
} from "../../services/contacts.service";
import { Filter } from "../../components/Filter";
import { ISelectCurrentValue } from "../../components/Select/types";
import { ManageGroups } from "../Groups";

function Contacts() {
  const { colors: theme } = useTheme();
  const [searchParam, setSearchParam] = useState("");
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [isManageGroupsOpen, setIsManageGroupsOpen] = useState(false);
  const [isNewContactOpen, setIsNewContactOpen] = useState(false);
  const [isEditContactOpen, setIsEditContactOpen] = useState(false);
  const [isDeleteContactOpen, setIsDeleteContactOpen] = useState(false);
  const [id, setId] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [favorites, setFavorites] = useState<boolean>(false);
  const [group, setGroup] = useState<ISelectCurrentValue | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();

  const { refetch } = useQuery(
    ["contacts", searchParam, group],
    () => {
      if (searchParam.length === 0) {
        return getAllContacts();
      }
      if (searchParam.length > 0) {
        return getAllContactsSearch(searchParam);
      }
    },
    {
      onSuccess: (dataOnSuccess) => {
        setContacts(dataOnSuccess?.data);
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

  return (
    <>
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
            <Body3 $fontColor={theme.typography.white}>John Snow</Body3>
            <Small $bold $fontColor={theme.typography.white}>
              john@snow.com
            </Small>
          </UserInfo>
          <AvatarContainer>
            <Body1 $fontColor={theme.typography.darkGray}>J</Body1>
          </AvatarContainer>
          <SignOutButton onClick={() => navigate("/home")}>
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
                <Tabs favorites={favorites} setFavorites={setFavorites} />
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
                  firstName={contact.firstName}
                  lastName={contact.lastName}
                  phone={contact.phone}
                  setModalEditContact={setIsEditContactOpen}
                  modalEditContact={isEditContactOpen}
                  setModalDeleteContact={setIsDeleteContactOpen}
                  modalDeleteContact={isDeleteContactOpen}
                  setId={setId}
                  setFirstName={setFirstName}
                  setLastName={setLastName}
                  id={contact.id}
                  favorite={false}
                  setFavorite={() => {}}
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
