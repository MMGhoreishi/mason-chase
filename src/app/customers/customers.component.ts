import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../interfaces/customer';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PhoneNumberUtil } from 'google-libphonenumber';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  customerForm: FormGroup;
  submitted: boolean = false;
  countryCodes: number[] = [];

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder
  ) {
    this.myForm();
  }

  ngOnInit() {
    this.customers = this.customerService.getCustomers();
  }

  initCountryCodes(): void {
    const phoneNumberUtil = PhoneNumberUtil.getInstance();
    const countries: string[] = phoneNumberUtil.getSupportedRegions();
    // add TR as initial value
    this.countryCodes.push(90);
    countries.forEach((country) => {
      const countryCode = phoneNumberUtil.getCountryCodeForRegion(country);
      if (this.countryCodes.indexOf(countryCode) === -1) {
        this.countryCodes.push(countryCode);
      }
    });
    this.countryCodes.sort((a, b) => (a > b ? 1 : -1));
    this.selectedCountryCode = this.getCountryCode();
  }

  myForm() {
    this.customerForm = this.fb.group({
      Firstname: ['', Validators.required],
      Lastname: ['', Validators.required],
      DateOfBirth: ['', Validators.required],
      countryCode: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      BankAccountNumber: ['', Validators.required],
    });
  }

  addCustomer() {
    this.submitted = true;

    if (this.customerForm.valid) {
      this.customers.push(this.customerForm.value);
      this.customerService.addCustomer(this.customerForm.value);
    }
  }

  deleteCustomer(email: string) {
    if (confirm('Are you sure to delete item with this email:' + email)) {
      for (let i = 0; i < this.customers.length; i++) {
        if (this.customers[i].Email == email) {
          this.customers.splice(i, 1);
        }
      }

      this.customerService.deleteCustomer(email);
    }
  }

  updateCustomer(customer: Customer, email: string) {
    for (let i = 0; i < this.customers.length; i++) {
      if (this.customers[i].Email == email) {
        this.customers[i] = customer;
      }
    }

    this.customerService.updateCustomer(customer, email);
  }
}
