import { AxiosResponse } from "axios";
import { api } from "../api/api";

export async function whoAmI(): Promise<AxiosResponse> {
  return await api.get(`/auth/whoami`);
}
