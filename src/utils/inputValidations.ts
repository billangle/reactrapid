// checks that value only contains numbers and is of a given length
export function isValidNumber(
  startLen: number,
  value: string,
  isRequired = true,
): boolean {
  if (!value) {
    return !isRequired;
  }
  if (!value.trim().length && !isRequired) {
    return true;
  }
  const pattern = new RegExp(`^[0-9]{${startLen}}$`);
  return pattern.test(value.trim());
}

// checks that value only contains numbers and is of a given length range
export function isValidNumberWithRange(
  minLen: number,
  maxLen: number,
  value: string,
  isRequired = true,
): boolean {
  if (!value) {
    return !isRequired;
  }
  if (!value.trim().length && !isRequired) {
    return true;
  }
  const pattern = new RegExp(`^[0-9]{${minLen},${maxLen}}$`);
  return pattern.test(value.trim());
}

// checks that value only contains numbers and/or letters and is of a given length
export function isValidAlphanumeric(
  len: number,
  value: string,
  isRequired = true,
): boolean {
  if (!value) return true;
  if (!value.trim().length && !isRequired) {
    return true;
  }
  const regex = new RegExp(`^[a-zA-Z0-9]{${len}}$`);
  return regex.test(value.trim());
}

export function isValidNumPlus(
  value: string,
  firstNumLen: number,
  secondNumLen: number,
): boolean {
  const regex = new RegExp(`^[0-9]{${firstNumLen}}-[0-9]{${secondNumLen}}$`);
  return regex.test(value.trim());
}

export function validateRequired(
  value: string,
  msg = 'This field is required',
) {
  if (!value || value.trim() === '') {
    return msg;
  }
  return null;
}

export function isValidEmail(value: string, msg = '') {
  const re = /\S+@\S+\.\S+/;
  return re.test(value) ? true : msg;
}

export function isValidYear(year: string): boolean {
  const parsedYear = parseInt(year, 10);
  const yearPattern = /^\d{4}$/;
  return !isNaN(parsedYear) && yearPattern.test(year) && parsedYear > 1957;
}

export function isValidMonth(month: string) {
  // Validates that a string is a valid month in MM format
  const pattern = /^\d{2}$/;
  if (!pattern.test(month)) {
    return false;
  }
  const monthInt = parseInt(month, 10);
  return monthInt >= 1 && monthInt <= 12;
}

export function isValidDay(day: string) {
  // Validates that a string is a valid day in DD format
  const pattern = /^\d{2}$/;
  if (!pattern.test(day)) {
    return false;
  }
  const dayInt = parseInt(day, 10);
  return dayInt >= 1 && dayInt <= 31;
}
