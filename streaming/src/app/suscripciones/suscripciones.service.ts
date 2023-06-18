import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Suscripciones } from './suscripciones.model';

@Injectable({
  providedIn: 'root'
})
export class SuscripcionService {
  private apiUrl = 'http://localhost:5000/suscripciones'; // Ruta de la API del backend

  constructor(private http: HttpClient) { }

  obtenerSuscripciones(): Observable<Suscripciones[]> {
    return this.http.get<Suscripciones[]>(this.apiUrl);
  }

  actualizarSuscripcion(url: string, suscripcion: Suscripciones): Observable<any> {
    return this.http.put(url, suscripcion);
  }

  eliminarSuscripcion(url: string): Observable<any> {
    return this.http.delete(url, { observe: 'response' });
  }

  crearSuscripcion(url: string, suscripcion: Suscripciones): Observable<Suscripciones> {
    return this.http.post<Suscripciones>(url, suscripcion);
  }
}