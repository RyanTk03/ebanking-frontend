# Lab Report: E-Banking Frontend Application

**Frameworks: Angular 19, Bootstrap 5 & RxJS**

---

## 1. Project Objectives

The objective is to design and implement a modern Single Page Application (SPA) for an e-banking platform to:

- Provide a dynamic and reactive user interface for banking operations.
- Authenticate users and manage JWT tokens for secure API communication.
- Consume the e-banking REST API (see [ebanking-backend](https://github.com/RyanTk03/ebanking-backend)).
- Apply route-based access control depending on user roles.

---

## 2. Technical Architecture

The project follows Angular's component-based architecture organized by feature:

1. **View Layer**: Angular Components + HTML templates + CSS.
2. **Routing Layer**: Angular Router with route guards.
3. **State & Logic Layer**: Angular Services + RxJS Observables.
4. **HTTP Layer**: Angular `HttpClient` with JWT interceptors.
5. **UI Library**: Bootstrap 5 + Bootstrap Icons.

```
src/
├── app/
│   ├── core/              # Guards, interceptors, auth service
│   ├── features/
│   │   ├── accounts/      # Account listing & details
│   │   ├── customers/     # Customer management
│   │   ├── operations/    # Debit, credit, transfer
│   │   └── auth/          # Login page
│   ├── shared/            # Reusable components & models
│   ├── app.routes.ts      # Application routing
│   └── app.component.ts   # Root component
├── styles.css
└── main.ts
```

---

## 3. Component Architecture

Angular components encapsulate the UI logic for each feature. The application uses standalone components introduced in Angular 17+.

```typescript
@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './account-details.component.html',
})
export class AccountDetailsComponent implements OnInit {
  account$!: Observable<BankAccount>;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.account$ = this.accountService.getAccount(id);
  }
}
```

---

## 4. Services & HTTP Communication

Angular services handle all communication with the backend REST API. RxJS operators are used to transform and handle data streams.

```typescript
@Injectable({ providedIn: 'root' })
export class AccountService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getAccount(id: string): Observable<BankAccount> {
    return this.http.get<BankAccount>(`${this.apiUrl}/accounts/${id}`);
  }

  getAccountHistory(id: string, page: number, size: number): Observable<AccountHistoryDTO> {
    return this.http.get<AccountHistoryDTO>(
      `${this.apiUrl}/accounts/${id}/operations?page=${page}&size=${size}`
    );
  }

  transfer(fromId: string, toId: string, amount: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/accounts/transfer`, { fromId, toId, amount });
  }
}
```

---

## 5. Authentication & JWT Interceptor

The application handles JWT-based authentication. After login, the token is stored and automatically attached to outgoing HTTP requests via an `HttpInterceptor`.

```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
```

---

## 6. Routing & Route Guards

The Angular Router manages navigation between views. A route guard (`AuthGuard`) protects authenticated routes, and role-based guards restrict admin pages.

```typescript
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'customers', component: CustomersComponent },
      { path: 'accounts/:id', component: AccountDetailsComponent },
      {
        path: 'admin',
        canActivate: [AdminGuard],
        children: [
          { path: 'new-customer', component: NewCustomerComponent },
          { path: 'operations', component: OperationsComponent },
        ]
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
```

**Access levels:**

- **Anonymous**: Login page only.
- **USER**: Account consultation and operation history.
- **ADMIN**: Customer management, debit / credit / transfer operations.

---

## 7. Technologies & Dependencies

| Technology | Version | Role |
|---|---|---|
| TypeScript | ~5.7.2 | Language |
| Angular | ^19.2.0 | SPA Framework |
| Angular CLI | ^19.2.22 | Build & scaffolding tool |
| Angular Router | ^19.2.0 | Client-side routing |
| Angular Forms | ^19.2.0 | Reactive & template-driven forms |
| RxJS | ~7.8.0 | Asynchronous data streams |
| Bootstrap | ^5.3.8 | UI styling |
| Bootstrap Icons | ^1.13.1 | Icon library |
| Karma + Jasmine | ~6.4 / ~5.6 | Unit testing |
| Node.js | ≥18 | Runtime (build only) |

---

## 8. Getting Started

### Prerequisites

- Node.js ≥ 18
- Angular CLI: `npm install -g @angular/cli`
- The [ebanking-backend](https://github.com/RyanTk03/ebanking-backend) running on `http://localhost:8080`

### Installation

```bash
git clone https://github.com/RyanTk03/ebanking-frontend.git
cd ebanking-frontend
npm install
```

### Development Server

```bash
ng serve
```

The application will be available at `http://localhost:4200/`. Changes to source files trigger an automatic reload.

### Production Build

```bash
ng build
```

Build artifacts are output to the `dist/ebanking-frontend/` directory.

---

## 9. Conclusion

This lab demonstrated the construction of a fully reactive SPA using Angular 19. The component-based architecture promotes modularity and reusability, while RxJS simplifies asynchronous API communication. The integration of JWT interceptors and route guards ensures that the frontend enforces the same security model defined in the backend, resulting in a coherent and secure full-stack e-banking application.
