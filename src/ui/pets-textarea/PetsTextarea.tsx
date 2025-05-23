// eslint-disable-next-line import/named
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { CSSProperties, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import FormFieldError from '../form-field-error/FormFieldError';
import classes from './PetsTextarea.module.scss';
import { Textarea } from '@trussworks/react-uswds';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

interface PetsTextareaProps extends React.HTMLProps<HTMLInputElement> {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validations?: any;
  formControlName: string;
  width?: string;
  typeAsNumber?: boolean;
  icon?: IconDefinition;
  handleIconClick?: () => void;
  style?: CSSProperties | undefined;
  hideLabel?: boolean;
  usage?: number; // Firm = 1, Proposal = 2
  inputHeight?: string;
  labelStyle?: CSSProperties;
  errorFlag?: boolean;
  handleKeyUp?: (evt: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  titleElement?: ReactJSXElement;
  hideDivider?: boolean;
  isSubmit?: boolean;
  borderWith?: string;
}

function PetsTextarea(props: PetsTextareaProps) {
  const {
    trigger,
    control,
    formState: { errors, dirtyFields },
    watch,
  } = useFormContext();
  const formCName = props.formControlName?.split('.');
  const getFormName = () => {
    let error: any = errors;
    formCName.forEach((vl) => {
      error = error?.[vl];
    });
    return error;
  };
  const getDirtyFields = () => {
    let dirty: any = dirtyFields;
    formCName.forEach((vl) => {
      dirty = dirty?.[vl];
    });
    return dirty;
  };
  const hasError =
    formCName?.length > 1 ? !!getFormName() : !!errors[props.formControlName]; // check if there is an error for this control
  const value = watch(props.formControlName) || props.value;
  const [textValue, setTextValue] = useState('');
  const [isSubmit, setIsSubmit] = useState(props?.isSubmit);
  const isDirty =
    formCName?.length > 1
      ? getDirtyFields()
      : dirtyFields[props.formControlName];

  useEffect(() => {
    setTextValue(value?.trim() ? value.trim() : '');
    if (isDirty) trigger(props.formControlName);
  }, [value]);

  useEffect(() => {
    setIsSubmit(props?.isSubmit);
  }, [props?.isSubmit]);
  return (
    <div
      className={`${classes['form-control']} ${
        hasError ? classes['has-error'] : ''
      } ${
        (props.usage === 2 || props.usage === 4) && !hasError
          ? classes['usage-2']
          : ''
      }`}
      style={{
        width: props.width,
        ...props.style,
      }}
    >
      {!props.hideLabel && (
        <div className={classes['label-container']}>
          <label htmlFor={props.id} style={{ ...props.labelStyle }}>
            {props.label || props.titleElement}{' '}
          </label>{' '}
          {!props.titleElement &&
            (props.validations?.required || props.required) && (
              <span className={classes.required}>*</span>
            )}
        </div>
      )}
      {(((errors[props.formControlName] || props.errorFlag) &&
        isSubmit &&
        textValue?.length <= (props?.validations?.minLength?.value ?? 0)) ||
        (formCName?.length > 1 && getFormName()?.message)) && (
        <>
          <FormFieldError
            message={
              formCName?.length > 1
                ? (getFormName()?.message as string)
                : (errors[props.formControlName]?.message as string) ||
                  props.validations?.required
            }
            style={{ fontSize: '1rem' }}
          />
        </>
      )}
      {((props.usage !== 2 && props.usage !== 4) ||
        ((props.usage === 2 || props.usage === 4) &&
          (hasError || props.errorFlag) &&
          // (!props?.defaultValue ||
          isSubmit &&
          textValue?.length <=
            (props?.validations?.minLength?.value ?? 0))) && (
        <div
          className={`${classes.divider} ${
            (hasError || props.errorFlag) && isSubmit
              ? classes['has-error']
              : props.hideDivider && classes.hide
          }`}
          style={{
            width: props.borderWith ? props.borderWith : '0.625rem',
          }}
        ></div>
      )}
      <Controller
        name={props.formControlName}
        control={control}
        rules={{ ...props.validations }}
        render={({ field }) => (
          <>
            <Textarea
              className={classes.textarea}
              {...field}
              id={props.id}
              minLength={props.minLength ?? 0}
              maxLength={props.maxLength}
              disabled={props.disabled}
              // value={textValue}
              defaultValue={props.defaultValue}
              name={props.formControlName}
              onKeyUp={(e) => {
                setIsSubmit(true);
                if (props.handleKeyUp) props.handleKeyUp(e);
              }}
              style={{
                height: props.inputHeight ? props.inputHeight : '10rem',
              }}
            />
            {props.maxLength && (
              <div
                className={
                  props.usage == 6 ? classes.limit4Usage : classes.limit
                }
                style={{ maxWidth: '30rem', width: '100%' }}
              >
                <span>
                  {props.usage === 2
                    ? `${textValue.length}/${props.maxLength} Characters`
                    : props.usage === 6
                    ? `Minimum ${
                        props.minLength ? props.minLength : '20'
                      } characters required. ${textValue.length}/${
                        props.maxLength
                      } Characters`
                    : `Character limit: ${textValue.length}/${props.maxLength}`}
                </span>
              </div>
            )}
          </>
        )}
      />
    </div>
  );
}

export default PetsTextarea;
