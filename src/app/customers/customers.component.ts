import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../interfaces/customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.customers = this.customerService.getCustomers();
  }

  addCustomer(value: Customer) {
    this.customers.push(value);

    this.customerService.addCustomer(value);
  }

  deleteCustomer(email: string) {
    for (let i = 0; i < this.customers.length; i++) {
      if (this.customers[i].Email == email) {
        this.customers.splice(i, 1);
      }
    }

    this.customerService.deleteCustomer(email);
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
