import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StreamingComponent } from './streaming/streaming.component';
import { SuscripcionesComponent } from './suscripciones/suscripciones.component';
import { InicioComponent } from './inicio/inicio.component';
import { CookieService } from 'ngx-cookie-service';
import { PagosComponent } from './pagos/pagos.component';
import { DatosComponent } from './datos/datos.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    UsuariosComponent,
    ServiciosComponent,    
    SuscripcionesComponent, StreamingComponent, SuscripcionesComponent, InicioComponent, PagosComponent, DatosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [InicioComponent, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
