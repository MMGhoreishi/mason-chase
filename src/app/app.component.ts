import { Component, OnInit } from '@angular/core';
import { CustomerService } from './services/customer.service';
import { Customer } from './interfaces/customer';
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from 'ngx-intl-tel-input';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  customers: Customer[] = [];

  resetForm: boolean = false;
  showAddEditForm: boolean = false;

  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.Iran, CountryISO.Germany];

  indexEditCustomer: number = 0;

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.customers = this.customerService.getCustomers();
  }

  addCustomer(value: Customer) {
    let notContinue = false;

    for (let i = 0; i < this.customers.length; i++) {
      if (this.customers[i].Email === value.Email) {
        alert('Please enter a unique email!!!');
        notContinue = true;
        break;
      }

      if (this.customers[i].Firstname === value.Firstname) {
        alert('Please enter a unique firstname!!!');
        notContinue = true;
        break;
      }

      if (this.customers[i].Lastname === value.Lastname) {
        alert('Please enter a unique lastname!!!');
        notContinue = true;
        break;
      }

      if (this.customers[i].DateOfBirth === value.DateOfBirth) {
        alert('Please enter a unique date Of Birth!!!');
        notContinue = true;
        break;
      }
    }

    if (!notContinue) {
      this.customers.push(value);
      this.customerService.addCustomer(value);

      this.resetForm = !this.resetForm;
    }
  }

  editBtnClicked(i: number) {
    this.showAddEditForm = true;

    this.indexEditCustomer = i;
  }

  editCustomer(value: Customer) {
    let notContinue = false;

    if (
      this.customers[this.indexEditCustomer].Email !== value.Email ||
      this.customers[this.indexEditCustomer].Firstname !== value.Firstname ||
      this.customers[this.indexEditCustomer].Lastname !== value.Lastname ||
      this.customers[this.indexEditCustomer].DateOfBirth !== value.DateOfBirth
    )
      for (let i = 0; i < this.customers.length; i++) {
        if (
          this.customers[this.indexEditCustomer].Email !== value.Email &&
          this.customers[i].Email === value.Email
        ) {
          alert('Please enter a unique email!!!');
          notContinue = true;
          break;
        }

        if (
          this.customers[this.indexEditCustomer].Firstname !==
            value.Firstname &&
          this.customers[i].Firstname === value.Firstname
        ) {
          alert('Please enter a unique firstname!!!');
          notContinue = true;
          break;
        }

        if (
          this.customers[this.indexEditCustomer].Lastname !== value.Lastname &&
          this.customers[i].Lastname === value.Lastname
        ) {
          alert('Please enter a unique lastname!!!');
          notContinue = true;
          break;
        }

        if (
          this.customers[this.indexEditCustomer].DateOfBirth !==
            value.DateOfBirth &&
          this.customers[i].DateOfBirth === value.DateOfBirth
        ) {
          alert('Please enter a unique date Of Birth!!!');
          notContinue = true;
          break;
        }
      }

    if (!notContinue) {
      this.customers[this.indexEditCustomer] = value;
      this.customerService.updateCustomer(value, this.indexEditCustomer);

      this.showAddEditForm = false;
    }
  }

  deleteCustomer(email: string) {
    if (confirm('Are you sure to delete item with this email:' + email)) {
      console.log('this.customers.length>>>');
      console.log(this.customers.length);

      for (let i = 0; i < this.customers.length; i++) {
        console.log(this.customers[i]);

        if (this.customers[i].Email == email) {
          this.customers.splice(i, 1);
        }
      }

      this.customerService.deleteCustomer(email);
    }
  }
}
