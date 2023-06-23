import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  correo: string | undefined;
  password: string | undefined;
  token: string | null | undefined;
  tokenBool: boolean | undefined;
  rol: number | undefined;
  primer_nombre: string | undefined;

  @Output() tokenEmitter = new EventEmitter<string | undefined>();

  constructor(private http: HttpClient) {
    this.tokenBool = this.estaLogeado();
  }

  login() {
    const formData = {
      correo: this.correo,
      password: this.password
    };
  
    this.http.post<any>('http://localhost:5000/login', formData).subscribe(
      response => {
        const token = response.token;
        const rol = response.rol;
        const primer_nombre = response.primer_nombre;
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('rol', rol);
        window.localStorage.setItem('primer_nombre', primer_nombre);
  
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: 'Has iniciado sesión correctamente.',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.tokenEmitter.emit(token);
          console.log(token);
          window.location.reload();
        });
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error de inicio de sesión',
          text: 'Credenciales incorrectas. Inténtalo de nuevo.',
          showConfirmButton: false,
          timer: 1500
        });
        console.error('Error de inicio de sesión:', error.error.message);
      }
    );
  }

  getIdToken(): string | null {
    this.token = window.localStorage.getItem('token'); // Acceder a 'localStorage' a través de 'window'    
  
    if (this.token === undefined || this.token === '') {
      this.tokenBool = false;
    } else {
      this.tokenBool = true;
    }
  
    return this.token;
  }

  getRol(){
    const rolString = window.localStorage.getItem('rol'); // Obtener el valor del rol como cadena de texto
    const rol = rolString ? parseInt(rolString) : undefined; // Convertir a número o asignar undefined si es nulo o vacío

    return rol;
  }

  getPrimerNombre() {
    this.primer_nombre = window.localStorage.getItem('primer_nombre') ?? ''; // Asignar '' si es nulo
  
    return this.primer_nombre;
  }

  estaLogeado(): boolean {
    return !!window.localStorage.getItem('token'); // Acceder a 'localStorage' a través de 'window'
  }

  logout() {
    window.localStorage.removeItem('token'); // Acceder a 'localStorage' a través de 'window'
  }
}