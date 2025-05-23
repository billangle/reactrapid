import React from "react";
import { PasswordChangeRequestPayload } from "./types";
import axios from "axios";
import { config } from "../../config/config";
import { getIdToken } from "../../utils/auth";

export function submitPasswordChangeRequest(
  newpassword: PasswordChangeRequestPayload,
  username: string,
  setSuccessfulPasswordChange: React.Dispatch<React.SetStateAction<boolean>>,
  setPasswordChangeError: React.Dispatch<
    React.SetStateAction<string | undefined>
  >,
  setSaving: any
) {
  setSaving(true);

  getIdToken().then((token) => {
    axios
      .put(
        `${config.API_BASE_URL}/rapid/change/password/${username}`,
        {
          newpassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log("Success:", res);
        setSaving(false);
        setSuccessfulPasswordChange(true);
        setPasswordChangeError("");
      })
      .catch((error) => {
        console.error("Error: ", error);
        setSaving(false);
        setSuccessfulPasswordChange(false);
        setPasswordChangeError(error.response?.data?.error);
      });
  });
}
