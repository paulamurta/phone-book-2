import { AxiosResponse } from "axios";
import api from "./Api";

export async function getAllContacts(
  searchParam?: string,
  favorite?: boolean,
  groupId?: string,
) {
  const params = new URLSearchParams();
  if (searchParam && searchParam.length > 0)
    params.append("search", searchParam);
  if (groupId) params.append("groupId", groupId.toString());
  if (favorite) params.append("favorite", favorite.toString());

  return await api.get("/contacts", { params });
}

export async function createContact(payload: FormData): Promise<AxiosResponse> {
  return await api.post(`/contacts`, payload);
}

export async function editContact(
  id: string | undefined,
  payload: FormData,
): Promise<AxiosResponse> {
  return await api.patch(`/contacts/${id}`, payload);
}

export async function getContactById(
  id: string | undefined,
): Promise<AxiosResponse> {
  return await api.get(`/contacts/${id}`);
}

export async function deleteContact(
  id: string | undefined,
): Promise<AxiosResponse> {
  return await api.delete(`/contacts/${id}`);
}
