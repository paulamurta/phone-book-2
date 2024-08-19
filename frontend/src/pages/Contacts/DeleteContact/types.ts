export type DeleteContactProps = {
  isDeleteContactOpen: boolean;
  closeDeleteContact: () => void;
  keyId?: string;
  firstName: string;
  lastName: string;
};
