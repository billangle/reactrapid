import { FOOTER_CONTACT_TYPE } from '../../types/enums';
import FooterLogo from './FooterLogo';
import classes from './Footer.module.scss';

type Props = {
  contactType: FOOTER_CONTACT_TYPE;
};

function Footer(props: Props) {
  return (
    <div className={classes['footer-container']}>

      <FooterLogo />
    </div>
  );
}

export default Footer;
