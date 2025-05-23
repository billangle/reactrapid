import { CSSProperties, useEffect } from 'react';
import { PetsOption } from '../../types/types';
import { useFormContext } from 'react-hook-form';
import FormFieldError from '../form-field-error/FormFieldError';
import classes from './Select.module.scss';

interface SelectProps extends React.HTMLProps<HTMLSelectElement> {
  options: PetsOption[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validations?: any;
  formControlName?: string;
  errorMessage?: string;
  disabled?: boolean;
  value?: string;
  customError?: any;
  title?: string;
  width?: string;
  handleSelected?: (value: any) => void;
  required?: boolean;
  defaultSelectOption?: string;
  disableDefaultOption?: boolean;
  inputStyle?: CSSProperties;
  onChange?: (value: any) => void;
}

Select.defaultProps = {
  required: true,
};

function Select(props: SelectProps) {
  const { watch, formState, register } = useFormContext();
  const value = watch(props.formControlName!);
  const isTouched = formState.touchedFields[props.formControlName!];

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    props.handleSelected && props.handleSelected(value);
  }, [value]);

  return (
    <div
      className={classes['form-control']}
      style={{ width: props.width, ...props.style }}
    >
      <div className={classes['label-container']}>
        <label htmlFor={props.id}>{props.label}</label>
        {props.validations?.required && (
          <span className={classes.required}>*</span>
        )}
      </div>
      {!Boolean(value) &&
        ((isTouched && props.required) || props.customError) && (
          <>
            <FormFieldError
              message={props.errorMessage || 'This field is required.'}
            />
            <div className={classes.divider}></div>
          </>
        )}
      <select
        id={props.id}
        style={{ ...props.inputStyle }}
        {...register(props.formControlName!)}
        disabled={props.disabled}
        // title={props?.title ?? props?.id}
        aria-label={props?.title ?? props?.id}
        onChange={(e) => {
          props?.onChange?.(e.target.value);
        }}
      >
        {props?.disableDefaultOption && (
          <option value="" selected>
            {props?.defaultSelectOption
              ? props.defaultSelectOption
              : '-Select-'}
          </option>
        )}
        {!props?.disableDefaultOption && (
          <option value="" disabled selected>
            {props?.defaultSelectOption
              ? props.defaultSelectOption
              : '-Select-'}
          </option>
        )}
        {props.options?.map((opt) => (
          <option
            value={opt.value}
            key={opt.value}
            selected={opt.value == props.value}
          >
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
