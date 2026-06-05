import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {ReactiveFormsModule, FormBuilder, Validators} from "@angular/forms";
import { ListaProductos } from './components/lista-productos/lista-productos';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, ListaProductos],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Página Inicial');
  protected readonly miNombre = signal('Ivan Skrt');
  readonly message_form;
  constructor(private fb: FormBuilder) {
    this.message_form = this.fb.group({
      name: ['', 
             [Validators.required, Validators.minLength(3)]
      ],
      email: ['', 
             [Validators.required, Validators.email]
    ],
      message: ['']
    })
  }

  submitForm() {
    console.log("Se envio el formulario", 
                this.message_form.value);
    this.message_form.reset();
  }

  getMessageFormErrors(fieldName: string) : string {
    const messageFormControl = this.message_form.get(fieldName);

    console.log(messageFormControl?.errors);

    if(!messageFormControl?.touched){
      return '';
    }

    if(!messageFormControl?.errors){
      return '';
    }

    if (!messageFormControl) {
      return '';
    }

    if (messageFormControl.hasError('required')) {
      return 'Este campo es obligatorio.';
    }

    if (messageFormControl.hasError('minlength')) {
      const requiredLength = messageFormControl.errors?.['minlength'].requiredLength;
      return `Este campo debe tener al menos ${requiredLength} caracteres.`;
    }

    if (messageFormControl.hasError('email')) {
      return 'Por favor, introduce un email válido.';
    }

    return '';
  }
}