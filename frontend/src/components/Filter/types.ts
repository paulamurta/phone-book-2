import { ISelectCurrentValue } from "../Select/types";

export type FilterProps = {
  setGroup: React.Dispatch<React.SetStateAction<ISelectCurrentValue | null>>;
  width?: string;
  isFilterOpen: boolean;
  anchorEl: HTMLElement | null;
  refetch: any;
  handleOpenFilter: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseFilter: () => void;
};
