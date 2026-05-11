import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf, NgForOf } from '@angular/common';
import { Customer } from '../../../models/customer.model';

@Component({
  selector: 'app-customers-table',
  imports: [NgIf, NgForOf],
  templateUrl: './customers-table.component.html',
  styleUrl: './customers-table.component.css'
})
export class CustomersTableComponent {
  customers = input<Customer[]>();

  deleteCustomer = output<Customer>();
  viewAccounts = output<Customer>();
 
  onDelete(customer: Customer): void {
    this.deleteCustomer.emit(customer);
  }
 
  onViewAccounts(customer: Customer): void {
    this.viewAccounts.emit(customer);
  }
}
