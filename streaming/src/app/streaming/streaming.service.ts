import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Streaming } from './streaming.model';

@Injectable({
  providedIn: 'root'
})
export class StreamingService {
  private apiUrl = 'http://localhost:5000/streamings'; // Ruta de la API del backend

  constructor(private http: HttpClient) { }

  obtenerStreaming(): Observable<Streaming[]> {
    return this.http.get<Streaming[]>(this.apiUrl);
  }

  actualizarStreaming(url: string, streaming: Streaming): Observable<any> {
    return this.http.put(url, streaming);
  }

  eliminarStreaming(url: string): Observable<any> {
    return this.http.delete(url, { observe: 'response' });
  }

  crearStreaming(url: string, streaming: Streaming): Observable<Streaming> {
    return this.http.post<Streaming>(url, streaming);
  }
}