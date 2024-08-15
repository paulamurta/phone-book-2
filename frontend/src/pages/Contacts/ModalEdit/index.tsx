import toast from "react-hot-toast";
import ReactDOM from "react-dom";
import { api } from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { useState, FormEvent, useEffect } from "react";
import { ButtonsBox, FormModal, OverlayModal } from "../../../styles/global";
import { ModalConfirm } from "../../../components/Modal/ModalConfirm";
import { Header4 } from "../../../styles/typography";
import { ButtonConfirm } from "../../../components/Button/ButtonConfirm";
import { DefaultInput } from "../../../components/Input/DefaultInput";
import { MaskInput } from "../../../components/Input/Mask";
import { WrapperModal } from "./styles";
import { EditContactModalProps } from "./types";
import { useQuery } from "react-query";
import { ButtonCancel } from "../../../components/Button/ButtonCancel";

export function ModalEditContact({ isModalActive, closeModal, keyId }: EditContactModalProps) {
  const modalRoot = document.getElementById("modal") as HTMLElement;
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [id, setId] = useState<string | undefined>("");

  const navigate = useNavigate();

  const { data, refetch } = useQuery(
    ["keyId", id, isModalActive],
    () => {
      return api.get(`/contacts/${id}`);
    },
    {
      onSuccess: (dataOnSuccess) => {
        if (isModalActive) {
          setFirstName(dataOnSuccess?.data.firstName);
          setLastName(dataOnSuccess?.data.lastName);
          setPhone(dataOnSuccess?.data.phone);
        }
      },
      keepPreviousData: false,
    },
  );

  useEffect(() => {
    setId(keyId);
  }, [keyId]);

  const isThereANewFirstName = firstName !== data?.data.firstName;
  const isThereANewLastName = lastName !== data?.data.lastName;
  const isThereANewPhone = phone !== data?.data.phone;

  const isFormValid =
    isThereANewFirstName || isThereANewLastName || (isThereANewPhone && phone.length === 10);

  function handleCancelModal() {
    setIsModalConfirmOpen(false);
  }

  function handleCloseModal() {
    setFirstName("");
    setLastName("");
    setPhone("");
    closeModal();
    navigate("/contacts");
    setIsModalConfirmOpen(false);
  }

  async function onSaveFields() {
    const body = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
    };

    await api
      .put(`/contacts/${keyId}`, body)
      .then(async (res) => {
        toast.success("User updated successfully!");
        refetch();
      })
      .catch((error) => {
        toast.error(error.response?.data?.message);
      });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      onSaveFields();
      setTimeout(() => {
        handleCloseModal();
        refetch();
      }, 2000);
    } catch (error) {}
  }

  if (!isModalActive) {
    return null;
  }

  return ReactDOM.createPortal(
    <OverlayModal>
      <ModalConfirm
        isModalActive={isModalConfirmOpen}
        handleCancel={handleCancelModal}
        handleClose={handleCloseModal}
        title="Cancel Edit Contact?"
        message="You are leaving Edit Contact. Would you like to continue?"
      />
      <WrapperModal>
        <Header4>Edit Contact</Header4>
        <FormModal onSubmit={handleSubmit} noValidate autoComplete="off">
          <DefaultInput
            key="first-name"
            label={"First Name*"}
            placeholder={"Barbara"}
            value={firstName}
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

          <ButtonsBox>
            <ButtonConfirm label={"Save"} type="submit" disabled={!isFormValid} width="15vw" />
            <ButtonCancel
              label={"Cancel"}
              type="button"
              width="15vw"
              onClick={() => setIsModalConfirmOpen(true)}
            />
          </ButtonsBox>
        </FormModal>
      </WrapperModal>
    </OverlayModal>,
    modalRoot,
  );
}
