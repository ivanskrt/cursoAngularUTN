import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// Asegúrate de que esta ruta relativa sea correcta según dónde quedó tu componente
import { Usuarios, Usuario } from '../../../services/usuarios/usuarios'; 

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-usuarios.html',
  styleUrl: './lista-usuarios.css'
})
export class ListaUsuariosComponent implements OnInit {
  private usuariosService = inject(Usuarios);
  usuarios: Usuario[] = [];

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.usuarios = this.usuariosService.getUsuarios();
  }

  eliminar(id: number) {
    this.usuariosService.deleteUsuario(id);
    this.cargar();
  }

  toggleEstado(id: number) {
    this.usuariosService.toggleEstadoUsuario(id);
    this.cargar();
  }
}