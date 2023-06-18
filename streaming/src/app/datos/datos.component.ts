import { Component, OnInit } from '@angular/core';
import { DatosService } from './datos.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {
  meses: string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ];

  datosGenerales: any[] = [];
  datosFiltrados: any[] = [];

  filtroNombre: string = '';
  filtroApellido: string = '';
  filtroStreaming: string = '';
  filtroAnio: number = 0;
  filtroMes: number = 0;
  filtroDescuento: boolean = false;

  constructor(private datosService: DatosService) {
    console.log(datosService); // Verifica si se muestra el objeto del servicio en la consola
  }

  obtenerDatosGenerales() {
    this.datosService.obtenerDatos().subscribe(
      (response: any[]) => {
        console.log(response); // Verifica los valores devueltos por la API
        this.datosGenerales = response;
        this.aplicarFiltros();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.obtenerDatosGenerales(); // Llamar al método para obtener los datos generales al inicializar el componente
  }

  convertToNumber(value: string): number {
    if (Number(value)) {
      return parseFloat(value);
    }
    return 0;
  }

  aplicarFiltros() {
    this.datosFiltrados = this.datosGenerales.filter((data) => {
      const cumpleFiltroNombre = data.primer_nombre.toLowerCase().includes(this.filtroNombre.toLowerCase());
      const cumpleFiltroApellido = data.primer_apellido.toLowerCase().includes(this.filtroApellido.toLowerCase());
      const cumpleFiltroStreaming = data.nombre_streaming.toLowerCase().includes(this.filtroStreaming.toLowerCase());
      const cumpleFiltroAnio = this.filtroAnio === 0 || data.anio === this.filtroAnio;
      const cumpleFiltroMes = this.filtroMes === 0 || data.mes === this.filtroMes;
      const cumpleFiltroDescuento = !this.filtroDescuento || (this.filtroDescuento && data.aplica_descuento === 1);

      return cumpleFiltroNombre && cumpleFiltroApellido && cumpleFiltroStreaming && cumpleFiltroAnio && cumpleFiltroMes && cumpleFiltroDescuento;
    });
  }
}