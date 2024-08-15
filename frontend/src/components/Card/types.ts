import { Dispatch, SetStateAction } from "react";

export type ActionButtonProps = {
  action?: string;
};

export type CardProps = {
  id: string;
  setId: Dispatch<SetStateAction<string>>;
  firstName: string;
  setFirstName: Dispatch<SetStateAction<string>>;
  lastName: string;
  setLastName: Dispatch<SetStateAction<string>>;
  phone: string;
  modalEditContact: boolean;
  setModalEditContact: Dispatch<SetStateAction<boolean>>;
  modalDeleteContact: boolean;
  setModalDeleteContact: Dispatch<SetStateAction<boolean>>;
};
