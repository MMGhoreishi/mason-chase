import { Customer } from '../interfaces/customer';

export class Init {
  load() {
    if (
      localStorage.getItem('customers') === null ||
      localStorage.getItem('customers') == undefined
    ) {
      console.log('No Customers Found... Creating...');
      let customers: Customer[] = [
        {
          Firstname: 'Mohammad Mahdi ',
          Lastname: 'Ghoreishi',
          DateOfBirth: new Date('2022-03-25'),
          PhoneNumber: '09363998946',
          Email: 'mr.mmghoreishi@gmail.com',
          BankAccountNumber: '99984573221',
        },
      ];

      localStorage.setItem('customers', JSON.stringify(customers));
      return;
    } else {
      console.log('Found customers...');
    }
  }
}
