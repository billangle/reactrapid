import {
    faCheck,
    faEye,
    faEyeSlash,
    faXmark,
    faCheckCircle,
    faXmarkCircle,
  } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { Button } from '@trussworks/react-uswds';
  import React, { useState, useEffect, ChangeEvent } from 'react';
  import { Helmet } from 'react-helmet';
  import { useForm, FormProvider } from 'react-hook-form';
  import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
  import { STATES, colorMap, EMAIL_REGEX } from '../../../types/constants';
  import { UserDetails, User } from '../types';
  import useLocalStorage from '../../../hooks/useLocalStorage';
  import Background from '../../../ui/background/Background';
  import Header from '../../header/Header';
  import { HEADER_BACKGROUND } from '../../../types/enums';
  import CustomAlert from '../../../ui/alert/CustomAlert';
  import classes from './NewUserRegistration.module.scss';
  import {
    isValidNumPlus,
    validateRequired,
  } from '../../../utils/inputValidations';
  import Card from '../../../ui/card/Card';
  import Select from '../../../ui/select/Select';
  import Input from '../../../ui/input/Input';
  import { PASSWORD_REQUIREMENTS, PREFIXES, SECURITY } from './constants';
  import { Checkbox, FormControlLabel } from '@mui/material';
  import { disallowNonNumbers } from '../../../utils/inputRestrictions';
  import PasswordStrengthBar from '../../../ui/password-strength-bar/PasswordStrengthBar';
  import RegistrationSuccess from './RegistrationSuccess';
  import { useDispatch, useSelector } from 'react-redux';
  import { AppDispatch } from '../../../_store/store';
  import { submitNewUser } from './helpers';
  import { RootState } from '../../../_store/rootReducer';
  import {
    buildSBCFirmRegistrationLocalStorageKey,
    getStateAbbr,
  } from './helpers';
  
  const defaultValues: Partial<User> = {};
  
  function NewUserRegistration() {
    const [isShowAddress, setShowAddress] = useState(false);
    const [defaultAddress, setDefaultAddress] = useState({
      street: '',
      apt: '',
      city: '',
      state: '',
      zip: '',
      website: '',
    });
    const methods = useForm<UserDetails | Partial<UserDetails>>({
      defaultValues,
    });
    const [searchParam] = useSearchParams();
    const location = useLocation();
    const [type, setType] = useState<'SBC' | 'RI'>();
  
    const [sameAsFirmAddressCheck, setSameAsFirmAddressCheck] = useState(false);
    const [phone, setPhone] = useState('');
  
    const [confirmPassword, setConfirmPassword] = useState('');
    const [saving, setSaving] = useState(false);
    const [isPassVisible, setIsPassVisible] = useState(false);
    const [isConfirmPassVisible, setIsConfirmPassVisible] = useState(false);
    const [pinLength, setPinLength] = useState(false);
    const [atleast8, setAtLeast8] = useState(false);
    const [passMatch, setPassMatch] = useState(false);
    const [containsNumber, setContainsNumber] = useState(false);
    const [containsSpecial, setContainsSpecial] = useState(false);
    const [containsUpper, setContainsUpper] = useState(false);
    const [containsLower, setContainsLower] = useState(false);
    const [sameAsFirmPhoneCheck, setSameAsFirmPhoneCheck] = useState(false);
    const [emailIcon, setEmailIcon] = useState(false);
    const [confirmEmailIcon, setConfirmEmailIcon] = useState(false);
    const [emailValue, setEmailValue] = useState('');
    const [confirmEmailValue, setConfirmEmailValue] = useState('');
    const [einParam, setEinParam] = useState('');
    const [emailParam, setEmailParam] = useState('');
    const [isNewFirm, setIsNewFirm] = useState<boolean>(false);
  
    const dispatch = useDispatch<AppDispatch>();
    const [userData, setUserData] = useState<any>();
    const [firmInfo, setFirmInfo] = useState<any>();
    const [firmDataLocalStorageKey, setfirmDataLocalStorageKey] =
      useState<string>();
    const [newRIFirmRegistered, setNewRIFirmRegistered] =
      useState<boolean>(false);

    const prevRoute = "/login";
  
    const navigate = useNavigate();
  
    const topTitleRegistration = (
      <h1 style={{ fontSize: '1.45rem' }}>
       Right Angle Research Registration
      </h1>
    );
    const password = methods.watch('password');
    const emailField = methods.watch('email');
    const [confirmEmail, setConfirmEmail] = useLocalStorage<string>(
      'confirmEmail',
      '',
    );
  
    const [registrationError, setRegistrationError] = useState<string>();
  
    const [successfulRegistration, setSuccessfulRegistration] =
      useState<boolean>(false);
  
    useEffect(() => {
      window.scrollTo({ top: 0 });
    }, []);
  
    useEffect(() => {
      if (userData) {
        methods.setValue('firstName', userData.FirstName);
        methods.setValue('lastName', userData.LastName);
        methods.setValue('email', userData.email);
        setEmailIcon(true);
      }
    }, [userData]);
  
    useEffect(() => {
      methods.trigger('confirmPassword');
      if (password?.length) {
        if (password.length >= 8) {
          setAtLeast8(true);
        } else {
          setAtLeast8(false);
        }
        if (containsSpecialChar(password)) {
          setContainsSpecial(true);
        } else {
          setContainsSpecial(false);
        }
        if (containsUpperChar(password)) {
          setContainsUpper(true);
        } else {
          setContainsUpper(false);
        }
        if (containsLowerChar(password)) {
          setContainsLower(true);
        } else {
          setContainsLower(false);
        }
        if (password && confirmPassword && password === confirmPassword) {
          setPassMatch(true);
        } else {
          setPassMatch(false);
        }
        if (containsANumber(password)) {
          setContainsNumber(true);
        } else {
          setContainsNumber(false);
        }
      } else {
        setAtLeast8(false);
        setContainsNumber(false);
        setContainsLower(false);
        setContainsUpper(false);
        // setPassMatch(false);
        setPinLength(false);
      }
    }, [password]);
  
    useEffect(() => {
      setEmailValue(emailField ?? '');
      setTimeout(() => {
        setConfirmEmailIcon(emailField === confirmEmailValue);
        methods.trigger('confirmEmail');
      }, 200);
    }, [emailField]);
  
    useEffect(() => {
      setEmailValue(confirmEmail);
      setTimeout(() => {
        setConfirmEmailIcon(confirmEmail === emailValue);
        methods.trigger('email');
      }, 200);
    }, [confirmEmail]);
  
    function handleZipPlusFourFormat(e: React.KeyboardEvent<HTMLInputElement>) {
      const val = (e.target as HTMLInputElement).value.replace('-', '');
      if (val.length > 5) {
        methods.setValue('zip', val.substring(0, 5) + '-' + val.substring(5));
      } else {
        methods.setValue('zip', val.replaceAll('-', ''));
      }
    }
  
    function handlePhoneFormat(e: React.KeyboardEvent<HTMLInputElement>) {
      const phoneType =
        (e.target as HTMLInputElement).name === 'phone' ? 'phone' : 'phone2';
      let val = (e.target as HTMLInputElement).value.replaceAll('-', '');
      val = val.replace(' ', '');
      if (val.length > 3 && val.length < 6 && e.key !== 'Backspace') {
        methods.setValue(phoneType, val.substring(0, 3) + '-' + val.substring(3));
      } else if (val.length >= 6 && e.key !== 'Backspace') {
        methods.setValue(
          phoneType,
          val.substring(0, 3) +
            '-' +
            val.substring(3, 6) +
            '-' +
            val.substring(6),
        );
      } else if (e.key === 'Backspace') {
        methods.setValue(phoneType, val);
      }
    }
  
    function validatePass(val: string): boolean | string {
      return (
        /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(
          val,
        ) || 'Password should match the below requirements.'
      );
    }
  
    function validateUsername(val: string): boolean | string {
      return (
        /^[\p{L}\p{M}\p{N}\p{P}]+$/gu.test(val) ||
        'Username contains forbidden characters.'
      );
    }
  
    function containsUpperChar(val: string): boolean | string {
      return /[A-Z]/.test(val);
    }
  
    function containsLowerChar(val: string): boolean | string {
      return /[a-z]/.test(val);
    }
  
    function containsSpecialChar(val: string): boolean | string {
      return /[\^\$\*\.\[\]\{\}\(\)\?\-\"\!\@\#\%\&\/\\\,\>\<\'\:\;\|\_\~\`\+\=\`]/.test(
        val,
      );
    }
  
    function containsANumber(val: string): boolean | string {
      return /\d/.test(val);
    }
  
    function validateConfirmPass(val: string) {
      setConfirmPassword(val);
      if (!password && !val) {
        setPassMatch(false);
        return false;
      }
      setPassMatch(password === val);
      return (
        password === val ||
        "This password doesn't match. Please confirm and re-enter the information."
      );
    }
  
    function handleChangeSameAsPhone(
      event: ChangeEvent<HTMLInputElement>,
      checked: boolean,
    ): void {
      setSameAsFirmPhoneCheck((prev) => !prev);
      methods.setValue(
        'phone',
        !sameAsFirmPhoneCheck ? (firmInfo?.phone ? firmInfo.phone : phone) : '',
        {
          shouldValidate: firmInfo?.phone && sameAsFirmPhoneCheck ? false : true,
        },
      );
    }
  
    function handleChangeSameAsAddress(): void {
      setSameAsFirmAddressCheck((prev) => !prev);
      setShowAddress((value) => !value);
    }
  
    function cancelSubmit() {
      const confirmation = confirm('Data will be lost if you proceed Back.');
      if (confirmation) {
          navigate('/login');
      }

    }
  
    function submitForm(data: any) {
      setSaving(true);
      console.log('submitForm data:', data);
      delete data.confirmEmail;
     // delete data.confirmPassword;
     submitNewUser(data, setSuccessfulRegistration, setRegistrationError, firmDataLocalStorageKey, setSaving);

    }
  
    function validateEmail(e: React.KeyboardEvent<HTMLInputElement>) {
      const val = (e.target as HTMLInputElement).value;
      setEmailValue(val);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      EMAIL_REGEX.test(val) ? setEmailIcon(true) : setEmailIcon(false);
    }
    function validateConfirmEmail(e: React.KeyboardEvent<HTMLInputElement>) {
      const val = (e.target as HTMLInputElement).value;
      setConfirmEmailValue(val);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      EMAIL_REGEX.test(val)
        ? emailValue === val
          ? setConfirmEmailIcon(true)
          : setConfirmEmailIcon(false)
        : setConfirmEmailIcon(false);
    }
    function validateConfirmEmailMatch(value: string) {
      const confirm =
        confirmEmailValue !== '' && value === '' ? confirmEmailValue : value;
      return (
        emailValue === confirm ||
        "This Email doesn't match. Please confirm and re-enter the information."
      );
    }
    function validateEmailMatch(value: string) {
      return confirmEmail !== ''
        ? confirmEmailValue === value ||
            "This Email doesn't match. Please confirm and re-enter the information."
        : true;
    }
    function passwordValidationCheck(e: React.KeyboardEvent<HTMLInputElement>) {
      const val = (e.target as HTMLInputElement).value;
      if (val === '') {
        setAtLeast8(false);
        setContainsNumber(false);
        setPassMatch(false);
        setContainsSpecial(false);
        setContainsLower(false);
        setContainsUpper(false);
      }
    }
    function confirmPasswordValidationCheck(
      e: React.KeyboardEvent<HTMLInputElement>,
    ) {
      const val = (e.target as HTMLInputElement).value;
      if (val === '') {
        setPassMatch(false);
      }
    }
  
    return (
      <>
        <Helmet>
          <title>Registration -Right Angle Research</title>
        </Helmet>
        <Background
          backgroundColor={HEADER_BACKGROUND.WhiteIsotope}
          height="242.031px"
        >
          <Header
            includeLogoHeader={true}
            topTitle={topTitleRegistration}
            dividerWidth={50}
          />
        </Background>
        {successfulRegistration ? (
          <RegistrationSuccess email={emailField} />
        ) : (
          <>
            {registrationError && (
              <CustomAlert
                type="error"
                text={registrationError}
                iconColor={colorMap.crimson}
                style={{ width: '70%', margin: '1rem auto' }}
              />
            )}
            <Card customClass={classes.card}>
              <FormProvider {...methods}>
                <form>
                  {/* Your information */}
                  <h2 className={classes.title}>Your Information</h2>
                  <CustomAlert
                    type="info"
                    text="Please do not register yourself more than once."
                    style={{ fontWeight: '700' }}
                  />
                  <br></br>
                  <div className={classes.ids}>
                    <Select
                      width={'20%'}
                      options={PREFIXES}
                      label={'Prefix'}
                      id="prefix"
                      formControlName="prefix"
                      required={false}
                    />
                    <Input
                      style={{ width: '20rem' }}
                      label={'First Name'}
                      id="firstName"
                      formControlName="firstName"
                      aria-required="true"
                      type="text"
                      validations={{
                        required: 'Enter your first name.',
                      }}
                    />
                    <div className={classes['last-name']}>
                      <Input
                        style={{ width: '20rem' }}
                        label={'Last Name'}
                        id="lastName"
                        formControlName="lastName"
                        aria-required="true"
                        type="text"
                        validations={{
                          required: 'Enter your last name.',
                        }}
                      />
                      <Input
                        style={{ width: '10rem' }}
                        label={'Suffix'}
                        id="suffix"
                        formControlName="suffix"
                        type="text"
                      />
                    </div>
                  </div>
  
                  {/* Your address */}
                  <h2>Your Address</h2>
                  <br />
                  <div className={classes.row}>
                    <Input
                      width="70%"
                      label="Street"
                      id="street"
                      formControlName="street1"
                      aria-required="true"
                      type="text"
                      required
                      defaultValue={isShowAddress ? defaultAddress.street : ''}
                      validations={{
                        validate: (value: string) =>
                          validateRequired(value, 'Enter your street address.'),
                      }}
                      disabled={isShowAddress}
                    />
                    <Input
                      width="15%"
                      label="Apt/Suite"
                      id="apt"
                      formControlName="apt"
                      aria-required="true"
                      type="text"
                      disabled={isShowAddress}
                      defaultValue={isShowAddress ? defaultAddress.apt : ''}
                    />
                  </div>
                  <div className={classes.row}>
                    <Input
                      width="50%"
                      label="City"
                      id="city"
                      formControlName="city"
                      aria-required="true"
                      type="text"
                      required
                      validations={{
                        validate: (value: string) =>
                          validateRequired(value, 'Enter your city.'),
                      }}
                      disabled={isShowAddress}
                      defaultValue={isShowAddress ? defaultAddress.city : ''}
                    />
                    <Select
                      options={STATES}
                      width="20%"
                      label="State/Territory"
                      id="state"
                      formControlName="state"
                      aria-required="true"
                      type="text"
                      disabled={isShowAddress}
                      defaultValue={isShowAddress ? defaultAddress.state : ''}
                      validations={{
                        required: 'Select your state.',
                      }}
                      onChange={(vals) => methods.setValue('state', vals)}
                    />
                    <Input
                      style={{ textTransform: 'none' }}
                      width="120px"
                      label="ZIP+4"
                      id="zip"
                      formControlName="zip"
                      type="text"
                      maxLength={10}
                      aria-required="true"
                      handleKeyDown={disallowNonNumbers}
                      handleKeyUp={handleZipPlusFourFormat}
                      validations={{
                        required:
                          'Enter your five-digit ZIP code, including the 4-digit identifier.',
                        validate: (value: string) =>
                          isValidNumPlus(value, 5, 4) ||
                          'Enter your five-digit ZIP code, including the 4-digit identifier.',
                      }}
                      disabled={isShowAddress}
                      showPopper={true}
                      popperText={
                        <p style={{ fontSize: '1.13rem' }}>
                          We use ZIP+4 for reporting by congressional district. If
                          you do not know the +4 identifier for your ZIP Code, you
                          can look it up at&nbsp;
                          <strong>
                            <a href="https://tools.usps.com/zip-code-lookup.htm?byaddress">
                              {' '}
                              https://tools.usps.com/zip-code-lookup.htm?byaddress
                            </a>
                          </strong>
                        </p>
                      }
                      defaultValue={isShowAddress ? defaultAddress.zip : ''}
                    />{' '}
                  </div>
                  {/* firm contact information */}
                  <h2 className={classes.title}>Your Contact Information</h2>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Input
                      width="50%"
                      label={'Email'}
                      id="email"
                      min={0}
                      formControlName="email"
                      aria-required="true"
                      type="email"
                      validations={{
                        required: 'Enter your Email Address.',
                        validate: (val: string) => validateEmailMatch(val),
                        pattern: {
                          value: EMAIL_REGEX,
                          message: 'Enter a valid e-mail address.',
                        },
                      }}
                      handleKeyUp={validateEmail}
                    />
                    {emailValue != '' && (
                      <FontAwesomeIcon
                        icon={emailIcon ? faCheckCircle : faXmarkCircle}
                        style={{
                          paddingLeft: '1rem',
                          color: `${emailIcon ? 'green' : 'red'}`,
                        }}
                      />
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Input
                      width="50%"
                      label={'Confirm Email'}
                      id="confirmEmail"
                      min={0}
                      formControlName="confirmEmail"
                      aria-required="true"
                      type="email"
                      validations={{
                        required:
                          'Please re-enter your email address for confirmation.',
                        validate: (val: string) => validateConfirmEmailMatch(val),
                        pattern: {
                          value: EMAIL_REGEX,
                          message: 'Enter a valid e-mail address.',
                        },
                      }}
                      handleKeyUp={validateConfirmEmail}
                    />
  
                    {confirmEmailValue != '' && (
                      <FontAwesomeIcon
                        icon={confirmEmailIcon ? faCheckCircle : faXmarkCircle}
                        style={{
                          paddingLeft: '1rem',
                          color: `${confirmEmailIcon ? 'green' : 'red'}`,
                        }}
                      />
                    )}
                  </div>
  
                  <div style={{ display: 'flex' }}>
                    <Input
                      width="30%"
                      label="Phone 1"
                      id="phone"
                      formControlName="phone"
                      aria-required="true"
                      type="text"
                      handleKeyDown={disallowNonNumbers}
                      maxLength={12}
                      handleKeyUp={handlePhoneFormat}
                      disabled={sameAsFirmPhoneCheck}
                      defaultValue={sameAsFirmPhoneCheck ? '123-456-7890' : ''}
                      validations={{
                        required:
                          'Enter your your 10-digit phone number, including the area code.',
                        validate: (value: string) => {
                          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                          value.trim().length === 12 ||
                            'Enter your your 10-digit phone number, including the area code.';
                        },
                      }}
                    />
                    {type === 'SBC' && (
                      <FormControlLabel
                        style={{ width: '30%' }}
                        control={
                          <Checkbox
                            checked={sameAsFirmPhoneCheck}
                            onChange={handleChangeSameAsPhone}
                            name="SameAsFirmPhoneCheckbox"
                            style={{ marginLeft: '5%' }}
                          />
                        }
                        label=" Same as my firm's phone"
                      />
                    )}
                  </div>
                  <Input
                    width="30%"
                    label="Phone 2"
                    id="phone"
                    formControlName="phone2"
                    aria-required="true"
                    type="text"
                    handleKeyDown={disallowNonNumbers}
                    maxLength={12}
                    handleKeyUp={handlePhoneFormat}
                  />
                  <br></br>
  
                  {/* Login Credentials */}
                  <h2 className={classes.title}>Your Login Credentials</h2>
  
                  <br></br>
                  <Input
                    width="29%"
                    label={'Username'}
                    id="username"
                    min={0}
                    formControlName="username"
                    aria-required="true"
                    type="text"
                    validations={{
                      required: 'Please create a User Name.',
                      validate: (val: string) => validateUsername(val),
                    }}
                  />
                  <Input
                    icon={isPassVisible ? faEye : faEyeSlash}
                    handleIconClick={() =>
                      setIsPassVisible((prevState) => !prevState)
                    }
                    label={'Create Password'}
                    id="password"
                    formControlName="password"
                    aria-required="true"
                    type={isPassVisible ? 'text' : 'password'}
                    validations={{
                      required:
                        'Please select a password that meets all of the requirements listed.',
                      validate: (val: string) => validatePass(val),
                    }}
                    handleKeyUp={passwordValidationCheck}
                  />
                  <Input
                    icon={isConfirmPassVisible ? faEye : faEyeSlash}
                    handleIconClick={() =>
                      setIsConfirmPassVisible((prevState) => !prevState)
                    }
                    label={'Confirm Password'}
                    id="confirmPassword"
                    formControlName="confirmPassword"
                    aria-required="true"
                    type={isConfirmPassVisible ? 'text' : 'password'}
                    validations={{
                      required: 'Please enter confirmation of password.',
                      validate: (val: string) => validateConfirmPass(val),
                    }}
                    handleKeyUp={confirmPasswordValidationCheck}
                  />
                  <PasswordStrengthBar password={password ?? ''} />
                  <h3 className={classes['pass-requirements']}>
                    Password Requirements:
                  </h3>
                  <ul className={classes['pass-req-item']}>
                    <li>
                      {atleast8 ? (
                        <FontAwesomeIcon
                          style={{ marginRight: '.5rem' }}
                          icon={faCheck}
                          color={colorMap.forestGreen}
                        />
                      ) : (
                        <FontAwesomeIcon
                          style={{ marginRight: '.5rem' }}
                          color={colorMap.crimson}
                          icon={faXmark}
                        />
                      )}
                      {PASSWORD_REQUIREMENTS.atleast8}
                    </li>
                    <li>
                      {containsNumber ? (
                        <FontAwesomeIcon
                          style={{ marginRight: '.5rem' }}
                          icon={faCheck}
                          color={colorMap.forestGreen}
                        />
                      ) : (
                        <FontAwesomeIcon
                          style={{ marginRight: '.5rem' }}
                          color={colorMap.crimson}
                          icon={faXmark}
                        />
                      )}
                      {PASSWORD_REQUIREMENTS.containsNumber}
                    </li>
                    <li>
                      {containsUpper ? (
                        <FontAwesomeIcon
                          style={{ marginRight: '.5rem' }}
                          icon={faCheck}
                          color={colorMap.forestGreen}
                        />
                      ) : (
                        <FontAwesomeIcon
                          style={{ marginRight: '.5rem' }}
                          color={colorMap.crimson}
                          icon={faXmark}
                        />
                      )}
                      {PASSWORD_REQUIREMENTS.containsUpper}
                    </li>
                    <li>
                      {containsLower ? (
                        <FontAwesomeIcon
                          style={{ marginRight: '.5rem' }}
                          icon={faCheck}
                          color={colorMap.forestGreen}
                        />
                      ) : (
                        <FontAwesomeIcon
                          style={{ marginRight: '.5rem' }}
                          color={colorMap.crimson}
                          icon={faXmark}
                        />
                      )}
                      {PASSWORD_REQUIREMENTS.cotainsLower}
                    </li>
                    <li>
                      {containsSpecial ? (
                        <FontAwesomeIcon
                          style={{ marginRight: '.5rem' }}
                          icon={faCheck}
                          color={colorMap.forestGreen}
                        />
                      ) : (
                        <FontAwesomeIcon
                          style={{ marginRight: '.5rem' }}
                          color={colorMap.crimson}
                          icon={faXmark}
                        />
                      )}
                      {PASSWORD_REQUIREMENTS.containsSpecial}
                    </li>
                    <li>
                      {passMatch ? (
                        <FontAwesomeIcon
                          style={{ marginRight: '.5rem' }}
                          icon={faCheck}
                          color={colorMap.forestGreen}
                        />
                      ) : (
                        <FontAwesomeIcon
                          style={{ marginRight: '.5rem' }}
                          color={colorMap.crimson}
                          icon={faXmark}
                        />
                      )}
                      {PASSWORD_REQUIREMENTS.passMatch}
                    </li>
                  </ul>
                </form>
              </FormProvider>
            </Card>
  
            <div className={classes['action-btns']}>
              <Button
                type="button"
                className={classes.cancel}
                onClick={() => navigate('/login')}
              >
                Cancel
              </Button>
              {!emailParam && (
                <Button
                  type="button"
                  className={classes.next}
                  onClick={cancelSubmit}
                >
                  Back
                </Button>
              )}
              {saving && (
                <Button
                  disabled={true}
                  type="button"
                  className={classes['is-saving']}
                >
                  <span></span> {'Saving...'}{' '}
                </Button>
              )}
              {!saving && (
                <Button
                  type="button"
                  className={classes.next}
                  disabled={!methods.formState.isValid}
                  onClick={methods.handleSubmit(submitForm)}
                  style={{ textTransform: 'none' }}
                >
                  Finish and Register
                </Button>
              )}
            </div>
          </>
        )}
      </>
    );
  }
  
  export default NewUserRegistration;
  