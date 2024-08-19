export type EditContactModalProps = {
  isEditContactOpen: boolean;
  keyId?: string;
  closeEditContact: () => void;
  setKeyId: React.Dispatch<React.SetStateAction<string>>;
};
