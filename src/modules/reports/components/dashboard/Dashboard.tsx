import { useEffect, useState } from 'react';
import styles from './Dashboard.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../_store/hooks';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import CustomAlert from '../../../../ui/alert/CustomAlert';
import {
  setPageTitle
} from '../../../../_store/features/app/appSlice';


import {
  AuthUser
} from '../../../../_store/features/auth/authTypes';


function Dashboard() {

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Right Angle Research Report Dashboard'));
  }, []);
  
  //const messages = useAppSelector((state) => state.app.messages);
  const appReportEmail = useAppSelector((state) =>  state.app.reportEmail);




  const userDetails: AuthUser | null = useAppSelector(
        (state) => state.auth.user,
  );
  let username = userDetails?.username || '';
  let userEmail = userDetails?.email || '';
  let name = userDetails?.name || '';
  let phone = userDetails?.phoneNumber || '';
  let street1 = userDetails?.street1 || '';
  let street2 = userDetails?.street2 || '';
  let city = userDetails?.city || '';
  let state = userDetails?.state || '';
  let zip = userDetails?.zip || '';
  let apt = userDetails?.apt || '';
  let confirmEmail = userDetails?.confirmEmail || '';
  let middlename = userDetails?.middlename || '';
  let prefix = userDetails?.prefix || '';
  let suffix = userDetails?.suffix || '';
  let challengeAnswer = userDetails?.challengeAnswer || '';
  let challengeQuestion = userDetails?.challengeQuestion || '';
  
  
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>RAPID CC Report Dashboard</title>
        </Helmet>
      </HelmetProvider>
    </>
  );
}

export default Dashboard;
