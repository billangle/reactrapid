import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@trussworks/react-uswds';
import classes from './SavingButton.module.scss';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { colorMap } from '../../types/constants';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  isSaving: boolean;
  isSaved: boolean;
  handleSave: (e: any) => void;
  type?: any;
}

function SavingButton(props: Props) {
  return (
    <div style={{ display: 'flex' }}>
      {!props.isSaving && (
        <Button
          outline
          {...props}
          className={classes.save}
          type={props.type || 'submit'}
          onClick={props.handleSave}
        >
          Save
        </Button>
      )}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {props.isSaved && !props.isSaving && (
          <div>
            <FontAwesomeIcon
              color={colorMap.forestGreen}
              icon={faCheckCircle}
            />
            <span
              style={{
                color: colorMap.forestGreen,
                fontWeight: 'bold',
                marginLeft: '.3rem',
              }}
            >
              Saved
            </span>
          </div>
        )}
        {props.isSaving && (
          <Button
            {...props}
            disabled={true}
            type="button"
            className={classes['is-saving']}
          >
            <span></span> {props.text || 'Saving...'}{' '}
          </Button>
        )}
      </div>
    </div>
  );
}

export default SavingButton;
