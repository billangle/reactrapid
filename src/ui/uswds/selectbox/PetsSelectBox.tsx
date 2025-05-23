import { CSSProperties, ReactElement, useEffect } from 'react';
import { PetsOption } from '../../../types/types';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import FormFieldError from '../../form-field-error/FormFieldError';
import classes from './PetsSelectBox.module.scss';

interface PetsSelectProps extends React.HTMLProps<HTMLSelectElement> {
  id: string;
  options: PetsOption[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validations?: any;
  formControlName: string;
  disabled?: boolean;
  value?: string;
  title?: string;
  width?: string;
  handleSelected?: (value: any) => void;
  required?: boolean;
  defaultSelectOption?: string;
  disableDefaultOption?: boolean;
  inputStyle?: CSSProperties;
  onChange?: (value: any) => void;
  forceHideRequiredMark?: boolean;
  labelStyles?: CSSProperties;
  customError?: FieldError | null | undefined; // This will be using when it's difficult to pick the respective error from errors, etc: nested array form
  hideDivider?: boolean;
}

PetsSelectBox.defaultProps = {
  required: true,
  hideDivider: true,
};

function PetsSelectBox(props: PetsSelectProps) {
  const {
    trigger,
    formState: { errors },
    control,
  } = useFormContext();
  return (
    <div
      className={`${classes['form-control']} ${
        errors[props.formControlName] ? classes['has-error'] : ''
      } `}
      style={{ width: props.width, ...props.style }}
    >
      <div className={classes['label-container']}>
        <label
          className="usa-label"
          htmlFor={props.id}
          style={{ marginTop: 0, ...props.labelStyles }}
        >
          {props.label}
          {props.validations?.required && !props.forceHideRequiredMark && (
            <span className={classes.required}>*</span>
          )}
        </label>
      </div>
      {errors[props.formControlName] && !props?.hideDivider && (
        <>
          <FormFieldError
            message={
              (errors[props.formControlName]?.message as string) ||
              props.validations?.message
            }
          />
          <div className={classes.divider}></div>
        </>
      )}
      {props.customError && (
        <>
          <FormFieldError message={props.customError.message as string} />
          <div className={classes.divider}></div>
        </>
      )}
      <Controller
        name={props.formControlName}
        control={control}
        rules={{ ...props.validations }}
        render={({ field }) => (
          <>
            <select
              {...field}
              className="usa-select"
              id={props.id}
              style={{ ...props.inputStyle }}
              disabled={props.disabled}
              aria-label={props?.title ?? props?.id}
              onChange={(e) => {
                field.onChange(e);
                props?.onChange?.(e.target.value);
                trigger(props.formControlName);
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
          </>
        )}
      />
    </div>
  );
}

export default PetsSelectBox;
