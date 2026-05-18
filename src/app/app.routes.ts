import { Routes } from '@angular/router';
import { CustomersComponent } from './pages/customers/customers.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { NewCustomerComponent } from './pages/new-customer/new-customer.component';

export const routes: Routes = [
  { path: 'customers', component: CustomersComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'new-customer', component: NewCustomerComponent },
];
