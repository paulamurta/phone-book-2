import { useQuery } from "react-query";
import { useState } from "react";
import { IGroupList } from "../interfaces/IGroup";
import { getAllGroups } from "../services/groups.service";

export function useFetchGroups() {
  const [groups, setGroups] = useState<{ id: any; value: string }[]>([]);

  const { refetch } = useQuery(["groups"], () => getAllGroups(), {
    onSuccess: (dataOnSuccess) => {
      const mappedGroups = dataOnSuccess?.data.map((item: IGroupList) => ({
        id: item.id,
        value: item.name,
      }));

      setGroups(mappedGroups || null);
    },
  });

  return { groups, refetch };
}
