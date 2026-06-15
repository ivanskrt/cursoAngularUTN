import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Productos, Producto } from '../../../services/producto/productos';
import { DescuentoPipe } from '../../../pipes/descuento.pipe';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.html',
  styleUrls: ['./producto-detalle.css'],
  imports: [CommonModule, RouterModule, DescuentoPipe],
  standalone: true
})

export class ProductoDetalle {
  private route = inject(ActivatedRoute);
  private productos = inject(Productos);
  private router = inject(Router);
  producto: Producto | null = null;

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (!isNaN(id)) {
      this.producto = this.productos.getProductoById(id) ?? null;
    }
  }

  volver() {
    this.router.navigate(['/productos']);
  }
}
