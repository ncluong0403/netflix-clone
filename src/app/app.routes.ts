import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/components/home/home.component').then(
        (a) => a.HomeComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./core/components/login/login.component').then(
        (a) => a.LoginComponent
      ),
  },
];
