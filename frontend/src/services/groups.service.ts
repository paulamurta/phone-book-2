import { AxiosResponse } from "axios";
import api from "./Api";
import { IGroupCreate, IGroupEdit } from "../interfaces/IGroup";

export async function getAllGroups(): Promise<AxiosResponse> {
  return await api.get("/groups");
}

export async function createGroup(
  payload: IGroupCreate,
): Promise<AxiosResponse> {
  return await api.post(`/groups`, payload);
}

export async function getGroupById(
  id: string | undefined,
): Promise<AxiosResponse> {
  return await api.get(`/groups/${id}`);
}

export async function editGroup(
  id: string | undefined,
  payload: IGroupEdit,
): Promise<AxiosResponse> {
  return await api.patch(`/groups/${id}`, payload);
}

export async function deleteGroup(
  id: string | undefined,
): Promise<AxiosResponse> {
  return await api.delete(`/groups/${id}`);
}
