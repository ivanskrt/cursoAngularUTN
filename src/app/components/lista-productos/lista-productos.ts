import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { Productos, Producto } from '../../services/productos';
import { DescuentoPipe } from '../../pipes/descuento.pipe';

@Component({
  selector: 'app-lista-productos',
  imports: [CommonModule, CurrencyPipe, DatePipe, DescuentoPipe],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.css'
})
export class ListaProductos implements OnInit {
  productos: Producto[] = [];
  private nuevoIndice = 1;
  private productosService = inject(Productos);

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productos = this.productosService.getProductos();
  }

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

  eliminarProducto(id: number): void {
    this.productosService.deleteProducto(id);
    this.cargarProductos();
  }
}
