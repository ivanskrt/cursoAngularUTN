import { Injectable } from '@angular/core';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  activo: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class Usuarios {
  private listaUsuarios: Usuario[] = [
    { id: 1, nombre: 'Ana Pérez', email: 'ana@example.com', rol: 'admin', activo: true },
    { id: 2, nombre: 'Luis Gómez', email: 'luis@example.com', rol: 'editor', activo: true },
    { id: 3, nombre: 'María López', email: 'maria@example.com', rol: 'viewer', activo: false },
  ];

  getUsuarios(): Usuario[] {
    return [...this.listaUsuarios];
  }

  getUsuarioById(id: number): Usuario | null {
    return this.listaUsuarios.find((u) => u.id === id) ?? null;
  }

  addUsuario(usuario_raw: Omit<Usuario, 'id'>): Usuario {
    const newId = this.listaUsuarios.length > 0 ? Math.max(...this.listaUsuarios.map(u => u.id)) + 1 : 1;
    const nuevo: Usuario = { id: newId, ...usuario_raw };
    this.listaUsuarios.push(nuevo);
    return nuevo;
  }

  deleteUsuario(id: number): boolean {
    const original = this.listaUsuarios.length;
    this.listaUsuarios = this.listaUsuarios.filter(u => u.id !== id);
    return this.listaUsuarios.length < original;
  }

  toggleEstadoUsuario(id: number): Usuario | null {
    const usuario = this.getUsuarioById(id);
    if (usuario) {
      usuario.activo = !usuario.activo;
    }
    return usuario;
  }
}
