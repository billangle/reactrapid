import { useState, useEffect } from 'react';
import classes from './PasswordStrengthBar.module.scss';

type Props = {
  password: string;
};

enum PasswordStrength {
  STRONG = 'Strong',
  GOOD = 'Good',
  MODERATE = 'Moderate',
  WEAK = 'Weak',
}

const PasswordStrengthBar = ({ password }: Props) => {
  const [segments, setSegments] = useState([false, false, false, false]);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>(
    PasswordStrength.WEAK,
  );
  const [color, setColor] = useState<string>('');

  useEffect(() => {
    evaluatePasswordStrength();
  }, [password]);

  const evaluatePasswordStrength = () => {
    // Define the strength conditions
    // const hasPasswordLength = password.length > 0;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLengthValid = password.length >= 8;
    const numberOfTrueValues = [
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar,
      isLengthValid,
    ].filter((value) => value).length;
    // Evaluate strength based on conditions
    if (numberOfTrueValues > 4) {
      setPasswordStrength(PasswordStrength.STRONG);
      setSegments([true, true, true, true]);
      setColor('darkgreen');
    } else if (numberOfTrueValues > 3) {
      setPasswordStrength(PasswordStrength.GOOD);
      setSegments([true, true, true, false]);
      setColor('blue');
    } else if (numberOfTrueValues > 2) {
      setPasswordStrength(PasswordStrength.MODERATE);
      setSegments([true, true, false, false]);
      setColor('orange');
    } else if (numberOfTrueValues > 0) {
      setPasswordStrength(PasswordStrength.WEAK);
      setSegments([true, false, false, false]);
      setColor('red');
    } else {
      setPasswordStrength(PasswordStrength.WEAK);
      setSegments([false, false, false, false]);
      setColor('red');
    }
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          gap: '5px',
          width: '28.75%',
        }}
      >
        {segments.map((segment, index) => (
          <div
            key={index}
            style={{
              height: '10px',
              width: '25%',
              border: '1px solid',
              backgroundColor: segment ? color : '',
            }}
          ></div>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          gap: '5px',
          width: '28.75%',
        }}
      >
        <span className={classes['pass-strength-item']}>
          <br></br>
          Password Strength:{' '}
        </span>
        <span className={classes['pass-strength-item']}>
          <br></br>
          <span style={{ color: color, fontWeight: 'bold' }}>
            {passwordStrength}
          </span>
        </span>
      </div>
    </>
  );
};

export default PasswordStrengthBar;
