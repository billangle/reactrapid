import { useEffect, useState, useId } from "react";
import styles from "./Dashboard.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../_store/hooks";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Button } from "@trussworks/react-uswds";
import classes from "./Dashboard.module.scss";
import { setPageTitle } from "../../../../_store/features/app/appSlice";
import { useForm, FormProvider } from "react-hook-form";
import Input from "../../../../ui/input/Input";
import Card from "../../../../ui/card/Card";
import { UserDetails, User } from "../types";
import PasswordReset from "../../../../components/password-reset/PasswordReset";

import { AuthUser } from "../../../../_store/features/auth/authTypes";

const defaultValues: Partial<User> = {};

function Dashboard() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Right Angle Research User Dashboard"));
  }, []);

  //const messages = useAppSelector((state) => state.app.messages);
  const appReportEmail = useAppSelector((state) => state.app.reportEmail);

  const methods = useForm<UserDetails | Partial<UserDetails>>({
    defaultValues,
  });

  const userDetails: AuthUser | null = useAppSelector(
    (state) => state.auth.user
  );
  let username = userDetails?.username || "";
  let userEmail = userDetails?.email || "";
  let name = userDetails?.name || "";
  let phone = userDetails?.phoneNumber || "";
  let street1 = userDetails?.street1 || "";
  let street2 = userDetails?.street2 || "";
  let city = userDetails?.city || "";
  let state = userDetails?.state || "";
  let zip = userDetails?.zip || "";
  let apt = userDetails?.apt || "";
  let confirmEmail = userDetails?.confirmEmail || "";
  let middlename = userDetails?.middlename || "";
  let prefix = userDetails?.prefix || "";
  let suffix = userDetails?.suffix || "";
  let challengeAnswer = userDetails?.challengeAnswer || "";
  let challengeQuestion = userDetails?.challengeQuestion || "";

  let admin = "false";
  if (userDetails?.isSuperUser) {
    admin = "true";
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Rght Angle Research User Dashboard</title>
        </Helmet>
      </HelmetProvider>
      <Card customClass={classes.card}>
        <FormProvider {...methods}>
          <div className={styles.container}>
            <div>
              <b>Username:</b> {username} &nbsp;{" "}
            </div>
            <div>
              <b>User Email:</b> {userEmail} &nbsp;{" "}
            </div>
            <div>
              <b>Name:</b> {name} &nbsp;{" "}
            </div>
            <div>
              <b>Phone:</b> {phone} &nbsp;{" "}
            </div>
            <div>
              <b>Street1:</b> {street1} &nbsp;{" "}
            </div>
            <div>
              <b>Street2:</b> {street2} &nbsp;{" "}
            </div>
            <div>
              <b>City:</b> {city} &nbsp;{" "}
            </div>
            <div>
              <b>State:</b> {state} &nbsp;{" "}
            </div>
            <div>
              <b>Zip:</b> {zip} &nbsp;{" "}
            </div>
            <div>
              <b>Apt:</b> {apt} &nbsp;{" "}
            </div>
            <div>
              <b>Confirm Email:</b> {confirmEmail} &nbsp;{" "}
            </div>
            <div>
              <b>Middle Name:</b> {middlename} &nbsp;{" "}
            </div>
            <div>
              <b>Prefix:</b> {prefix} &nbsp;{" "}
            </div>
            <div>
              <b>Suffix:</b> {suffix} &nbsp;{" "}
            </div>
            <div>
              <b>Challenge Question:</b> {challengeQuestion} &nbsp;{" "}
            </div>
            <div>
              <b>Challenge Answer:</b> {challengeAnswer} &nbsp;{" "}
            </div>
            <div>
              <b>Admin:</b> {admin} &nbsp;{" "}
            </div>
            <PasswordReset username={username} />
          </div>
        </FormProvider>
      </Card>
    </>
  );
}

export default Dashboard;
