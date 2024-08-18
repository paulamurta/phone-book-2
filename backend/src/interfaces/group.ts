export interface IGroup {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
}

export interface IGroupCreateUpdate {
  name: string;
}
