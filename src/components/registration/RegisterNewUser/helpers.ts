
import {
  UserRegistrationPayload,
} from '../types';
import axios, { AxiosError } from 'axios';
import { config } from '../../../config/config';

import { STATES } from '../../../types/constants';

export const buildSBCFirmRegistrationLocalStorageKey = (
  ein: string | null,
): string => {
  if (!ein) return '';
  return `firmRegistrationData -> ${ein}`;
};

export const getStateName = (abbr: string): string => {
  const stateName = STATES.find((st) => st.value === abbr)?.label;
  if (!stateName) {
    console.error('invalid abbr provided');
    return '';
  }
  return stateName;
};
export const getStateAbbr = (label: string): string => {
  const stateAbbr = STATES.find((st) => st.label === label)?.value;
  if (!stateAbbr) {
    console.error('invalid abbr provided');
    return '';
  }
  return stateAbbr;
};



export function submitNewUser(
  data: UserRegistrationPayload,
  setSuccessfulRegistration: React.Dispatch<React.SetStateAction<boolean>>,
  setRegistrationError: React.Dispatch<
    React.SetStateAction<string | undefined>
  >,
  firmDataLocalStorageKey: string | undefined,
  setSaving: any,
) {

 console.log('submitNewUser',data);

  setSaving(true);
  axios
    .put(`${config.API_BASE_URL}/rapid/request/newuser`, {data})
    .then(() => {
      setSuccessfulRegistration(true);
      setRegistrationError('');
      if (firmDataLocalStorageKey) {
        localStorage.removeItem(firmDataLocalStorageKey);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setSaving(false);
    })
    .catch((error) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setSuccessfulRegistration(false);
      setSaving(false);
      if (error.response?.data?.error === 'username already exists') {
        setRegistrationError(
          'That username already exists. Please create a different username.',
        );
      } else if (error.response?.data?.error === 'email already exists') {
        setRegistrationError(
          'This email is already associated with an account. ',
        );
      }
    });
}
