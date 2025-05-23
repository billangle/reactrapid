

export interface AuthUser {
  isLoggedIn: boolean;
  accessToken: string;
  idToken: string;
  username: string;
  givenName: string;
  familyName: string;
  name: string;
  email: string;
  phoneNumber: string;
  profile: string;
  isGovtEmployee: boolean; // This flag can impact the user roles
  isSuperUser: boolean;
  street1: string;
  street2: string;
  city: string;
  state: string;
  zip: string;
  apt: string;
  middlename: string;
  prefix: string;
  suffix: string;
  challengeQuestion: string;
  challengeAnswer: string;
  confirmEmail: string;

}


