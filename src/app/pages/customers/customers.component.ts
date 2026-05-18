import { Component, OnInit } from '@angular/core';
import { CustomersTableComponent } from "../../components/features/customers-table/customers-table.component";
import { catchError, map, Observable, throwError } from 'rxjs';
import { CustomersService } from '../../services/customers.service';
import { Customer } from '../../models/customer.model';
import { AsyncPipe, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CustomersTableComponent, NgIf, AsyncPipe, ReactiveFormsModule, RouterLink],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
  customers!: Observable<Array<Customer>>;
  errorMessage!: string;
  searchFormGroup: FormGroup | undefined;

  constructor(
    private customerService: CustomersService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    });
    this.handleSearchCustomers();
  }

  handleSearchCustomers() {
    let kw = this.searchFormGroup?.value.keyword;
    this.customers = this.customerService.searchCustomers(kw).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(() => err);
      })
    );
  }

  handleDeleteCustomer(c: Customer) {
    let conf = confirm("Êtes-vous sûr de vouloir supprimer ce client ?");
    if (!conf) return;

    this.customerService.deleteCustomer(c.id).subscribe({
      next: () => {
        this.customers = this.customers.pipe(
          map(data => data.filter(item => item.id !== c.id))
        );
      },
      error: err => console.log(err)
    });
  }

  handleCustomerAccounts(customer: Customer) {
    this.router.navigateByUrl("/customer-accounts/" + customer.id, { state: customer });
  }
}
