import { AxiosResponse } from "axios";
import { IContactCreate, IContactEdit } from "../interfaces/IContact";
import api from "./Api";

export async function getAllContacts(): Promise<AxiosResponse> {
  return await api.get("/contacts");
}

export async function getAllContactsSearch(
  searchParam: string,
): Promise<AxiosResponse> {
  return await api.get(`/contacts/lastname/${searchParam}`);
}

export async function createContact(
  payload: IContactCreate,
): Promise<AxiosResponse> {
  return await api.post(`/contacts`, payload);
}

export async function getContactById(
  id: string | undefined,
): Promise<AxiosResponse> {
  return await api.get(`/contacts/${id}`);
}

export async function editContact(
  id: string | undefined,
  payload: IContactEdit,
): Promise<AxiosResponse> {
  return await api.put(`/contacts/${id}`, payload);
}
