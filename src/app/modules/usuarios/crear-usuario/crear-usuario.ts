import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuarios } from '../../../services/usuarios/usuarios';
//tipos de errores
const ERRORS = {
  MIN_LENGTH: {
    NAME: 'minlength',
  },
  REQUIRED: {
    NAME: 'required',
  },
  EMAIL: {
    NAME: 'email',
  }
};

@Component({
  selector: 'app-crear-usuario',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-usuario.html',
  styleUrl: './crear-usuario.css',
})
export class CrearUsuario {
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

  //Obtengo error de cualquier campo del formulario 
  getFormError(field_name: string): string {
    const form_control = this.form.get(field_name);

    // Si el control no existe, no hacemos nada
    if (!form_control) {
      return '';
    }

    // Si el usuario no tocó el campo o si no hay errores, no mostramos nada
    if (!form_control.touched || !form_control.errors) {
      return '';
    }

    // Validación de campo requerido
    if (form_control.hasError(ERRORS.REQUIRED.NAME)) {
      return 'Este campo es obligatorio.';
    }

    // Validación de longitud mínima (especial para el nombre)
    if (form_control.hasError(ERRORS.MIN_LENGTH.NAME)) {
      const requiredLength = form_control.errors[ERRORS.MIN_LENGTH.NAME].requiredLength;
      return `Debe tener al menos ${requiredLength} caracteres.`;
    }

    // Validación de formato de correo (especial para el email)
    if (form_control.hasError(ERRORS.EMAIL.NAME)) {
      return 'Debe ser un correo electrónico válido.';
    }

    return '';
  }
}
