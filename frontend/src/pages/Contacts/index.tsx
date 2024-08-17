import { useEffect, useState } from "react";
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
import { ModalNewContact } from "./ModalNew";
import { ButtonConfirm } from "../../components/Button/ButtonConfirm";
import { ModalEditContact } from "./ModalEdit";
import { ModalDeleteContact } from "./ModalDelete";
import { SignOut } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import api from "../../services/Api";

function Contacts() {
  const { colors: theme } = useTheme();
  const [searchParam, setSearchParam] = useState("");
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [modalNewContact, setModalNewContact] = useState(false);
  const [modalEditContact, setModalEditContact] = useState(false);
  const [modalDeleteContact, setModalDeleteContact] = useState(false);
  const [id, setId] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const navigate = useNavigate();

  const { refetch } = useQuery(
    ["contacts", searchParam],
    () => {
      if (searchParam.length === 0) {
        return api.get("/contacts");
      }
      if (searchParam.length > 0) {
        return api.get(`/contacts/lastname/${searchParam}`);
      }
    },
    {
      onSuccess: (dataOnSuccess) => {
        console.log("dataOnSuccess: ", dataOnSuccess);
        setContacts(dataOnSuccess?.data);
      },

      keepPreviousData: true,
      staleTime: 2000,
    },
  );

  // const { refetch: refetchPendencies } = useQuery(
  //   ["pendencies", searchParam],
  //   () => getPendencies(searchParam),
  //   {
  //     onSuccess: (dataOnSuccess) => {
  //       if (dataOnSuccess) {
  //         const newData = dataOnSuccess?.data.map((item: any) => ({
  //           id: item.id,
  //           email: item.email,
  //           name: item.name,
  //           last_name: item.last_name,
  //           image: item.image ? item.image : null,
  //           profile: {
  //             identifier: item.user_profile[0].profiles.identifier,
  //             description: item.user_profile[0].profiles.description,
  //           },
  //           institution: item.institution ? item.institution : null,
  //         }));

  //         setListData(newData);
  //         setPendencies(newData.length);
  //       }
  //     },
  //     enabled: isChiefResearcher || isManager,
  //   },
  // );

  useEffect(() => {
    refetch();
  }, [searchParam, refetch]);

  return (
    <>
      <ModalNewContact
        isModalActive={modalNewContact}
        closeModal={() => {
          refetch();
          setModalNewContact(false);
        }}
      />
      <ModalEditContact
        keyId={id}
        isModalActive={modalEditContact}
        closeModal={() => {
          refetch();
          setModalEditContact(false);
        }}
      />
      <ModalDeleteContact
        firstName={firstName}
        lastName={lastName}
        keyId={id}
        isModalActive={modalDeleteContact}
        closeModal={() => {
          refetch();
          setModalDeleteContact(false);
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
                onClick={() => setModalNewContact(true)}
                width={"25%"}
                label={"+ Add Contact"}
              />
            </ContainerRow>

            <Search
              message={"Search for contact by last name..."}
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
                  setModalEditContact={setModalEditContact}
                  modalEditContact={modalEditContact}
                  setModalDeleteContact={setModalDeleteContact}
                  modalDeleteContact={modalDeleteContact}
                  setId={setId}
                  setFirstName={setFirstName}
                  setLastName={setLastName}
                  id={contact.id}
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
