import { useEffect, useState } from 'react';
import classes from './AppLayout.module.scss';
import AppNavbar from '../../../../components/app-navbar/AppNavbar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FOOTER_CONTACT_TYPE } from '../../../../types/enums';
import Footer from '../../../../components/footer/Footer';

import { useAppDispatch, useAppSelector } from '../../../../_store/hooks';

import { AuthUser } from '../../../../_store/features/auth/authTypes';
import SideNav from '../../../../components/app-side-nav/SideNav';
import { IdleTimeoutModal } from '../../../../components/idle-timeout-modal/IdleTimeoutModal';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  setPageTitle
} from '../../../../_store/features/app/appSlice';

function AppLayout() {
  const [isLoading, setIsLoading] = useState(false);
  const sidebarStatus = useAppSelector((state) => state.app.sideBarStatus);

  const [contactType] = useState<FOOTER_CONTACT_TYPE>(
    FOOTER_CONTACT_TYPE.contactRei,
  );

  const { helmetTitle } = useAppSelector((state) => state.app);

  const userDetails: AuthUser | null = useAppSelector(
    (state) => state.auth.user,
  );


  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{helmetTitle}</title>
        </Helmet>
      </HelmetProvider>
      <div className={classes['layout-container']}>
        <AppNavbar
          height={'122.031px'}
          isLoggedIn={true}
          includeLogoHeader={true}
          dividerWidth={50}
        />
        {/* App Sidebar here */}
        <SideNav />
        <div
          className={
            sidebarStatus.isScreenNeedToPushRight
              ? classes['outlet-push-right']
              : classes['outlet-container']
          }
        >
          {!isLoading && <Outlet />}
          <IdleTimeoutModal />
        </div>
        <Footer contactType={contactType} />
      </div>
    </>
  );
}

export default AppLayout;
