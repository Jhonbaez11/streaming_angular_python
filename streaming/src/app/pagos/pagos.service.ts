import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pagos } from './pagos.model';

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  private apiUrl = 'http://localhost:5000/pagos'; // Ruta de la API del backend

  constructor(private http: HttpClient) { }

  obtenerPagos(): Observable<Pagos[]> {
    return this.http.get<Pagos[]>(this.apiUrl);
  }

  actualizarPago(url: string, pago: Pagos): Observable<any> {
    return this.http.put(url, pago);
  }

  eliminarPago(url: string): Observable<any> {
    return this.http.delete(url, { observe: 'response' });
  }

  crearPago(url: string, pago: Pagos): Observable<Pagos> {
    return this.http.post<Pagos>(url, pago);
  }
}