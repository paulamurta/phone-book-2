import toast from "react-hot-toast";
import { useState, FormEvent } from "react";
import { NewContactModalProps } from "./types";
import { ButtonsBox, ContainerColumn, FormModal } from "../../../styles/global";
import { ModalConfirm } from "../../../components/Modal/ModalConfirm";
import { Header4, LabelText } from "../../../styles/typography";
import { ButtonConfirm } from "../../../components/Button/ButtonConfirm";
import { DefaultInput } from "../../../components/Input/DefaultInput";
import { MaskInput } from "../../../components/Input/Mask";
import { ButtonCancel } from "../../../components/Button/ButtonCancel";
import { DefaultModal } from "../../../components/Modal/DefaultModal";
import { WrapperModal } from "../../../styles/common/Modal/styles";
import { createContact } from "../../../services/contacts.service";
import DateRangePicker from "../../../components/DateRangePicker";

export function NewContact({
  isNewContactOpen,
  closeNewContact,
}: NewContactModalProps) {
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [birthday, setBirthday] = useState<Date | null>(null);

  const isFormValid = firstName && lastName && phone.length === 10;

  function handleCancelModal() {
    setIsModalConfirmOpen(false);
  }

  function handleCloseModal() {
    setFirstName("");
    setLastName("");
    setPhone("");
    closeNewContact();
    setIsModalConfirmOpen(false);
  }

  function onTryToClose() {
    setIsModalConfirmOpen(true);
  }

  async function onSaveFields() {
    const payload = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
    };

    await createContact(payload)
      .then(async () => {
        toast.success("User created successfully!");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message);
      });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await onSaveFields();
    handleCloseModal();
  }

  return (
    <>
      <ModalConfirm
        isModalActive={isModalConfirmOpen}
        setIsModalActive={setIsModalConfirmOpen}
        handleCancel={handleCancelModal}
        handleClose={handleCloseModal}
        title="Cancel Register Contact?"
        message="You are leaving Register Contact."
      />
      <DefaultModal
        isOpen={isNewContactOpen}
        onClose={onTryToClose}
        width={"50vw"}
      >
        <WrapperModal>
          <Header4>Register Contact</Header4>
          <FormModal onSubmit={handleSubmit} noValidate autoComplete="off">
            <DefaultInput
              key="first-name"
              label={"First Name*"}
              value={firstName}
              placeholder={"Barbara"}
              onChange={(value) => {
                setFirstName(value);
              }}
            />
            <DefaultInput
              key="last-name"
              label={"Last Name*"}
              placeholder={"Smith"}
              value={lastName}
              onChange={(value) => {
                setLastName(value);
              }}
            />
            <MaskInput
              mask="999-999-9999"
              key="phone"
              value={phone}
              label={"Phone Number*"}
              placeholder={"000-000-0000"}
              message={"Phone Number must be exactly a 10-digit number"}
              onChange={(value) => {
                setPhone(value.replace(/-/g, ""));
              }}
            />
            <DefaultInput
              width="100%"
              key="E-mail"
              label={"E-mail"}
              value={email}
              placeholder={"mail@website.com"}
              onChange={(value) => {
                setEmail(value);
              }}
            />
            <ContainerColumn>
              <LabelText>Birthday</LabelText>
              <DateRangePicker
                isSingleDate
                singleDate={birthday}
                setSingleDate={setBirthday}
              />
            </ContainerColumn>

            <ButtonsBox>
              <ButtonConfirm
                label={"Save"}
                type="submit"
                disabled={!isFormValid}
                width="15vw"
              />
              <ButtonCancel
                label={"Cancel"}
                type="button"
                width="15vw"
                onClick={() => setIsModalConfirmOpen(true)}
              />
            </ButtonsBox>
          </FormModal>
        </WrapperModal>
      </DefaultModal>
    </>
  );
}
