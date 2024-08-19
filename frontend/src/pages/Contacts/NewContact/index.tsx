import toast from "react-hot-toast";
import { useState, FormEvent } from "react";
import { NewContactModalProps } from "./types";
import {
  ButtonsBox,
  ContainerColumn,
  ContainerRow,
  FormModal,
} from "../../../styles/global";
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
import {
  formatFromFormToPayload,
  formatToSlashStyle,
} from "../../../common/utils/format/formatDate";
import { AddPhoto } from "../../../components/AddPhoto";
import { Select } from "../../../components/Select";
import { ISelectCurrentValue } from "../../../components/Select/types";
import { useFetchGroups } from "../../../hooks/useFetchGroups";

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
  const [acceptedFileSize, setAcceptedFileSize] = useState(true);
  const [acceptedFileType, setAcceptedFileType] = useState(true);
  const [photo, setPhoto] = useState<File | string>("");
  const [group, setGroup] = useState<ISelectCurrentValue | null>(null);
  const [photoPath, setPhotoPath] = useState<string>("");

  const { groups } = useFetchGroups();

  const isFormValid =
    firstName &&
    lastName &&
    phone.length === 10 &&
    acceptedFileSize &&
    acceptedFileType;

  function handleCancelModal() {
    setIsModalConfirmOpen(false);
  }

  function handleCloseModal() {
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setGroup(null);
    setPhoto("");
    setPhotoPath("");
    setAcceptedFileSize(true);
    setAcceptedFileType(true);
    setBirthday(null);
    closeNewContact();
    setIsModalConfirmOpen(false);
  }

  function onTryToClose() {
    setIsModalConfirmOpen(true);
  }

  async function onSaveFields() {
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("phoneNumber", phone);

    if (group) {
      formData.append("groupId", group.id);
    }
    if (email) {
      formData.append("email", email);
    }

    if (birthday) {
      formData.append(
        "birthday",
        formatFromFormToPayload(formatToSlashStyle(birthday)),
      );
    }

    if (photo) {
      formData.append("photo", photo);
    }

    await createContact(formData)
      .then(async () => {
        toast.success("Contact created successfully!");
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
            <AddPhoto
              file={photo}
              setFile={(file) => {
                setPhoto(file);
              }}
              path={photoPath}
              setPath={setPhotoPath}
              acceptedFileSize={acceptedFileSize}
              setAcceptedFileSize={setAcceptedFileSize}
              acceptedFileType={acceptedFileType}
              setAcceptedFileType={setAcceptedFileType}
              defaultFileSize={1048576}
              fileType={[".png", ".jpg"]}
            />
            <ContainerRow>
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
            </ContainerRow>
            <ContainerRow>
              <DefaultInput
                key="E-mail"
                label={"E-mail"}
                value={email}
                placeholder={"mail@website.com"}
                onChange={(value) => {
                  setEmail(value);
                }}
              />
              <ContainerColumn $width={"20vw"} $position="top">
                <LabelText>Group</LabelText>
                <Select
                  required={true}
                  width="100%"
                  id="group"
                  placeholder="None"
                  key={"group"}
                  values={groups}
                  onChangeValue={(groupObject: ISelectCurrentValue | null) =>
                    setGroup(groupObject)
                  }
                  currentValue={group}
                  fullWidth
                />
              </ContainerColumn>
            </ContainerRow>

            <ContainerRow>
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
              <ContainerColumn $width="auto" $position="top">
                <LabelText>Birthday</LabelText>
                <DateRangePicker
                  isSingleDate
                  singleDate={birthday}
                  setSingleDate={setBirthday}
                />
              </ContainerColumn>
            </ContainerRow>

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
