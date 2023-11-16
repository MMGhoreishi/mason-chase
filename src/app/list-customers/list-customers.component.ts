import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Customer } from '../interfaces/customer';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css'],
})
export class ListCustomersComponent {
  @Input() customers: Customer[];
  @Output() emailToDeleteCustomer = new EventEmitter<string>();
  @Output() indexToEditCustomer = new EventEmitter<number>();

  deleteCustomer(email: string) {
    this.emailToDeleteCustomer.emit(email);
  }

  editBtnClicked(i: number) {
    this.indexToEditCustomer.emit(i);
  }
}
