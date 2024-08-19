export type EditGroupProps = {
  isEditGroupOpen: boolean;
  closeEditGroup: () => void;
  keyId?: string;
  setKeyId: React.Dispatch<React.SetStateAction<string>>;
};
