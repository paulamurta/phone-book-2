import { Wrapper, TabBtn } from "./styles";
import { TabsProps } from "./types";
import { Heart } from "@phosphor-icons/react";

export function Tabs({ favorites, setFavorites }: TabsProps) {
  return (
    <Wrapper>
      <TabBtn
        $position={"left"}
        $selected={!favorites}
        onClick={() => setFavorites(false)}
      >
        All
      </TabBtn>
      <TabBtn
        $position={"right"}
        $selected={favorites}
        onClick={() => setFavorites(true)}
      >
        Favorites
        <Heart weight="fill" />
      </TabBtn>
    </Wrapper>
  );
}
