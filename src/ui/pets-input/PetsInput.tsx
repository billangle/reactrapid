// eslint-disable-next-line import/named
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { CSSProperties, forwardRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import FormFieldError from '../form-field-error/FormFieldError';
import classes from './PetsInput.module.scss';
import { TextInput } from '@trussworks/react-uswds';

interface PetsInputProps extends React.HTMLProps<HTMLInputElement> {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validations?: any;
  formControlName: string;
  width?: string;
  typeAsNumber?: boolean;
  icon?: IconDefinition;
  style?: CSSProperties | undefined;
  hideLabel?: boolean;
  hideRequiredMark?: boolean;
  inputStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onlyDigits?: boolean;
  handleKeyUp?: (evt: React.KeyboardEvent<HTMLInputElement>) => void;
  handleKeyDown?: (evt: React.KeyboardEvent<HTMLInputElement>) => void;
  title?: string;
}

// eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const PetsInput = forwardRef((props: PetsInputProps, _: any) => {
  const {
    control,
    formState: { errors },
    setValue,
    trigger,
  } = useFormContext();
  const formCName = props.formControlName?.split('.');
  const getFormName = () => {
    let error: any = errors;
    formCName.forEach((vl) => {
      error = error?.[vl];
    });
    return error;
  };
  const hasError =
    formCName?.length > 1 ? !!getFormName() : !!errors[props.formControlName]; // check if there is an error for this control

  // Manually setting max length due to the TextInput component has an issue with maxLength props
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(event);
    }
    // Get the current value of the form control
    const currentValue = event.target.value;
    // Update the value of the form control in the Controller
    setValue(
      props.formControlName,
      props.maxLength ? currentValue.slice(0, props.maxLength) : currentValue,
    );
    trigger(props.formControlName);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (props.onlyDigits) {
      if (
        !/[0-9]/.test(event.key) &&
        event.key !== 'Delete' &&
        event.key !== 'Backspace' &&
        event.key !== 'ArrowLeft' &&
        event.key !== 'ArrowRight'
      ) {
        event.preventDefault();
        return;
      }
    }
    if (props.handleKeyDown) {
      props.handleKeyDown(event);
    }
  };

  return (
    <div
      className={`${classes['form-control']} ${
        hasError ? classes['has-error'] : ''
      }`}
      style={{ width: props.width, ...props.style }}
    >
      {!props.hideLabel && (
        <div className={classes['label-container']}>
          <label htmlFor={props.id} style={props.labelStyle}>
            {props.label}{' '}
          </label>{' '}
          {(props.validations?.required || props.required) &&
            !props.hideRequiredMark && (
              <span className={classes.required}>*</span>
            )}
        </div>
      )}
      {(hasError || errors[props.formControlName]) && (
        <>
          <FormFieldError
            message={
              formCName?.length > 1
                ? (getFormName()?.message as string)
                : (errors[props.formControlName]?.message as string)
            }
            style={{
              fontSize: '1rem',
              width: 'fit-content',
              maxWidth: 'max-width: 32rem',
            }}
          />
          <div className={classes.divider}></div>
        </>
      )}
      <Controller
        name={props.formControlName}
        control={control}
        rules={{ ...props.validations }}
        render={({ field }) => (
          <>
            <TextInput
              {...field}
              id={props.id}
              style={props.inputStyle}
              disabled={props.disabled}
              value={field.value}
              title={props.title}
              onKeyDown={handleKeyDown}
              onKeyUp={(e) => props.handleKeyUp && props.handleKeyUp(e)}
              type={props.type ? props.type : 'text'}
              onChange={handleInputChange}
              name={props.formControlName}
            />
          </>
        )}
      />
    </div>
  );
});

export default PetsInput;
