import { Component } from '@angular/core';
import { InicioComponent } from '../inicio/inicio.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: [
    './layout.component.css',
    '../../assets/layout/css/dashboard.css'
  ]
})
export class LayoutComponent {
  selectedComponent: string;
  usuariosTitle: string;
  serviciosTitle: string;
  suscripccionTitle: string;
  pagosTitle: string;
  inicioTitle: string;
  datosTitle: string;
  token: string | null | undefined; // Cambiado a 'string | null | undefined'
  tokenBool: boolean | undefined;

  constructor(private loginService: InicioComponent) {
    this.selectedComponent = 'inicio';
    this.usuariosTitle = 'Usuarios Registrados';
    this.serviciosTitle = 'Catálogo de Servicios';
    this.suscripccionTitle = 'Gestión de Suscripciones';
    this.inicioTitle = 'Sistema de Gestión de Suscripciones';
    this.pagosTitle = 'Pagos Registrados';
    this.datosTitle = 'Resumen de Suscripciones';

    this.token = localStorage.getItem('token'); // Obtener el token al iniciar la aplicación

    if (this.token === null || this.token === '') {
      this.tokenBool = false;
    } else {
      this.tokenBool = true;
    }
  }

  handleMenuItemClick(component: string) {
    this.selectedComponent = component;
  }

  receiveToken(token: string | undefined) {
    this.token = token;

    if (this.token === undefined || this.token === '') {
      this.tokenBool = false;
    } else {
      this.tokenBool = true;
    }
  }

  getRol(): number | undefined {
    const rolString = localStorage.getItem('rol');
    return rolString ? parseInt(rolString) : undefined;
  }

  logout() {
    localStorage.removeItem('token');
    this.token = null;
    this.tokenBool = false;
    window.location.reload();
  }
}