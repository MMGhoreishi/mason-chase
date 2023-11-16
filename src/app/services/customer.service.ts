import { Injectable } from '@angular/core';
import { Init } from '../init/init-customers';
import { Customer } from '../interfaces/customer';

@Injectable()
export class CustomerService extends Init {
  constructor() {
    super();
    console.log('It Works');
    this.load();
  }

  getCustomers(): Customer[] {
    const customers: Customer[] = JSON.parse(
      localStorage.getItem('customers') || ''
    );
    return customers;
  }

  addCustomer(newCustomer: Customer) {
    const customers: Customer[] = JSON.parse(
      localStorage.getItem('customers') || ''
    );
    customers.push(newCustomer);
    localStorage.setItem('customers', JSON.stringify(customers));
  }

  deleteCustomer(email: string) {
    const customers: Customer[] = JSON.parse(
      localStorage.getItem('customers') || ''
    );

    for (let i = 0; i < customers.length; i++) {
      if (customers[i].Email == email) {
        customers.splice(i, 1);
      }
    }
    localStorage.setItem('customers', JSON.stringify(customers));
  }

  updateCustomer(customer: Customer, index: number) {
    const customers: Customer[] = JSON.parse(
      localStorage.getItem('customers') || ''
    );
    customers[index] = customer;

    // for (let i = 0; i < customers.length; i++) {
    //   if (customers[i].Email == customer.Email) {
    //     customers[i] = customer;
    //   }
    // }
    localStorage.setItem('customers', JSON.stringify(customers));
  }
}
