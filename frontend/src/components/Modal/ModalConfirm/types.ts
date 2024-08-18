export type ModalProps = {
  isModalActive: boolean;
  handleCancel: () => void;
  handleClose: () => void;
  handleSubmit?: () => void;
  title?: string;
  message?: string;
  loadingMessage?: string;
};
