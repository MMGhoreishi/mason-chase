import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from 'ngx-intl-tel-input';
import { validateBankAccountNumber } from '../custom.validator';
import { Customer } from '../interfaces/customer';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
})
export class EditCustomerComponent {
  customerForm: FormGroup;

  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.Iran, CountryISO.Germany];

  @Output() editedCustomer = new EventEmitter<Customer>();

  @Input() set selectedCustomer(value: Customer) {
    if (value)
      this.customerForm.setValue({
        Firstname: value.Firstname,
        Lastname: value.Lastname,
        DateOfBirth: value.DateOfBirth,
        PhoneNumber: value.PhoneNumber,
        Email: value.Email,
        BankAccountNumber: value.BankAccountNumber,
      });
  }

  constructor(private fb: FormBuilder) {
    this.myForm();
  }

  myForm() {
    this.customerForm = this.fb.group({
      Firstname: ['', Validators.required],
      Lastname: ['', Validators.required],
      DateOfBirth: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      BankAccountNumber: ['', [Validators.required, validateBankAccountNumber]],
    });
  }

  editCustomer() {
    if (this.customerForm.valid) {
      this.customerForm.value.PhoneNumber =
        this.customerForm.value.PhoneNumber.e164Number;

      this.editedCustomer.emit(this.customerForm.value);
    } else this.customerForm.markAllAsTouched();
  }
}
