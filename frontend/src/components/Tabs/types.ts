import { Dispatch, SetStateAction } from "react";

export type TabsProps = {
  favorites: boolean;
  setFavorites: Dispatch<SetStateAction<boolean>>;
};
