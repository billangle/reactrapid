import { CSSProperties, forwardRef, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import classes from './RadioGroup.module.scss';
import { Radio } from '@trussworks/react-uswds';

export interface RadioItem {
  value: string;
  label: string;
  checked?: boolean;
}

interface RadioGroupProps {
  style?: React.CSSProperties;
  options: RadioItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validations?: any;
  labelStyles?: React.CSSProperties;
  formControlName: string;
  label?: string;
  hideLabel?: boolean;
  width?: string;
  onRadioChange?: React.Dispatch<string>;
  disabled?: boolean;
  radioContainerStyles?: React.CSSProperties;
}

const RadioGroup = (props: RadioGroupProps) => {
  const {
    control,
    getValues,
    setValue,
    formState: { errors, touchedFields },
  } = useFormContext();
  const hasError = !!errors[props.formControlName]; // check if there is an error for this control

  // define a function to handle the onChange event of the Checkbox component
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onRadioChange) {
      props.onRadioChange(event.target.value);
    }
  };

  return (
    <div style={props.style} className={`${props.formControlName}`}>
      {props.label && !props.hideLabel && (
        <label style={props.labelStyles}>{props.label}</label>
      )}
      {props.label && !props.hideLabel && props.validations?.required && (
        <span className="required-mark">*</span>
      )}
      {errors[props.formControlName] && (
        <div className={classes.error}>
          {errors[props.formControlName]?.message as string}
        </div>
      )}
      <div
        className={`${classes['radio-container']} ${
          hasError ? classes['has-error'] : ''
        }`}
        style={props.radioContainerStyles}
      >
        <Controller
          name={props.formControlName}
          control={control}
          rules={{ ...props.validations }}
          render={({ field }) => (
            <>
              {props.options.map((item) => (
                <Radio
                  id={`${props.formControlName} - ${item.value}`}
                  disabled={props.disabled}
                  key={item.value}
                  label={item.label}
                  {...field}
                  checked={item.checked}
                  value={item.value}
                  ref={field.ref}
                  onChange={(e) => {
                    field.onChange(e); // call the onChange function of the Controller to trigger validation
                    handleCheckboxChange(e); // call the handleCheckboxChange function to update the form state
                  }}
                />
              ))}
            </>
          )}
        />
        {errors[props.formControlName] && (
          <>
            <div className={classes.divider}></div>
          </>
        )}
      </div>
    </div>
  );
};

export default RadioGroup;
