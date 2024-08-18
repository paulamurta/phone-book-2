import { AxiosResponse } from "axios";
import api from "./Api";

export async function whoAmI(): Promise<AxiosResponse> {
  return await api.get(`/users/whoami`);
}
