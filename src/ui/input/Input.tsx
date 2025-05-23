// eslint-disable-next-line import/named
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSProperties, ReactNode, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import FormFieldError from '../form-field-error/FormFieldError';
import classes from './Input.module.scss';
import CustomPopper from '../popper/CustomPopper';
import { colorMap } from '../../types/constants';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@trussworks/react-uswds';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validations?: any;
  formControlName: string;
  width?: string;
  handleKeyUp?: (evt: React.KeyboardEvent<HTMLInputElement>) => void;
  handleKeyDown?: (evt: React.KeyboardEvent<HTMLInputElement>) => void;
  handleOnBlur?: (evt: React.KeyboardEvent<HTMLInputElement>) => void;
  typeAsNumber?: boolean;
  icon?: IconDefinition;
  handleIconClick?: () => void;
  style?: CSSProperties | undefined;
  hideLabel?: boolean;
  divider?: boolean;
  placeholder?: string;
  defaultValue?: string;
  showPopper?: boolean;
  popperText?: string | ReactNode;
  isShowErrorAfterSubmitted?: boolean;
}

Input.defaultProps = {
  divider: true,
};

function Input(props: InputProps) {
  const { formState, trigger, register, watch } = useFormContext();
  const value = watch(props.formControlName);
  let isTouched = formState.touchedFields[props.formControlName];
  if (!isTouched && props.isShowErrorAfterSubmitted && formState.isSubmitted) {
    isTouched = true;
  }
  const [popperAnchorEl, setPopperAnchorEl] = useState<
    HTMLElement | SVGElement | null
  >(null);
  const [showPopper, setShowPopper] = useState<boolean>(false);

  function handleSetPopperAnchorEl(
    e: React.MouseEvent<HTMLElement | SVGElement>,
  ) {
    setPopperAnchorEl(e.currentTarget);
  }

  useEffect(() => {
    trigger(props.formControlName);
  }, [value]);

  return (
    <div
      className={classes['form-control']}
      style={{ width: props.width, ...props.style }}
    >
      {!props.hideLabel && (
        <div className={classes['label-container']}>
          <label className="usa-label" htmlFor={props.id}>
            {props.label}{' '}
            {(props.validations?.required || props.required) && (
              <span className={classes.required}>*</span>
            )}
          </label>
        </div>
      )}
      {isTouched && formState.errors[props.formControlName] && (
        <>
          <FormFieldError
            message={formState.errors[props.formControlName]?.message as string}
          />
          {props.divider && <div className={classes.divider}></div>}
        </>
      )}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        className={
          props.icon &&
          `${
            isTouched && formState.errors[props.formControlName]
              ? classes.error
              : ''
          } ${props.icon ? classes['icon-input'] : ''}`
        }
      >
        <input
          maxLength={props.maxLength}
          disabled={props.disabled}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
          className={
            !props.icon && isTouched && formState.errors[props.formControlName]
              ? classes.error
              : ''
          }
          id={props.id}
          type={props.type ?? 'text'}
          onKeyDown={props.handleKeyDown}
          onKeyUp={(e) => props.handleKeyUp && props.handleKeyUp(e)}
          {...register(props.formControlName, {
            ...props.validations,
          })}
        />
        {props.icon && (
          <FontAwesomeIcon
            onClick={props.handleIconClick}
            icon={props.icon}
            style={{ paddingRight: '1rem' }}
          />
        )}

        {props.showPopper && (
          <>
            <FontAwesomeIcon
              onClick={(e) => {
                handleSetPopperAnchorEl(e);
                setShowPopper((prevShowPopper) => !prevShowPopper);
              }}
              cursor={'pointer'}
              icon={faQuestionCircle}
              fontSize={22.4}
              color={colorMap.primaryBlue}
            />
            <CustomPopper
              open={showPopper}
              popperStyle={{ maxWidth: '55%' }}
              popperAnchorEl={popperAnchorEl}
            >
              <div style={{ fontFamily: 'Roboto' }}>
                <Button
                  style={{ fontSize: '.9rem' }}
                  type="button"
                  unstyled
                  onClick={() => setShowPopper(false)}
                >
                  Close
                </Button>
                {props.popperText}
              </div>
            </CustomPopper>
          </>
        )}
      </div>
    </div>
  );
}

export default Input;
