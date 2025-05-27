import Logo from '../header/logo-header/Logo';
import classes from './FooterLogo.module.scss';

function FooterLogo() {
  return (
    <div className={classes.container}>
      <Logo height="100px" width="100px" titlelogo="footer" />
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      <div>
        <div style={{ position: 'relative', marginRight: '10rem', marginLeft: '10px' }}></div>
        <p>
          <a
            className={classes.linkondarkbackground}
            href=""
            rel="noopener noreferrer"
          >
            Webmaster
          </a>{' '}
          |{' '}
          <a
            className={classes.linkondarkbackground}
            href=""
            rel="noopener noreferrer"
          >
            Privacy, Security, Notices
          </a>{' '}
          |{' '}
          <a
            className={classes.linkondarkbackground}
            href=""
            rel="noopener noreferrer"
          >
            Accessibility
          </a>
          <br />
          <br />
          <small style={{ fontWeight: 'lighter' }}>
           
            <br />
          
            <a
            className={classes.linkondarkbackground}
            href=""
            rel="noopener noreferrer"
          >
               <br /> 
            </a>{' '}
           
            <a
            className={classes.linkondarkbackground}
            href=""
            rel="noopener noreferrer"
          >
         
            </a>
          </small>
          <br />
        </p>
      </div>
    </div>
  );
}

export default FooterLogo;
