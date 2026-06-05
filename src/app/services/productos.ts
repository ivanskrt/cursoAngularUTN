import { Injectable } from '@angular/core';

/*
Los componentes deben ser delgados y solo ocuparse de la representacion. No gestionar datos
El servicio si queremos que gestione datos

Compartir informacion: al ser singletons pueden compartir informacion entre componentes y solo ellos comparten esta informacion.
*/

/*
Como mi servicio maneja productos, me interesa definir que es un producto en la aplicacion
Para eso usamos una interface
*/
export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  descuento: number;
  fechaAlta: Date;
}

@Injectable({
  providedIn: 'root',
})
export class Productos {
  //Este dato debemos tratar de que fuera del servicio sea inmutable
  private listaProductos: Producto[] = [
    {
      id: 1,
      nombre: 'Cafe molido',
      precio: 12.5,
      stock: 40,
      descuento: 10,
      fechaAlta: new Date(2024, 10, 3),
    },
    {
      id: 2,
      nombre: 'Te verde',
      precio: 9.9,
      stock: 60,
      descuento: 0,
      fechaAlta: new Date(2025, 1, 20),
    },
  ];

  //Metodo para obtener la lista de productos
  getProductos(): Producto[] {
    //Creo un nuevo array con los valores de mi lista de productos para romper la referencia
    return [...this.listaProductos];
  }

  //Crea un id para el producto recibido y lo suma a la lista
  //El omit sirve para definir que producto sea de tipo producto pero no necesariamente debe tener la propiedad id, debido a que esta se generara en el metodo
  addProducto(producto_raw: Omit<Producto, 'id'>): Producto {
    //Si hay productos cargados, vamos a buscar el id de maximo valor entre la lista de productos, sino agregamos un 1
    const new_producto_id =
      this.listaProductos.length > 0
        ? Math.max(...this.listaProductos.map((producto) => producto.id)) + 1
        : 1;
    const new_producto: Producto = {
      id: new_producto_id,
      ...producto_raw,
    };
    this.listaProductos.push(new_producto);
    return new_producto;
  }

  /* Elimina un producto de lista por id y con un boolean nos indica si la operacion se hizo o no */
  deleteProducto(id: number): boolean {
    const original_length = this.listaProductos.length;
    //Dejo estar a todos los productos que NO tengan el id que quiero eliminar
    this.listaProductos = this.listaProductos.filter((producto) => {
      return producto.id !== id;
    });
    return this.listaProductos.length < original_length;
  }
}
