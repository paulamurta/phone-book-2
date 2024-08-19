export interface IContact {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  birthday: string | null;
  favorite: boolean;
  group?: { id: string; name: string } | null;
  photoUrl?: string | null;
  photo?: any;
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
