
import classes from './InactiveLoggedOut.module.scss';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@trussworks/react-uswds';
import Background from '../../ui/background/Background';
import { HEADER_BACKGROUND } from '../../types/enums';
import Card from '../../ui/card/Card';
import { USCIS_LOGO_URL } from '@/assets/image-urls';
import Header from '../header/Header';

const topTitle = <h1>Right Angle Research</h1>;
//@todo convert this into dynamic error handling page with path parameters
const InactiveLoggedOut = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Logged out - Right Angle Research</title>
      </Helmet>
      <Background
        backgroundColor={HEADER_BACKGROUND.WhiteIsotope}
        height="212.031px"
      >
        <Header
          dividerWidth={40}
          includeLogoHeader={true}
          topTitle={''}
          isLoggedIn={false}
          forceHideActions={false}
        />
      </Background>

      <Card>
        <div className={classes['form-container']}>
          <h1 className={classes['margin-auto']}>
            You have been logged out due to inactivity
          </h1>
          <img
            src={USCIS_LOGO_URL}
            alt="logo"
          //  className={classes['center-image']}
          />
          <p className={classes['margin-auto']}>
            Please log back in to continue working. Any previously unsaved work
            is now lost and will need to be re-entered.
          </p>
          <Button
            className={classes['margin-auto']}
            type="button"
            onClick={() => {
              navigate(`/`);
            }}
          >
            Log back in
          </Button>
        </div>
      </Card>
    </>
  );
};

export default InactiveLoggedOut;
