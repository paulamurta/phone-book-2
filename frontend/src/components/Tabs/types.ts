import { Dispatch, SetStateAction } from "react";

export interface TabsProps {
  favorites: boolean;
  setFavorites: Dispatch<SetStateAction<boolean>>;
}
