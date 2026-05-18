import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomersService } from '../../services/customers.service';
import { Router } from '@angular/router';
import { Customer } from '../../models/customer.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-new-customer',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent implements OnInit {
  newCustomerFormGroup!: FormGroup;

  constructor(
    private customerService: CustomersService,
    private fb: FormBuilder,
    public router: Router   // public → accessible depuis le template
  ) {}

  ngOnInit(): void {
    this.newCustomerFormGroup = this.fb.group({
      name:  this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      email: this.fb.control(null, [Validators.required, Validators.email])
    });
  }

  handleSaveCustomer() {
    let customer: Customer = this.newCustomerFormGroup.value;
    this.customerService.saveCustomer(customer).subscribe({
      next: () => {
        alert("Client enregistré avec succès !");
        this.router.navigateByUrl("/customers");
      },
      error: err => console.log(err)
    });
  }
}
