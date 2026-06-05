import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descuento',
  standalone: true,
})
export class DescuentoPipe implements PipeTransform {
  transform(precio: number, porcentaje: number): number {
    if (typeof precio !== 'number' || typeof porcentaje !== 'number') {
      return precio as number;
    }
    const descuento = precio * (porcentaje / 100);
    return Math.max(0, precio - descuento);
  }
}
