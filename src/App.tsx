import './App.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './_store/store';
import AppRoutes from './AppRoutes';
import { Hub } from '@aws-amplify/core';
import { appInitialized } from './_store/features/app/appSlice';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';



// https://github.com/aws-observability/aws-rum-web/blob/main/docs/cdn_react.md

declare function cwr(operation: string, payload: any): void;


function RumContainer() {
   let location = useLocation();
     useEffect(() => {
          console.log(location.pathname);
          cwr('recordPageView', location.pathname);
      }, [location]);
}

function App(): JSX.Element {




  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Dispatch the appInitialized action when the component mounts
    dispatch(appInitialized());
  }, [dispatch]);

  RumContainer();

  return (
    <>
      <AppRoutes />
      <ToastContainer />

    </>
  );
}

export default App;
