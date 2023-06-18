import { Component, OnInit } from '@angular/core';
import { PagosService } from './pagos.service';
import { Pagos } from './pagos.model';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { SuscripcionService } from '../suscripciones/suscripciones.service';
import { Suscripciones } from '../suscripciones/suscripciones.model';
import { Usuario } from '../usuarios/usuario.model';
import { UsuarioService } from '../usuarios/usuario.service';
import { Streaming } from '../streaming/streaming.model';
import { StreamingService } from '../streaming/streaming.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  showModal: boolean = false;
  suscripciones: Suscripciones[] = [];
  streaming: Streaming[] = [];
  usuario: Usuario[] = [];
  pagos: Pagos[] = [];
  nuevoPago: Pagos = {
    pagos_id: 0,
    id_suscripcion: 0,
    mes: 0,
    anio: 0,
    pago: 0,
    fecha_creacion: '',
    usuario_creacion: '',
    fecha_actualizacion: '',
    usuario_actualizacion: ''
  };
  selectedPago: any = {}; // Inicializar como un objeto vacío
  modoEdicion: boolean = false;
  
  constructor(private pagoService: PagosService, private suscripcionService: SuscripcionService, private usuariosService: UsuarioService, private streamingService: StreamingService) {
    console.log(pagoService); // Verifica si se muestra el objeto del servicio en la consola
  }

  openModal(crear: boolean) {
    this.showModal = true;
    this.selectedPago = {};

    if (crear) {
      this.modoEdicion = false;
    } else {
      this.modoEdicion = true;
    }
  }

  closeModal() {
    this.showModal = false;
  }

  showConfirmationAlert() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: '¿Está seguro de eliminar?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          if (this.selectedPago) {
            const url = `http://localhost:5000/pagos/eliminar/${this.selectedPago.pagos_id}`;
            this.pagoService.eliminarPago(url).subscribe(
              (response: any) => {
                // Eliminación exitosa
                console.log(response);
                // Aquí puedes agregar lógica adicional si lo deseas, como mostrar un mensaje de éxito, recargar la lista de pagos, etc.
                this.obtenerPagos();
                this.closeModal(); // Cierra la modal después de la eliminación exitosa
                swalWithBootstrapButtons.fire(
                  '¡Eliminado!',
                  'El archivo ha sido eliminado.',
                  'success'
                );
              },
              (error: any) => {
                // Error al eliminar el pago
                console.log(error);
                const errorMessage = error?.error?.message || 'Hubo un error al eliminar el archivo.';
                swalWithBootstrapButtons.fire('Error', errorMessage, 'error');
              }
            );
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // El usuario canceló la eliminación
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Tu archivo está a salvo :)',
            'error'
          );
        }
      });
  }

  // Método para obtener los pagos desde el backend
  obtenerPagos() {
    this.pagoService.obtenerPagos().subscribe(
      (response: Pagos[]) => {
        this.pagos = response; // Asignar directamente la respuesta a this.pagos
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  updatePago() {
    if (this.selectedPago) {
      const url = `http://localhost:5000/pagos/actualizar/${this.selectedPago.pagos_id}`;
      this.pagoService.actualizarPago(url, this.selectedPago).subscribe(
        (response: any) => {
          // Actualización exitosa
          console.log(response);
          Swal.fire('¡Actualizado!', 'La actualización del pago fue exitosa.', 'success');
          // Aquí puedes agregar lógica adicional si lo deseas, como recargar la lista de pagos, etc.
        },
        (error: HttpErrorResponse) => {
          // Error al actualizar el pago
          console.log(error);
          // Aquí puedes manejar el error de acuerdo a tus necesidades, mostrar un mensaje de error, etc.
          if (error.error && error.error.message) {
            Swal.fire('Error', error.error.message, 'error'); // Mostrar el mensaje de error devuelto por el servidor
          } else {
            Swal.fire('Error', 'Hubo un error al actualizar el pago.', 'error');
          }
        }
      );
    }
  }

  // Método para seleccionar un pago y mostrarlo en la ventana modal
  selectPago(pago: Pagos) {
    this.selectedPago = pago;
  }

  crearPago(): void {
    const url = `http://localhost:5000/pagos/crear`;
    this.selectedPago.usuario_creacion = 'Admin'; // Reemplaza 'valor_usuario_creacion' con el valor deseado
    this.selectedPago.fecha_creacion = new Date().toISOString(); // Reemplaza 'valor_usuario_creacion' con el valor deseado
    this.selectedPago.usuario_actualizacion = 'Admin'; // Reemplaza 'valor_usuario_creacion' con el valor deseado
    this.selectedPago.fecha_actualizacion = new Date().toISOString(); // Reemplaza 'valor_usuario_creacion' con el valor deseado

    this.pagoService.crearPago(url, this.selectedPago).subscribe(
      (pago: Pagos) => {
        this.pagos.push(pago);
        this.selectedPago = {
          pagos_id: 0,
          id_suscripcion: 0,
          mes: 0,
          anio: 0,
          pago: 0,
          fecha_creacion: '',
          usuario_creacion: '',
          fecha_actualizacion: '',
          usuario_actualizacion: ''
        };
        this.closeModal();
        Swal.fire('Éxito', 'El Pago se creó exitosamente.', 'success');
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        if (error.error && error.error.message) {
          Swal.fire('Error', error.error.message, 'error');
        } else {
          Swal.fire('Error', 'Hubo un error al crear el Pago.', 'error');
        }
      }
    );
  }

  ngOnInit() {
    this.obtenerPagos(); // Llamar al método para obtener los pagos al inicializar el componente
    this.obtenerSuscripciones();
    this.obternerUsuario();
    this.obternerStreaming();
  }

  modoCrear(): boolean {
    return !this.selectedPago || !this.selectedPago.pagos_id;
  }

  modoActualizar(): boolean {
    return this.selectedPago && this.selectedPago.pagos_id;
  }

  obtenerSuscripciones() {
    this.suscripcionService.obtenerSuscripciones().subscribe(
      (response: Suscripciones[]) => {
        this.suscripciones = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  obternerUsuario(){
    this.usuariosService.obtenerUsuarios().subscribe(
      (response: Usuario[]) => {
        this.usuario = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  obternerStreaming(){
    this.streamingService.obtenerStreaming().subscribe(
      (response: Streaming[]) => {
        this.streaming = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getUsuarioSuscripcion(suscripcionesId: number): string {
    const suscripciones = this.suscripciones.find(u => u.suscripciones_id === suscripcionesId);
    console.log(suscripcionesId);
    if (suscripciones) {
      const usuarioID = suscripciones.id_usuario;
      return this.getUsuarioUsuarios(usuarioID);
    } else {
      return '';
    }
  }

  getSuscripcionesUsuario(suscripcionesId: number): string {
    const suscripciones = this.suscripciones.find(u => u.suscripciones_id === suscripcionesId);
    if (suscripciones) {
      const usuarioID = suscripciones.id_usuario;
      const streamingID = suscripciones.id_streaming;
      return `${usuarioID} + ${streamingID}`;
    } else {
      return '';
    }
  }

  getStreamingSuscripcion(suscripcionesId: number): string {
    const suscripciones = this.suscripciones.find(u => u.suscripciones_id === suscripcionesId);
    console.log(suscripcionesId);
    if (suscripciones) {
      const streamingID = suscripciones.id_usuario;
      return this.getStreamingStreamins(streamingID);
    } else {
      return '';
    }
  }
  
  getUsuarioUsuarios(usuarioID: number): string {
    const usuarios = this.usuario.find(u => u.usuario_id === usuarioID);
    if (usuarios) {
      return usuarios.primer_nombre + ' ' + usuarios.primer_apellido;
    } else {
      return '';
    }
  }

  getStreamingStreamins(streamingID: number): string{
    const streaming = this.streaming.find(u => u.streaming_id === streamingID);
    if (streaming) {
      return streaming.nombre;
    } else {
      return '';
    }
  }

  getNombreMes(numeroMes: number): string {
    const meses = [
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
    return meses[numeroMes - 1] || '';
  }

  getNombreCompletoUsuario(usuarioID: number): string {
    const usuario = this.usuario.find(u => u.usuario_id === usuarioID);
    if (usuario) {
      return `${usuario.primer_nombre} ${usuario.primer_apellido}`;
    } else {
      return '';
    }
  }
  
  getNombreStreaming(streamingID: number): string {
    const streaming = this.streaming.find(s => s.streaming_id === streamingID);
    if (streaming) {
      return streaming.nombre;
    } else {
      return '';
    }
  }
}