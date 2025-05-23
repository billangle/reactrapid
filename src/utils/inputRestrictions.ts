export function disallowNonNumbers(event: React.KeyboardEvent) {
  if (
    !/[0-9]/.test(event.key) &&
    event.key !== 'Delete' &&
    event.key !== 'Backspace' &&
    event.key !== 'ArrowLeft' &&
    event.key !== 'ArrowRight'
  ) {
    event.preventDefault();
  }
}

export function convertToCurrencyFormat(val: string) {
  return val ? Intl.NumberFormat('en-US').format(Number(val)) : '';
}

export function onlyNumbersAndPeriods(event: React.KeyboardEvent, val: string) {
  if (
    (!/[0-9]/.test(event.key) &&
      event.key !== 'Delete' &&
      event.key !== 'Backspace' &&
      event.key !== 'ArrowLeft' &&
      event.key !== 'ArrowRight' &&
      event.key !== '.') ||
    (event.key === '.' && (val?.indexOf('.') !== -1 || val === '')) ||
    (val?.indexOf('.') !== -1 &&
      val?.substring(val?.indexOf('.') + 1).length === 2 &&
      /[0-9]/.test(event.key))
  ) {
    event.preventDefault();
  }
}

export function disallowNonAlphanumeric(event: React.KeyboardEvent) {
  if (
    !/[0-9a-zA-Z]/.test(event.key) &&
    event.key !== 'Delete' &&
    event.key !== 'Backspace' &&
    event.key !== 'ArrowLeft' &&
    event.key !== 'ArrowRight'
  ) {
    event.preventDefault();
  }
}

// Add other input restriction functions here
export function onlyNumbersCommasAndNA(
  event: React.KeyboardEvent,
  val: string,
) {
  if (
    /[^Nn\/Aa\d,]/g.test(event.key) &&
    event.key !== 'Delete' &&
    event.key !== 'Backspace' &&
    event.key !== 'ArrowLeft' &&
    event.key !== 'ArrowRight'
  ) {
    event.preventDefault();
  }
}
// Add other input restriction functions here
export function onlyNumbersCommasAndPeriod(
  event: React.KeyboardEvent,
  val: string,
) {
  if (
    /[^Nn\/Aa\d,.]/g.test(event.key) &&
    event.key !== 'Delete' &&
    event.key !== 'Backspace' &&
    event.key !== 'ArrowLeft' &&
    event.key !== 'ArrowRight'
  ) {
    event.preventDefault();
  }
}

export function allowLetterNumberSpecialCharacter(
  event: React.KeyboardEvent,
  val: string,
) {
  const pattern = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;"'<>?.|\\,\/]*$/;

  if (
    !pattern.test(val + event.key) &&
    event.key !== 'Delete' &&
    event.key !== 'Backspace' &&
    event.key !== 'ArrowLeft' &&
    event.key !== 'ArrowRight'
  ) {
    event.preventDefault();
  }
}

export function allowOnlyLetters(event: React.KeyboardEvent, val: string) {
  if (
    !/^[A-Za-z]+$/.test(event.key) &&
    event.key !== 'Delete' &&
    event.key !== 'Backspace' &&
    event.key !== 'ArrowLeft' &&
    event.key !== 'ArrowRight'
  ) {
    event.preventDefault();
  }
}
