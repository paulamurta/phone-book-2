export interface IContact {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  birthday: string | null;
  favorite: boolean;
  groupId?: string | null;
  photo?: string | null;
}

export interface IContactCreate {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  photo?: string | File | null;
  birthday?: string | null;
}

export interface IContactEdit {
  firstName?: string;
  lastName?: string;
  favorite?: boolean;
  phone?: string;
}
