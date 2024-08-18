import { Dispatch, SetStateAction } from "react";

export type ModalProps = {
  isModalActive: boolean;
  setIsModalActive: Dispatch<SetStateAction<boolean>>;
  handleCancel: () => void;
  handleClose: () => void;
  handleSubmit?: () => void;
  title?: string;
  message?: string;
  loadingMessage?: string;
};
