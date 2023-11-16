import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateBankAccountNumber } from '../custom.validator';
import { Customer } from '../interfaces/customer';
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from 'ngx-intl-tel-input';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent {
  customerForm: FormGroup;
  @Output() newCustomer = new EventEmitter<Customer>();
  @Input() set resetForm(value: boolean) {
    this.customerForm.reset();
  }

  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.Iran, CountryISO.Germany];

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

  addCustomer() {
    if (this.customerForm.valid) {
      this.customerForm.value.PhoneNumber =
        this.customerForm.value.PhoneNumber.e164Number;

      this.newCustomer.emit(this.customerForm.value);
    } else this.customerForm.markAllAsTouched();
  }
}
