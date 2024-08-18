export type ModalDeleteProps = {
  isDeleteContactOpen: boolean;
  closeDeleteContact: () => void;
  keyId?: string;
  firstName: string;
  lastName: string;
};
