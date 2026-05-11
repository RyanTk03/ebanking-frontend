import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf, NgForOf } from '@angular/common';

export interface Customer {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-customers-table',
  imports: [NgIf, NgForOf],
  templateUrl: './customers-table.component.html',
  styleUrl: './customers-table.component.css'
})
export class CustomersTableComponent {
  customers: Customer[] = [
    { id: 1, name: 'Hassan',  email: 'Hassan@gmail.com'  },
    { id: 2, name: 'Imane',   email: 'Imane@gmail.com'   },
    { id: 3, name: 'Mohamed', email: 'Mohamed@gmail.com' },
  ];

  ngOnInit(): void {
  }
}
