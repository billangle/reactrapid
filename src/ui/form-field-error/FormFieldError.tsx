import { CSSProperties } from 'react';
import classes from './FormFieldError.module.scss';

type ErrorProps = {
  message: string | undefined;
  style?: CSSProperties | undefined;
};

function FormFieldError(props: ErrorProps) {
  return (
    <div className={classes.error} style={{ ...props.style }}>
      {props.message}
    </div>
  );
}

export default FormFieldError;
