import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Box } from '@mui/system';
import { DateInput, DateInputGroup, Fieldset } from '@trussworks/react-uswds';
import { useEffect, useState } from 'react';
import { colorMap } from '../../types/constants';


type Props = {
  hint?: string;
  label?: string | ReactJSXElement;
  disabled?: boolean;
  onChange?: () => void;
  defaultMonth?: string;
  defaultDay?: string;
  defaultYear?: string;
};

function FullDateInputField(props: Props) {
  const {
    hint,
    label,
    disabled,
    defaultMonth,
    defaultDay,
    defaultYear,
    onChange,
  } = props;
  const [mm, setMonth] = useState<string>('');
  const [dd, setDay] = useState<string>('');
  const [yyyy, setYear] = useState<string>('');

  useEffect(() => {
    setMonth(defaultMonth ?? '');
    setDay(defaultDay ?? '');
    setYear(defaultYear ?? '');
  }, [defaultDay, defaultMonth, defaultYear]);

  return (
    <Fieldset legend={label}>
      <Box
        sx={{
          border: `1px solid ${colorMap.silver}`,
          width: 'fit-content',
          padding: '.5rem 1.5rem 2rem',
        }}
      >
        {hint && (
          <span className="usa-hint" id="dateOfBirthHint">
            {hint}
          </span>
        )}
        <DateInputGroup>
          <DateInput
            id="month"
            name="month"
            label="Month"
            unit="month"
            maxLength={2}
            minLength={2}
            placeholder="MM"
            disabled={disabled}
            min={1}
            max={12}
            value={defaultMonth && !mm ? defaultMonth : mm}
            onChange={(e) => setMonth((e.target as any).value)}
          />
          <DateInput
            id="day"
            name="day"
            label="Day"
            unit="day"
            maxLength={2}
            minLength={2}
            placeholder="DD"
            disabled={disabled}
            min={1}
            max={31}
            value={defaultDay && !dd ? defaultDay : dd}
            onChange={(e) => setDay((e.target as any).value)}
          />
          <DateInput
            id="year"
            name="year"
            label="Year"
            unit="year"
            maxLength={4}
            minLength={4}
            placeholder="YYYY"
            disabled={disabled}
            min={1900}
            max={2300}
            value={defaultYear && !yyyy ? defaultYear : yyyy}
            onChange={(e) => setYear((e.target as any).value)}
          />
        </DateInputGroup>
      </Box>
    </Fieldset>
  );
}

export default FullDateInputField;
