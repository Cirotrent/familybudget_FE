import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./features/welcome/welcome.component')
        .then(m => m.WelcomeComponent)
  },
    {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/dashboard.component')
        .then(m => m.DashboardComponent)
  },
  {
    path: 'families',
    canActivate: [authGuard],
    loadComponent: () => import('./features/families/families.component')
        .then(m => m.FamiliesComponent)
  },
  {
    path: 'transactions',
    canActivate: [authGuard],
    loadComponent: () => import('./features/transaction/transactions-page/transactions-page.component')
        .then(m => m.TransactionsPageComponent )
  },
  {
    path: 'transactions/new',
    canActivate: [authGuard],
    loadComponent: () => import('./features/transaction/transaction-form/transaction-form.component')
        .then(m => m.TransactionFormComponent )
  }
];