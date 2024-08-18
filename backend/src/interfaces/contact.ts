export interface IContact {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  favorite: boolean;
  createdAt: Date;
  updatedAt: Date;
  birthday: Date | null;
  email: string | null;
  ownerId: string;
  groupId: string | null;
}

export interface IContactPhoto {
  id: string;
  mimeType: string;
  photoData: Buffer;
  contactId: string;
}

export interface IContactCreate {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  birthday?: Date;
}

export interface IContactUpdate {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  favorite?: boolean;
  groupId?: string;
}

export interface IContactSearch {
  search?: string;
  favorite?: boolean;
  groupId?: string;
}
