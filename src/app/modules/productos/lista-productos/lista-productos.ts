import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Productos, Producto } from '../../../services/producto/productos';
import { DescuentoPipe } from '../../../pipes/descuento.pipe';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, DescuentoPipe, RouterModule],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.css'
})
export class ListaProductos implements OnInit {
  productos: Producto[] = [];
  private nuevoIndice = 1;
  private productosService = inject(Productos);
  private router = inject(Router);

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productos = this.productosService.getProductos();
  }

  /* comentado ya que en entrega final no se pide poder crear productos
  agregarProducto(): void {
    const indice = this.nuevoIndice++;
    this.productosService.addProducto({
      nombre: `Producto ${indice}`,
      precio: 10 + indice * 2,
      stock: 10 + indice,
      descuento: indice % 2 === 0 ? 15 : 0,
      fechaAlta: new Date(),
    });
    this.cargarProductos();
  }
  */
 
  eliminarProducto(id: number): void {
    this.productosService.deleteProducto(id);
    this.cargarProductos();
  }

  verDetalle(id: number): void {
    this.router.navigate(['/productos', id]);
  }
}
