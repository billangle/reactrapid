import Divider from '../../ui/divider/Divider';
import LogoHeader from './logo-header/LogoHeader';
import classes from './Header.module.scss';

type Props = {
  includeLogoHeader?: boolean;
  topTitle: string | React.ReactElement;
  bottomTitle?: string | React.ReactElement;
  informationText?: string | React.ReactElement;
  dividerWidth?: number;
  dividerColor?: string;
  dividerHeight?: number;
  direction?: 'vertical' | 'horizontal';
  forceHideActions?: boolean;
  isLoggedIn?: boolean;
};

function Header(props: Props) {
  return (
    <div
      style={{ height: props.direction === 'vertical' ? '60%' : '100%' }}
      className={`${classes.container} ${
        props.isLoggedIn && classes['logged-in']
      }`}
    >
      {props.includeLogoHeader && (
        <LogoHeader
          forceHideActions={props.forceHideActions}
          isLoggedIn={props.isLoggedIn}
        />
      )}
      <div className={classes['text-container']}>
        {props.topTitle}
        <Divider
          width={props.dividerWidth ?? 100}
          color={props.dividerColor}
          height={props.dividerHeight}
        />
        {props.bottomTitle && props.bottomTitle}
        {props.informationText && (
          <p className={classes['info-text']}>{props.informationText}</p>
        )}
      </div>
    </div>
  );
}

export default Header;
