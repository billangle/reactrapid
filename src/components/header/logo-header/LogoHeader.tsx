import { useNavigate } from 'react-router-dom';
import { Button } from '@trussworks/react-uswds';
import Logo from './Logo';
import classes from './LogoHeader.module.scss';
import { useCurrentModule } from '../../../modules/reports/hooks/useCurrentModule';
import { MODULE } from '../../../types/enums';

type Props = {
  forceHideActions?: boolean;
  isLoggedIn?: boolean;
};

function LogoHeader(props: Props) {
  const navigate = useNavigate();
  const currentModule = useCurrentModule();

  return (
    <div
      className={`${classes.container} ${
        props.isLoggedIn && classes['logged-in']
      }`}
      onClick={() => {
        if (!props.forceHideActions) {
          /*
          navigate(
            currentModule === MODULE.CONTRACTS
              ? '/contracts/dashboard'
              : '/eval/dashboard',
          );
          */
        } else {
          navigate('/');
        }
      }}
      style={{ cursor: 'pointer' }}
    >
      <div className={classes.info}>
        <Logo width={props.isLoggedIn ? '200px' : ''} titlelogo="header" />
        <div>
          <h3 style={{ marginBottom: '5px' }}></h3>
        </div>
      </div>
      {!props.isLoggedIn && !props.forceHideActions && (
        <div className={classes.action}>
          <a href="/login">Login</a>
          <Button outline type="button" onClick={() => navigate('/help')}>
            Get Help
          </Button>
        </div>
      )}
    </div>
  );
}

export default LogoHeader;
