import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './usuario.model';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:5000/usuarios'; // Ruta de la API del backend

  constructor(private http: HttpClient) { }

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  actualizarUsuario(url: string, usuario: Usuario): Observable<any> {
    return this.http.put(url, usuario);
  }

  eliminarUsuario(url: string): Observable<any> {
    return this.http.delete(url, { observe: 'response' });
  }

  crearUsuario(url: string, usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(url, usuario);
  }

}