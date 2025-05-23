import { DateType } from '../../ui/date-input-field/DateInputField';

export type RegistrationForm = {
  ein: string;
  state: string;
};

export type proposalTopics = { unknown: any };

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

export interface RIUserDetails {
  riName: string;
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

export interface Contact {
  firstName: string;
  lastName: string;
  prefix?: string;
  suffix?: string;
  email?: string;
  phone?: string;
  confirmEmail?: string;
  phone2?: string;
  fax?: string;
  username?: string;
}

export type PersonalData = Address &
  Contact & {
    password: string;
    confirmPassword: string;
    sameASAddress: boolean;
    sameAsFirmAddress: boolean;
    challengeQuestion: string;
    challengeAnswer: string;
    pin: string;
    pinConfirm: string;
  };

export type FirmInfoData = Address &
  Contact & {
    cage?: number;
    duns?: number | string;
    firmName?: string;
    taxId?: string;
    uei?: string;
    website?: string;
    pin?: string;
    pinConfirm?: string;
    ein?: string;
  };

interface Agency {
  id: number;
  label: string;
  value: string;
}

export type AgencyNameType = Agency & {
  branches: Branch[];
};

export type AgencyAuditInformation = {
  auditedBefore: boolean | null;
  agencyName: string;
  agencyBranch?: string;
  address: {
    street: string;
    apt?: string;
    city: string;
    state: string;
    zip: string;
  };
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  accountingSystemApproved: boolean | null;
  accountingSystemApprovalDate?: DateType | null | string;
  rateAgreementNegotiated: boolean | null;
  rateAgreementNegotiatedDate?: DateType | null | string;
  overheadCostAuditPerformed: boolean | null;
  overheadAuditPerformanceDate?: DateType | null | string;
  costAuditPerformanceDate?: DateType | null | string;
  ratesUsedForThisProposal: boolean | null;
  otherRatesUsedExplanation?: string;
  file: IFile | null;
  lastSavedDate?: string;
};

export interface IFile {
  fileName: string;
  fileSize: string;
  lastSavedDate: string;
  uniqueName: string;
  bucketKey: string;
}

export interface Address {
  city: string | undefined;
  state: string | undefined;
  street?: string | undefined;
  street1?: string | undefined;
  zip: string | undefined;
  apt?: string | undefined;
}
export type AuditFormData = {
  formdata: AgencyAuditInformation;
  status: string;
  firm: {
    ein: number;
    firmName: string;
  };
  lastSavedDate: string;
};

export type Branch = Agency;
export const popperStates = {
  DUNS: false,
  CAGE: false,
  UEI: false,
  ZIP: false,
};
export type PopperKeys = keyof typeof popperStates;

export type PopperStates = Record<PopperKeys, boolean>;

export enum UserRole {
  GENERAL = 'general role',
}

export type FirmInfo = {
  cage: string;
  city: string;
  duns: string;
  ein: number;
  apt?: string;
  employeeCount: string;
  firmName: string;
  firmType: string;
  orgType: string;
  phone: string;
  phone2: string;
  pin: string;
  pinConfirm: string;
  state: string;
  street1: string;
  street2: string;
  uei: string;
  website: string;
  zip: string;
  hasAwardedProposal?: string;
};

export enum ActiveUserStatus {
  Active = 'Active',
}

export enum IsAdmin {
  Admin = 1,
}

export interface Proposal {
  TopicId: string;
  Topic: string;
  ProposalId: string;
  Proposal: string;
  Solicitation: string;
  SolicitationType: string;
  FirmEIN: string;
  FirmAdmin: string;
  Deadline: string;
  LastEdited: string;
  ProStatus: string;
  ProposalCreator?: string;
  ProposalCreatorFullName?: string;
}
export type login = {
  username: string;
  password: string;
};
export type PriorAwardAddenumForm = {
  firm: {
    ein: 0;
    firmName: string;
    hasAwards: string;
  };
  formdata: [
    {
      agency: string;
      program: string;
      phase: string;
      projectTitle: string;
      topic: string;
      awardDate: string;
      fundingContract: string;
    },
  ];
  lastSavedDate: string;
  status: string;
};
export type ContactsForm = {
  acnType: string;
  piType: string;
  boType: string;
};

export type lastSaveDate = {
  ein: 0;
  lastSavedDate: string;
};

export type FirmInformations = {
  firmName: string;
  ein: string;
  uei: string;
  street: string;
  street1?: string;
  apt?: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  phone2: string;
  website?: string;
  duns?: string;
  cage?: string;
  pin?: string;
  pinConfirm?: string;
};

export interface SBCFirmInfo {
  firmName: string;
  ein: string;
  uei: string;
  cage?: string;
  phone: string;
  phone2: string;
  street1?: string;
  street2?: string;
  city: string;
  state: string;
  zip: string;
  website?: string;
  status: string;
  lastSavedDate: string;
  pin?: string;
}

export enum RegistrationID {
  SBC = 'SBC',
  RI = 'RI',
}

export interface UserRegistrationPayload {
  username: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  prefix?: string;
  suffix?: string;
  phone: string;
  phone2?: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zip: string;
  website?: string;
  password: string;
  isActivated: 'Y' | 'N';
  isDeleted: 'Y' | 'N';
  UserType: 'USER';
  role: NewUserRole;
  riName: string;
  apt: string;
  firmEIN?: string;
}

export enum NewUserRole {
  ResearchInstitute = 'Research-Institute',
  Admins = 'Admins',
  Users = 'Users',
}
