import {
  faUserGroup,
  IconDefinition,
  faChartPie,
  faFingerprint,
} from "@fortawesome/free-solid-svg-icons";

import { MODULE, USER_ROLES } from "../../types/enums";

export interface NavItem {
  key: string;
  module: MODULE;
  url: string;
  label: string;
  icon: IconDefinition;
  roles: USER_ROLES[];
  isSelected: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  {
    key: "users",
    module: MODULE.USERS,
    url: "/users/dashboard",
    label: "Users",
    icon: faUserGroup,
    roles: [USER_ROLES.SUPERUSER, USER_ROLES.USER],
    isSelected: true,
  },
  {
    key: "report",
    module: MODULE.REPORT,
    url: "/report/dashboard",
    label: "Rpt",
    icon: faChartPie,
    roles: [USER_ROLES.SUPERUSER],
    isSelected: true,
  },
  {
    key: "employmenthistory",
    module: MODULE.EMPLOYMENTHISTORY,
    url: "/employmenthistory/dashboard",
    label: "Identity theft monitoring",
    roles: [USER_ROLES.USER],
    icon: faFingerprint,
    isSelected: true,
  },
];
