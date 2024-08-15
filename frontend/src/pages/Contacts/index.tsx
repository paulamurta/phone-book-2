import { useEffect, useState } from "react";
import { Search } from "../../components/Input/Search";
import { ContainerRow, LogoBox } from "../../styles/global";
import { Header3, Header1 } from "../../styles/typography";
import { Background, Content, List } from "./styles";
import { motion } from "framer-motion";
import { BiSolidContact } from "react-icons/bi";
import { useTheme } from "styled-components";
import { useQuery } from "react-query";
import { api } from "../../api/api";
import { IContact } from "../../interfaces/IContact";
import { Card } from "../../components/Card";
import { ModalNewContact } from "./ModalNew";
import { ButtonConfirm } from "../../components/Button/ButtonConfirm";
import { ModalEditContact } from "./ModalEdit";
import { ModalDeleteContact } from "./ModalDelete";

const Contacts = () => {
  const { colors: theme } = useTheme();
  const [searchParam, setSearchParam] = useState("");
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [modalNewContact, setModalNewContact] = useState(false);
  const [modalEditContact, setModalEditContact] = useState(false);
  const [modalDeleteContact, setModalDeleteContact] = useState(false);
  const [id, setId] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

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
        setContacts(dataOnSuccess?.data);
      },

      keepPreviousData: true,
      staleTime: 2000,
    },
  );

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
        <Background>
          <Content>
            <LogoBox>
              <BiSolidContact />
              <Header1 fontcolor={theme.typography.body}>Phone Book App</Header1>
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
};

export default Contacts;
