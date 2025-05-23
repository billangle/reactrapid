import { MODULE } from "../../../types/enums";
import { useLocation } from "react-router-dom";

export function useCurrentModule(): MODULE | null {
  const location = useLocation();
  let module: MODULE = MODULE.REPORT;

  if (location.pathname.indexOf("/report") > -1) {
    module = MODULE.REPORT;
  } else if (location.pathname.indexOf("/users") > -1) {
    module = MODULE.USERS;
  } else if (location.pathname.indexOf("/employmenthistory") > -1) {
    module = MODULE.EMPLOYMENTHISTORY;
  }

  return module;
}
