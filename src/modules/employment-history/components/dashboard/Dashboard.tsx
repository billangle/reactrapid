import { useEffect, useState, useId } from "react";
import styles from "./Dashboard.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../_store/hooks";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Button, Alert } from "@trussworks/react-uswds";
import classes from "./Dashboard.module.scss";
import { setPageTitle } from "../../../../_store/features/app/appSlice";
import { useForm, FormProvider } from "react-hook-form";
import Input from "../../../../ui/input/Input";
import Card from "../../../../ui/card/Card";
import { showBanner } from "../../../../ui/PetsToast";

import { IInitialState } from "../../store/features/employment-history-request/EmploymentHistoryRequestSlice";
import {
  getEmploymentHistory,
  updateEmploymentHistory,
} from "../../store/features/employment-history-request/EmploymentHistoryRequestAction";
import { EmploymentHistoryDetails } from "../types";

import { AuthUser } from "../../../../_store/features/auth/authTypes";
import { useSelector } from "react-redux";

const defaultValues: Partial<EmploymentHistoryDetails> = {};

function EmploymentHistory() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Employment History"));
  }, []);

  function submitForm(formData: any) {
    methods.trigger();
    console.log("submit the form", formData);
    handleFormSubmit(formData);
  }
  const disabled = useState();

  const handleFormSubmit = async (formData: any) => {
    setSaving(true);
    const result = await dispatch(updateEmploymentHistory(formData));
    console.log("result", result);

    if (result) {
      showBanner("Form successfully submitted!", "success", "top-center");
    } else {
      showBanner("Something went wrong", "warning", "top-center");
    }
    setSaving(false);
    setSuccessfulEmploymentHistoryChange(true);
  };

  const methods = useForm<
    EmploymentHistoryDetails | Partial<EmploymentHistoryDetails>
  >({
    defaultValues,
  });

  const userDetails: AuthUser | null = useAppSelector(
    (state) => state.auth.user
  );

  const companyNameId = useId();
  const salaryId = useId();
  const titleId = useId();
  const ssnId = useId();
  const street1Id = useId();
  const atpsuiteId = useId();
  const cityId = useId();
  const stateId = useId();
  const zipId = useId();

  let admin = "false";
  if (userDetails?.isSuperUser) {
    admin = "true";
  }

  const [isSaving, setSaving] = useState<boolean>(false);

  const [employmentHistoryChangeError, setEmploymentHistoryChangeError] =
    useState<string>();
  const [
    successfulEmploymentHistoryChange,
    setSuccessfulEmploymentHistoryChange,
  ] = useState<boolean>(false);

  function clearForm() {
    methods.reset();
    setSuccessfulEmploymentHistoryChange(false);
  }

  // useEffect(() => {
  //   dispatch(getEmploymentHistory());
  // }, [dispatch]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Employment History</title>
        </Helmet>
      </HelmetProvider>
      <Card customClass={classes.card}>
        <FormProvider {...methods}>
          <div className={styles.container}>
            <div
              style={{
                display: successfulEmploymentHistoryChange ? "auto" : "none",
              }}
            >
              <Alert type="success" headingLevel="h2">
                Submission successful!
              </Alert>
              <div className={classes.row}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
              <div className={classes.row}>
                <p>
                  Lobortis donec tellus maximus gravida fames massa magnis.
                  Velit odio vel phasellus litora ultrices erat.
                </p>
              </div>
              <div className={classes.actionbuttons}>
                <div className={classes.row}>
                  <Button
                    type="button"
                    className={classes.submit}
                    onClick={() => clearForm()}
                  >
                    Visit Homepage
                  </Button>
                </div>
              </div>
            </div>
            <div
              style={{
                display: successfulEmploymentHistoryChange ? "none" : "auto",
              }}
            ></div>
            <p>A red asterisk(*) indicates a required field.</p>
            <div className={classes.row}>
              <Input
                disabled={isSaving}
                width="75%"
                label="Company name"
                id={companyNameId}
                formControlName="companyName"
                aria-required="true"
                type="text"
                required
                defaultValue={""}
                validations={{
                  required: "Please enter a company name.",
                  validate: (val: string) => val !== null,
                }}
              />
            </div>
            <div className={classes.row}>
              <Input
                disabled={isSaving}
                width="75%"
                label="Job title"
                id={titleId}
                formControlName="title"
                aria-required="true"
                type="text"
                required
                defaultValue={""}
                validations={{
                  required: "Please enter a job title.",
                  validate: (val: string) => val !== null,
                }}
              />
            </div>
            <div className={classes.row}>
              <Input
                disabled={isSaving}
                width="75%"
                label="Salary"
                id={salaryId}
                formControlName="salary"
                aria-required="true"
                type="text"
                required
                validations={{
                  required: "Please enter your current salary.",
                  validate: (val: string) => val !== null,
                }}
                defaultValue={""}
              />
            </div>
            <div className={classes.row}>
              <Input
                disabled={isSaving}
                width="75%"
                label="Social security number"
                id={ssnId}
                formControlName="SSN"
                aria-required="true"
                type="number"
                required
                validations={{
                  required: "Please enter your social security number",
                  validate: (val: number) => val !== null,
                }}
                defaultValue={""}
              />
            </div>
            <div className={classes.row}>
              <Input
                disabled={isSaving}
                width="50%"
                label="Employer street address"
                style={{ marginRight: "1rem" }}
                id={street1Id}
                formControlName="street1"
                aria-required="true"
                type="text"
                defaultValue={""}
              />
              <Input
                disabled={isSaving}
                width="23%"
                label="Apt/Suite"
                id={atpsuiteId}
                formControlName="aptsuite"
                aria-required="true"
                type="text"
                defaultValue={""}
              />
            </div>
            <div className={classes.row}>
              <Input
                disabled={isSaving}
                width="50%"
                label="City"
                id={cityId}
                style={{ marginRight: "1rem" }}
                formControlName="city"
                aria-required="true"
                type="text"
                defaultValue={""}
              />
              <Input
                disabled={isSaving}
                width="23%"
                label="State"
                id={stateId}
                formControlName="state"
                aria-required="true"
                type="text"
                defaultValue={""}
              />
            </div>
            <div className="row">
              <Input
                disabled={isSaving}
                width="25%"
                label="Zip"
                id={zipId}
                className={classes.gap}
                formControlName="zip"
                aria-required="true"
                type="number"
                defaultValue={""}
              />
            </div>

            <div className={classes.actionbuttons}>
              <div className={classes.row}>
                <Button
                  type="button"
                  className={classes.submit}
                  onClick={methods.handleSubmit(submitForm)}
                >
                  Submit
                </Button>
                <Button
                  type="reset"
                  className={classes.cancel}
                  onClick={() => clearForm()}
                >
                  Reset form
                </Button>
              </div>
            </div>
          </div>
        </FormProvider>
      </Card>
    </>
  );
}

export default EmploymentHistory;
