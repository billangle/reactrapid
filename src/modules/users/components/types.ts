export enum ActiveUserStatus {
  Active = "Active",
}

export enum IsAdmin {
  Admin = 1,
}

export type User = {
  UserType: string;
  UserName: string;
  FirmEIN: number;
  Activated: ActiveUserStatus;
  IsAdmin: IsAdmin;
  FirstName: string;
  LastName: string;
  email: string;
};

export interface UserDetails {
  username: string;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  prefix: string;
  suffix: string;
  phone: string;
  phone2: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  zip: string;
  website: string;
  password: string;
  isAdmin: string;
  isActivated: string;
  isDeleted: string;
  userType: string;
  firmEIN?: string;
  challengeQuestion: string;
  challengeAnswer: string;
  apt?: string;
  confirmEmail?: string;
  confirmPassword?: string;
}
