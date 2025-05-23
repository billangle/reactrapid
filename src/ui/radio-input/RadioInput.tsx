import classes from './RadioInput.module.scss';
import { PetsOption } from '../../types/types';
import FormFieldError from '../form-field-error/FormFieldError';

type RadioInputPropsType = {
  name: string;
  optionValues: PetsOption[];
  initialOption?: any;
  title?: string;
  required: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selected: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSelection: (val: any) => void;
  renderTitle?: () => React.ReactNode;
  showError?: boolean;
  errorMessage?: string;
  gap?: any;
  width?: any;
  hideRequiredMark?: boolean;
  border?: any;
  marginBottom?: any;
  styles?: React.CSSProperties;
  disabled?: boolean;
  /** Accepts a string value representing the height, including units. For example: '9rem', '100%', '10px', 'vh', etc. */
  dividerHeight?: string;
};

export default function RadioInput(props: RadioInputPropsType) {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        {props.renderTitle && props.renderTitle()}
        {props.required && !props.hideRequiredMark && (
          <span className={classes.required}>*</span>
        )}
      </div>
      <div
        style={
          props.styles
            ? props.styles
            : {
                position: 'relative',
                marginTop: props.gap || '',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                backgroundColor: '#c9c9c9;',
              }
        }
      >
        {props.showError && (
          <div
            style={{
              height: props.dividerHeight ? props.dividerHeight : '9rem',
            }}
            className={classes.divider}
          ></div>
        )}
        <div style={{ width: '100%' }}>
          {props.showError && <FormFieldError message={props.errorMessage} />}
          <div
            className={classes.options}
            style={{
              width: props.width || '',
              border: props.border || '',
              marginBottom: props.marginBottom || '',
            }}
          >
            {props.optionValues?.map((opt) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <div
                  style={{
                    paddingLeft: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start',
                    backgroundColor: props.disabled ? '#c9c9c9' : 'white',
                  }}
                >
                  <input
                    id={`${props.name}-${opt.value}`}
                    name={props.name}
                    disabled={props.disabled}
                    aria-disabled={props.disabled}
                    type="radio"
                    value={!opt.value ? 'no' : 'yes'}
                    checked={props.selected === opt.value}
                    onChange={() => props.handleSelection(opt.value)}
                  />
                  <label
                    key={opt.label}
                    style={{ marginRight: '0.5rem' }}
                    htmlFor={`${props.name}-${opt.value}`}
                  >
                    {opt.label}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
