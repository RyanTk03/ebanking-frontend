import { Component } from '@angular/core';
import { CustomersTableComponent } from "../../components/features/customers-table/customers-table.component";
import { catchError, Observable, throwError } from 'rxjs';
import { CustomersService } from '../../services/customers.service';
import { Customer } from '../../models/customer.model';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-customers',
  imports: [CustomersTableComponent, NgIf, AsyncPipe],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
  customers! : Observable<Array<Customer>>;
  errorMessage!: string;
  constructor(private customerService : CustomersService) { }

  ngOnInit() {
    this.customers = this.customerService.getCustomers().pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }
}
