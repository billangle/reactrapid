import { CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from '@trussworks/react-uswds/';
import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import classes from './CustomAlert.module.scss';

type Props = {
  type: 'success' | 'warning' | 'error' | 'info';
  slim?: boolean;
  text: React.ReactNode;
  style?: CSSProperties;
  iconColor?: string;
  flex?: boolean;
  iconSize?: string;
};

const icon = {
  info: faInfoCircle,
  success: faCheckCircle,
  warning: faExclamationTriangle,
  error: faExclamationCircle,
};

function CustomAlert(props: Props) {
  return (
    <Alert
      className={classes[props.type] + ' ' + classes.alert}
      type={props.type}
      noIcon
      headingLevel="h4"
      slim={props.slim}
      style={props.style}
    >
      <p className={props.flex ? classes.flexAlert : ''}>
        <FontAwesomeIcon
          fontSize={props.iconSize ? props.iconSize : 22.4}
          icon={icon[props.type]}
          color={props.iconColor}
        />
        {props.text}
      </p>
    </Alert>
  );
}

export default CustomAlert;
