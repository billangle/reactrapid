import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import classes from './PetsCheckbox.module.scss';
import { Checkbox } from '@trussworks/react-uswds';

interface PetsCheckboxProps extends React.HTMLProps<HTMLInputElement> {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  label: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validations?: any;
  formControlName: string;
  width?: string;
  style?: object;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  onChangeChecked?: React.Dispatch<boolean>;
  hideRequiredMark?: boolean;
}

function PetsCheckbox(props: PetsCheckboxProps) {
  const {
    trigger,
    control,
    formState: { errors, dirtyFields },
    watch,
  } = useFormContext();
  const hasError = !!errors[props.formControlName]; // check if there is an error for this control
  const isDirty = dirtyFields[props.formControlName];
  const value = watch(props.formControlName);

  useEffect(() => {
    if (isDirty) {
      trigger(props.formControlName);
    }
  }, [value]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    if (props.onChangeChecked) {
      props.onChangeChecked(checked);
    }
  };

  return (
    <div
      className={`${classes['radio-container']} ${
        hasError ? classes['has-error'] : ''
      }`}
      style={props?.style}
    >
      <Controller
        name={props.formControlName}
        control={control}
        rules={{ ...props.validations }}
        defaultValue={props.checked}
        render={({ field }) => (
          <>
            <Checkbox
              id={props.id}
              label={props.label}
              {...field}
              checked={props.checked}
              onChange={onChange}
              disabled={props?.disabled}
              required={props?.required}
            />
          </>
        )}
      />
      {errors[props.formControlName] && (
        <>
          <div className={classes.error}>
            {errors[props.formControlName]?.message as string}
          </div>
          <div className={classes.divider}></div>
        </>
      )}
    </div>
  );
}

export default PetsCheckbox;
