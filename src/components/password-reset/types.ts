export interface PasswordChangeFormDetails {
  currentPassword: string;
  newPassword1: string;
  newPassword2: string;
}

export interface PasswordChangeRequestPayload {
  newpassword: string;
}
