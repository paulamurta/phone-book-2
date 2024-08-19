import toast from "react-hot-toast";
import { useState, FormEvent, useEffect } from "react";
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
import { EditContactModalProps } from "./types";
import { useQuery } from "react-query";
import { ButtonCancel } from "../../../components/Button/ButtonCancel";
import { WrapperModal } from "../../../styles/common/Modal/styles";
import { DefaultModal } from "../../../components/Modal/DefaultModal";
import {
  editContact,
  getContactById,
} from "../../../services/contacts.service";
import {
  formatFromFormToPayload,
  formatToSlashStyle,
} from "../../../common/utils/format/formatDate";
import DateRangePicker from "../../../components/DateRangePicker";
import { AddPhoto } from "../../../components/AddPhoto";
import { ISelectCurrentValue } from "../../../components/Select/types";
import { Select } from "../../../components/Select";
import { useFetchGroups } from "../../../hooks/useFetchGroups";

export function EditContact({
  isEditContactOpen,
  keyId,
  setKeyId,
  closeEditContact,
}: EditContactModalProps) {
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [group, setGroup] = useState<ISelectCurrentValue | null>(null);
  const [phone, setPhone] = useState<string>("");
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [photo, setPhoto] = useState<File | string>("");
  const [photoPath, setPhotoPath] = useState<string>("");
  const [hasImgChanged, setHasImgChanged] = useState<boolean>(false);
  const [acceptedFileSize, setAcceptedFileSize] = useState(true);
  const [acceptedFileType, setAcceptedFileType] = useState(true);
  const { groups } = useFetchGroups();

  const { data } = useQuery(
    ["keyId", keyId],
    () => {
      return getContactById(keyId);
    },
    {
      onSuccess: (dataOnSuccess) => {
        setFirstName(dataOnSuccess?.data.firstName);
        setLastName(dataOnSuccess?.data.lastName);
        setEmail(dataOnSuccess?.data.email);
        setPhone(dataOnSuccess?.data.phoneNumber);
        setBirthday(dataOnSuccess?.data.birthday);
        if (dataOnSuccess?.data.groupId) {
          setGroup({
            id: dataOnSuccess?.data.groupId,
            value: dataOnSuccess?.data.name,
          });
        }

        if (
          dataOnSuccess?.data.photo &&
          dataOnSuccess?.data.photo.photoData?.data
        ) {
          const byteArray = new Uint8Array(
            dataOnSuccess.data.photo.photoData.data,
          );
          const base64String = btoa(
            byteArray.reduce(
              (data, byte) => data + String.fromCharCode(byte),
              "",
            ),
          );
          const photoUrl = `data:${dataOnSuccess.data.photo.mimeType};base64,${base64String}`;
          setPhoto(photoUrl);
        } else {
          setPhoto("");
        }
      },
      enabled: !!keyId,
    },
  );

  // useEffect(() => {
  //   console.log(" photo => " + photo);
  // }, []);

  const isThereANewFirstName = firstName !== data?.data.firstName;
  const isThereANewLastName = lastName !== data?.data.lastName;
  const isThereANewPhone = phone !== data?.data.phoneNumber;
  const isThereANewEmail = email !== data?.data.email;
  const isThereANewGroup = group?.id !== data?.data.groupId;
  const isThereANewBirthday = birthday !== data?.data.birthday;
  const firstPhoto = !data?.data.photo && !!photoPath;
  const hadPhotoButDeleted = !!data?.data.photo && hasImgChanged;

  const isFormValid =
    acceptedFileSize &&
    acceptedFileType &&
    (firstPhoto ||
      hadPhotoButDeleted ||
      isThereANewFirstName ||
      isThereANewLastName ||
      (isThereANewPhone && phone.length === 10) ||
      isThereANewEmail ||
      isThereANewGroup ||
      isThereANewBirthday);

  function handleCancelModal() {
    setIsModalConfirmOpen(false);
  }

  function handleCloseModal() {
    setKeyId("");
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
    closeEditContact();
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

    if (!!photo) {
      formData.append("photo", photo);
    }

    await editContact(keyId, formData)
      .then(async () => {
        toast.success("Contact updated successfully!");
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
        title="Cancel Edit Contact?"
        message="You are leaving Edit Contact."
      />
      <DefaultModal
        isOpen={isEditContactOpen}
        onClose={onTryToClose}
        width={"50vw"}
      >
        <WrapperModal>
          <Header4>Edit Contact</Header4>
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
              setHasImgChanged={setHasImgChanged}
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
