import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./lista-productos/lista-productos').then((m) => m.ListaProductos),
  },
  {
    path: ':id',
    loadComponent: () => import('./producto-detalle/producto-detalle').then((m) => m.ProductoDetalle),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosRoutingModule {}
