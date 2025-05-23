import Logo from '../header/logo-header/Logo';
import classes from './FooterLogo.module.scss';

function FooterLogo() {
  return (
    <div className={classes.container}>
      <Logo height="160px" width="460px" titlelogo="footer" />
      <div>
        <h2>USCIS</h2>
        <p>
        </p>
        <div style={{ position: 'relative', marginRight: '3rem' }}></div>
        <p>
          <a
            className={classes.linkondarkbackground}
            href="mailto:any@any.gov"
            rel="noopener noreferrer"
          >
            Webmaster
          </a>{' '}
          |{' '}
          <a
            className={classes.linkondarkbackground}
            href="https://www.uscis.gov/about-us/privacy-and-internet-privacy-policy"
            rel="noopener noreferrer"
            target="_blank"
          >
            Privacy, Security, Notices
          </a>{' '}
          |{' '}
          <a
            className={classes.linkondarkbackground}
            href="https://www.uscis.gov/about-us/website-policies-and-disclaimers"
            rel="noopener noreferrer"
            target="_blank"
          >
            Accessibility
          </a>
          <br />
          <br />
          <small style={{ fontWeight: 'lighter' }}>
            This system contains CUI, including but not limited to basic CUI,
            source selection CUI (CUI//SP-SSEL), and small business research and{' '}
            <br />
            technology CUI (CUI//SP-SBIZ). You can find more information on CUI
            and proper handling thereof in{' '}
            <a
              className={classes.linkondarkbackground}
              href="  "
              rel="noopener noreferrer"
            >
               <br /> 2810.7
            </a>{' '}
            and at{' '}
            <a
              className={classes.linkondarkbackground}
              href="https://www.archives.gov/cui "
              rel="noopener noreferrer"
            >
              NARA.
            </a>
          </small>
          <br />
        </p>
      </div>
    </div>
  );
}

export default FooterLogo;
