import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Usuarios } from '../../../services/usuarios/usuarios';

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.html',
  styleUrls: ['./usuario-detalle.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class UsuarioDetalle {
  private route = inject(ActivatedRoute);
  private usuarios = inject(Usuarios);
  private router = inject(Router);
  usuario: any = null;

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (!isNaN(id)) {
      this.usuario = this.usuarios.getUsuarioById(id) ?? null;
    }
  }

  volver() {
    this.router.navigate(['/usuarios']);
  }
}

