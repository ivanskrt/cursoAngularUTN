import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./lista-usuarios/lista-usuarios').then((m) => m.ListaUsuariosComponent),
  },
  {
    path: 'crear',
    loadComponent: () => import('./usuario-form').then((m) => m.UsuarioForm),
  },
  {
    path: ':id',
    loadComponent: () => import('./usuario-detalle/usuario-detalle').then((m) => m.UsuarioDetalle),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}
