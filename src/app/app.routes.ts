import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home').then((m) => m.Home),
  },
  {
    path: 'productos',
    loadChildren: () => import('./modules/productos/productos-module').then((m) => m.ProductosModule),
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./modules/usuarios/usuarios-module').then((m) => m.UsuariosModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
