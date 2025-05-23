import { useNavigate } from 'react-router-dom';
import classes from './RegistrationSuccess.module.scss';
import { Button } from '@trussworks/react-uswds';
import { SUCCESS_REGISTRATION } from '../../../assets/image-urls';

function RegistrationSuccess(props: any) {
  const navigate = useNavigate();
  return (
    <div className={classes.wrapper}>
      <p className={classes.title}>
        Congratulations! Registration was successful.
      </p>{' '}
      <p className={classes['info-text']}>
        A confirmation message containing your username <br /> has been sent to
        &nbsp;
        <strong>{props.email}</strong>
      </p>
      <Button
        className={classes.button}
        type="submit"
        onClick={() => navigate('/')}
      >
        Back to Login
      </Button>
      <img style={{ width: '25%' }} src={SUCCESS_REGISTRATION} />
    </div>
  );
}

export default RegistrationSuccess;
