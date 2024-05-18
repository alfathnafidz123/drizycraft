export enum ManagementType {
  Admin = 'Admin',
  Collaborator = 'Collaborator',
}

export interface AuthorI {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  banner?: string;
  email: string;
  createdAt: string;
  updatedAt?: string;
  role: ManagementType;
}
