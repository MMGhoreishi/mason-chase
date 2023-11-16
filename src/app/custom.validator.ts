import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validateBankAccountNumber(
  control: AbstractControl
): ValidationErrors | null {
  const bankAccountNumberValue = control.value;

  const bankAccountNumberPattern = /^[0-9]{9,18}$/;

  return bankAccountNumberPattern.test(bankAccountNumberValue)
    ? null
    : { validateBankAccountNumber: true };
}
