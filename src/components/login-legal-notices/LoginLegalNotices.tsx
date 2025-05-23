import { useRef, useState, useEffect } from 'react';
import {
  FOOTER_CONTACT_TYPE,
  HEADER_BACKGROUND,
  PAGE_TITLE,
} from '../../types/enums';
import Header from '../header/Header';
import classes from './LoginLegalNotices.module.scss';
import Background from '../../ui/background/Background';
import Card from '../../ui/card/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import LegalNotices from '../legal-notices/LegalNotices';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Button } from '@trussworks/react-uswds';
import ConfirmModal from '../../ui/confirm-modal/ConfirmModal';
import { legalNotice, paperWorkReductionAct } from './constants';
import { Link } from 'react-router-dom';
import FooterLogo from '../footer/FooterLogo';
import { config } from '../../config/config';
import { Auth } from 'aws-amplify';

const topTitle = (
  <h1 style={{ lineHeight: '3rem', fontSize: '3rem' }}>
    RAPID CC
  </h1>
);

const informationText = (
  <p className={classes.subtitle}>
 RAPID CC
  </p>
);
const LoginLegalNotices = () => {
  const [confirmModalRef, setConfirmModalRef] = useState();
  const formRef = useRef<HTMLDivElement>(null);
 // const useSSOLogin = config.USE_SSO_LOGIN;
  const useSSOLogin = false;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const onDialogOpen = () => {
    if (confirmModalRef) {
      (confirmModalRef as any).current.toggleModal(undefined, true);
    }
  };
  const ssoLoginClick = () => {
    Auth.federatedSignIn({ customProvider: config.SSO_IDP });
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{PAGE_TITLE.login}</title>
        </Helmet>
      </HelmetProvider>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <Background
            height={'100%'}
            backgroundColor={HEADER_BACKGROUND.LightBlue}
          >
            <Header
              direction="vertical"
              topTitle={topTitle}
              informationText={informationText}
              includeLogoHeader={true}
              forceHideActions={true}
            />
          </Background>
        </div>
        <Background
          height={'100%'}
          backgroundColor={HEADER_BACKGROUND.WhiteIsotope}
        >
          <Card customClass={classes.card}>
            <div ref={formRef} className={classes['form-container']}>
              <h2 style={{ margin: 0, fontSize: '1.5rem' }}>
                Login
              </h2>
              <p className={classes['learn-more']}>
                You agree to the legal notices regarding
                using a Government Information System -
                <span onClick={() => onDialogOpen()}>
                  {' '}
                  learn more before proceeding.
                </span>
              </p>
              {useSSOLogin ? (
                <Button
                  onClick={ssoLoginClick}
                  style={{ width: 'fit-content', paddingInline: '3rem' }}
                  type="button"
                >
                  Agree and Continue to SSO
                </Button>
              ) : (
                <Link to={'../login'}>
                  <Button
                    style={{ width: 'fit-content', paddingInline: '3rem' }}
                    type="button"
                  >
                    Agree and Continue
                  </Button>
                </Link>
              )}

            </div>
          </Card>
        </Background>
      </div>
      <ConfirmModal
        continueBtnText="Agree and Continue"
        buttonGroup={false}
        customStyles={{ marginTop: '-1rem' }}
        content={legalNotice}
        title="Legal Notice"
        getModalRef={(ref) => setConfirmModalRef(ref)}
        onContinue={() => {}}
      />
      <LegalNotices
        returnToTopStyles={{ float: 'right', marginTop: '3rem' }}
        text={paperWorkReductionAct}
        title="Paperwork Reduction Act Statement"
      />
    
      <FooterLogo />
    </>
  );
};

export default LoginLegalNotices;
