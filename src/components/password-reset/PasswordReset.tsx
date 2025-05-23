import { useState, useId } from "react";
import { Button } from "@trussworks/react-uswds";
import classes from "./PasswordReset.module.scss";
import { useForm, FormProvider } from "react-hook-form";
import Input from "../../ui/input/Input";
import Card from "../../ui/card/Card";
import { submitPasswordChangeRequest } from "./helpers";
import { PasswordChangeFormDetails } from "./types";

type Props = { username: string };

function PasswordReset(props: Props) {
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  const methods = useForm<
    PasswordChangeFormDetails | Partial<PasswordChangeFormDetails>
  >({
    defaultValues: { currentPassword: "", newPassword1: "", newPassword2: "" },
  });

  const currentPasswordId = useId();
  const newPassword1Id = useId();
  const newPassword2Id = useId();

  const [isSaving, setSaving] = useState<boolean>(false);

  const [passwordChangeError, setPasswordChangeError] = useState<string>();
  const [successfulPasswordChange, setSuccessfulPasswordChange] =
    useState<boolean>(false);

  const password = methods.watch("newPassword1");

  function submitForm(formData: any) {
    submitPasswordChangeRequest(
      formData.newPassword1,
      props.username,
      setSuccessfulPasswordChange,
      setPasswordChangeError,
      setSaving
    );
  }

  function clearForm() {
    setPasswordChangeError("");
    setSuccessfulPasswordChange(false);
    methods.setValue("currentPassword", "");
    methods.setValue("newPassword1", "");
    methods.setValue("newPassword2", "");
  }

  function validatePass(val: string): boolean | string {
    return (
      /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(
        val
      ) || "Password should match the below requirements."
    );
  }

  function validateConfirmPass(val: string) {
    if (!password && !val) {
      return false;
    }
    return (
      password === val ||
      "This password doesn't match. Please confirm and re-enter the information."
    );
  }

  function confirmPasswordValidationCheck(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    const val = (e.target as HTMLInputElement).value;
  }

  let passwordDialogue;

  if (isSaving) {
    passwordDialogue = <>Changing password.</>;
  } else if (successfulPasswordChange) {
    passwordDialogue = (
      <>
        Password changed successfully!
        <Button
          type="button"
          className={classes.cancel}
          onClick={() => {
            clearForm();
          }}
        >
          Try Again
        </Button>
      </>
    );
  } else if (passwordChangeError && passwordChangeError.length > 0) {
    passwordDialogue = (
      <>
        There was an error changing your password. {passwordChangeError}
        <Button
          type="button"
          className={classes.cancel}
          onClick={() => {
            clearForm();
          }}
        >
          Try Again
        </Button>
      </>
    );
  } else if (!showPasswordReset) {
    passwordDialogue = (
      <Button
        type="button"
        className={classes.cancel}
        onClick={() => setShowPasswordReset(true)}
      >
        Reset Password
      </Button>
    );
  } else {
    passwordDialogue = (
      <FormProvider {...methods}>
        <form>
          <Card customClass={classes["action-btns"]}>
            <div className={classes.row}>
              <Input
                width="50%"
                label="Current password"
                id={currentPasswordId}
                formControlName="currentPassword"
                aria-required="true"
                type="password"
                required
                defaultValue={""}
              />
            </div>
            <div className={classes.row}>
              <Input
                width="50%"
                label="New password"
                id={newPassword1Id}
                formControlName="newPassword1"
                aria-required="true"
                type="password"
                required
                validations={{
                  required:
                    "Please select a password that meets all of the requirements listed.",
                  validate: (val: string) => validatePass(val),
                }}
                defaultValue={""}
              />
            </div>
            <div className={classes.row}>
              <Input
                width="50%"
                label="Confirm new password"
                id={newPassword2Id}
                formControlName="newPassword2"
                aria-required="true"
                type="password"
                required
                name="newPassword2"
                validations={{
                  required: "Please enter confirmation of password.",
                  validate: (val: string) => validateConfirmPass(val),
                }}
                handleKeyUp={confirmPasswordValidationCheck}
                defaultValue={""}
              />
            </div>

            <div className={classes.row}>
              <Button
                type="button"
                className={classes.cancel}
                onClick={() => setShowPasswordReset(false)}
              >
                Cancel
              </Button>

              <Button
                type="button"
                className={classes.submit}
                onClick={methods.handleSubmit(submitForm)}
              >
                Reset Password
              </Button>
            </div>
          </Card>
        </form>
      </FormProvider>
    );
  }

  return <>{passwordDialogue}</>;
}

export default PasswordReset;
