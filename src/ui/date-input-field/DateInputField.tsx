import { useEffect, useRef, useState } from 'react';
import classes from './DateInputField.module.scss';
import FormFieldError from '../form-field-error/FormFieldError';
import { disallowNonNumbers } from '../../utils/inputRestrictions';
import {
  isValidDay,
  isValidMonth,
  isValidYear,
} from '../../utils/inputValidations';

type DateInputFieldProps = {
  label?: string;
  required?: boolean;
  className?: string;
  value?: DateType;
  setValue?: (date: DateType) => void;
  errorMessage?: string;
  handleIsValid?: (validState: boolean) => void;
  hideAsterisk?: boolean;
  labelStyle?: any;
  showDivider?: boolean;
  showError?: boolean;
  disabled?: boolean;
  width?: any;
};

export type DateType = {
  mm: string | undefined;
  dd: string | undefined;
  yyyy: string | undefined;
};
// /**
//  * @deprecated  * This function is deprecated. Please use the 'FullDateInputField' component instead. 'FullDateInputField' is built on top of 'react-uswds' and aligns with PETS required UI standards.
//  */
function DateInputField(props: DateInputFieldProps) {
  const [valid, setValid] = useState<boolean>(false);
  const [isYearValid, setIsYearValid] = useState<boolean>(false);
  const [isDayValid, setIsDayValid] = useState<boolean>(false);
  const [isMonthValid, setIsMonthValid] = useState<boolean>(false);
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const monthRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (
      !monthRef.current?.value &&
      !dayRef.current?.value &&
      !yearRef.current?.value &&
      !props.required
    ) {
      setValid(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      props.handleIsValid && props.handleIsValid(true);
    } else if (
      (isMonthValid || isValidMonth(monthRef?.current?.value as string)) &&
      (isDayValid || isValidDay(dayRef?.current?.value as string)) &&
      (isYearValid || isValidYear(yearRef?.current?.value as string))
    ) {
      setValid(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      props.handleIsValid && props.handleIsValid(true);
    } else {
      setValid(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      props.handleIsValid && props.handleIsValid(false);
    }
  }, [props.required]);

  const handleOnBlur = () => {
    setIsTouched(true);
    if (
      !monthRef.current?.value &&
      !dayRef.current?.value &&
      !yearRef.current?.value &&
      !props.required
    ) {
      setValid(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      props.handleIsValid && props.handleIsValid(true);
    } else if (
      (!isMonthValid && !isValidMonth(monthRef?.current?.value as string)) ||
      (!isDayValid && !isValidDay(dayRef?.current?.value as string)) ||
      (!isYearValid && !isValidYear(yearRef?.current?.value as string))
    ) {
      setValid(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      props.handleIsValid && props.handleIsValid(false);
    } else {
      setValid(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      props.handleIsValid && props.handleIsValid(true);
    }
  };

  return (
    <div className={classes.wrapper}>
      <div>
        <p style={props.labelStyle}>
          {props.label}{' '}
          {props.required && !props.hideAsterisk && (
            <span className={classes.required}> * </span>
          )}
        </p>
        {!valid && (isTouched || props.showError) && (
          <FormFieldError message={props.errorMessage} />
        )}
        <div
          onBlur={handleOnBlur}
          className={`${classes.container} ${
            props?.className ? classes[props.className] : ''
          }`}
          tabIndex={0}
          style={{ width: props?.width || '65%' }}
        >
          <div className={classes.item}>
            <label htmlFor="month">Month</label>
            <input
              defaultValue={props.value?.mm}
              required={props.required}
              ref={monthRef}
              type="text"
              minLength={2}
              maxLength={2}
              id="month"
              placeholder="MM"
              disabled={props?.disabled}
              style={{ width: '3.5rem' }}
              onKeyDown={disallowNonNumbers}
              onKeyUp={(e) => {
                setIsMonthValid(
                  isValidMonth((e.target as HTMLInputElement).value),
                );
                if (props?.setValue) {
                  props?.setValue({
                    mm: monthRef?.current?.value,
                    dd: dayRef?.current?.value,
                    yyyy: yearRef?.current?.value,
                  });
                }
              }}
              onChange={() =>
                props.setValue &&
                props.setValue({
                  mm: monthRef?.current?.value,
                  dd: dayRef?.current?.value,
                  yyyy: yearRef?.current?.value,
                })
              }
            />
          </div>
          <div className={classes.item}>
            <label htmlFor="day">Day</label>
            <input
              defaultValue={props.value?.dd}
              required={props.required}
              ref={dayRef}
              type="text"
              minLength={2}
              disabled={props?.disabled}
              maxLength={2}
              id="day"
              placeholder="DD"
              style={{ width: '3rem' }}
              onKeyUp={(e) => {
                setIsDayValid(isValidDay((e.target as HTMLInputElement).value));
                if (props?.setValue) {
                  props?.setValue({
                    mm: monthRef?.current?.value,
                    dd: dayRef?.current?.value,
                    yyyy: yearRef?.current?.value,
                  });
                }
              }}
              onKeyDown={disallowNonNumbers}
              onChange={() =>
                props.setValue &&
                props.setValue({
                  mm: monthRef?.current?.value,
                  dd: dayRef?.current?.value,
                  yyyy: yearRef?.current?.value,
                })
              }
            />
          </div>
          <div className={classes.item}>
            <label htmlFor="year">Year</label>
            <input
              defaultValue={props.value?.yyyy}
              required={props.required}
              ref={yearRef}
              type="text"
              minLength={4}
              maxLength={4}
              id="year"
              placeholder="YYYY"
              onKeyDown={disallowNonNumbers}
              style={{ width: '4.5rem' }}
              disabled={props?.disabled}
              onKeyUp={(e) => {
                setIsYearValid(
                  isValidYear((e.target as HTMLInputElement).value),
                );
                if (props?.setValue) {
                  props?.setValue({
                    mm: monthRef?.current?.value,
                    dd: dayRef?.current?.value,
                    yyyy: yearRef?.current?.value,
                  });
                }
              }}
              onChange={() =>
                props.setValue &&
                props.setValue({
                  mm: monthRef?.current?.value,
                  dd: dayRef?.current?.value,
                  yyyy: yearRef?.current?.value,
                })
              }
            />
          </div>
        </div>
      </div>
      {props.showDivider && (
        <div
          className={`${classes.divider} ${
            !valid && (isTouched || props.showError) ? classes.error : ''
          }`}
        ></div>
      )}
    </div>
  );
}

export default DateInputField;
