import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuarios } from '../../services/usuarios/usuarios';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="usuario-form">
      <h2>Crear usuario</h2>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <div>
          <label>Nombre</label>
          <input formControlName="nombre" />
        </div>
        <div>
          <label>Email</label>
          <input formControlName="email" />
        </div>
        <div>
          <label>Rol</label>
          <input formControlName="rol" />
        </div>
        <div>
          <label>Activo</label>
          <input type="checkbox" formControlName="activo" />
        </div>
        <button type="submit" [disabled]="form.invalid">Crear</button>
      </form>
    </section>
  `,
})
export class UsuarioForm {
  private fb = inject(FormBuilder);
  private usuarios = inject(Usuarios);
  private router = inject(Router);

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    rol: ['viewer', Validators.required],
    activo: [true],
  });

  submit() {
    if (this.form.valid) {
      this.usuarios.addUsuario(this.form.value as any);
      this.router.navigate(['/usuarios']);
    }
  }
}
