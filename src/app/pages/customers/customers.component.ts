import { Component } from '@angular/core';
import { CustomersTableComponent } from "../../components/features/customers-table/customers-table.component";

@Component({
  selector: 'app-customers',
  imports: [CustomersTableComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {

}
