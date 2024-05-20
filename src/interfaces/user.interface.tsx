export interface UserI {
  id: string;
  email: string;
  username: string;
  displayName: string;
  password: string;
  activationKey: string;
  userStatus: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserPayloadI {
  email: string;
  username: string;
  displayName: string;
}

export interface UserFormI {
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
}

export interface PasswordPayloadI {
  newPassword: string;
  oldPassword: string;
}

export interface PasswordFormI {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
