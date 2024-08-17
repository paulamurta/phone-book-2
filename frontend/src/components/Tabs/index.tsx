import { Wrapper, TabBtn, Divider } from "./styles";
import { TabsProps } from "./types";

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
      <Divider />
      <TabBtn
        $position={"right"}
        $selected={favorites}
        onClick={() => setFavorites(true)}
      >
        Favorites
      </TabBtn>
    </Wrapper>
  );
}
