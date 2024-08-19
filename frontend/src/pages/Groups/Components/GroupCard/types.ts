export type GroupCardProps = {
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setIsEditGroupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleteGroupOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
