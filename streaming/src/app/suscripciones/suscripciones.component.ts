import { Component, OnInit } from '@angular/core';
import { SuscripcionService } from './suscripciones.service';
import { Suscripciones } from './suscripciones.model';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { UsuarioService } from '../usuarios/usuario.service';
import { Usuario } from '../usuarios/usuario.model';
import { StreamingService } from '../streaming/streaming.service';
import { Streaming } from '../streaming/streaming.model';

@Component({
  selector: 'app-suscripciones',
  templateUrl: './suscripciones.component.html',
  styleUrls: ['./suscripciones.component.css']
})
export class SuscripcionesComponent implements OnInit {

  showModal: boolean = false;
  suscripciones: Suscripciones[] = [];
  usuarios: Usuario[] = [];
  streaming: Streaming[] = [];
  nuevaSuscripcion: Suscripciones = {
    suscripciones_id: 0,
    id_usuario: 0,
    id_streaming: 0,
    perfiles_contratados: 0,
    cuenta_completa: false,
    usuario_servicio: '',
    password_servicio: '',
    fecha_creacion: '',
    usuario_creacion: '',
    fecha_actualizacion: '',
    usuario_actualizacion: ''
  };
  selectedSuscripcion: any = {}; // Inicializar como un objeto vacío
  modoEdicion: boolean = false;

  constructor(private suscripcionService: SuscripcionService, private usuarioService: UsuarioService, private streamingService: StreamingService) {
    console.log(suscripcionService); // Verifica si se muestra el objeto del servicio en la consola
  }

  openModal(crear: boolean) {
    this.showModal = true;
    this.selectedSuscripcion = {};

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
          if (this.selectedSuscripcion) {
            const url = `http://localhost:5000/suscripciones/eliminar/${this.selectedSuscripcion.suscripciones_id}`;
            this.suscripcionService.eliminarSuscripcion(url).subscribe(
              (response: any) => {
                // Eliminación exitosa
                console.log(response);
                // Aquí puedes agregar lógica adicional si lo deseas, como mostrar un mensaje de éxito, recargar la lista de suscripciones, etc.
                this.obtenerSuscripciones();
                this.closeModal(); // Cierra la modal después de la eliminación exitosa
                swalWithBootstrapButtons.fire(
                  '¡Eliminado!',
                  'El archivo ha sido eliminado.',
                  'success'
                );
              },
              (error: any) => {
                // Error al eliminar la suscripción
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

  // Método para obtener las suscripciones desde el backend
  obtenerSuscripciones() {
    this.suscripcionService.obtenerSuscripciones().subscribe(
      (response: Suscripciones[]) => {
        this.suscripciones = response; // Asignar directamente la respuesta a this.suscripciones
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  updateSuscripcion() {
    if (this.selectedSuscripcion) {
      const url = `http://localhost:5000/suscripciones/actualizar/${this.selectedSuscripcion.suscripciones_id}`;
      this.suscripcionService.actualizarSuscripcion(url, this.selectedSuscripcion).subscribe(
        (response: any) => {
          // Actualización exitosa
          console.log(response);
          Swal.fire('¡Actualizado!', 'La actualización de la suscripción fue exitosa.', 'success');
          // Aquí puedes agregar lógica adicional si lo deseas, como recargar la lista de suscripciones, etc.
        },
        (error: HttpErrorResponse) => {
          // Error al actualizar la suscripción
          console.log(error);
          // Aquí puedes manejar el error de acuerdo a tus necesidades, mostrar un mensaje de error, etc.
          if (error.error && error.error.message) {
            Swal.fire('Error', error.error.message, 'error'); // Mostrar el mensaje de error devuelto por el servidor
          } else {
            Swal.fire('Error', 'Hubo un error al actualizar la suscripción.', 'error');
          }
        }
      );
    }
  }

  // Método para seleccionar una suscripción y mostrarla en la ventana modal
  selectSuscripcion(suscripcion: Suscripciones) {
    this.selectedSuscripcion = suscripcion;
  }

  crearSuscripcion(): void {
    const url = `http://localhost:5000/suscripciones/crear`;
    this.selectedSuscripcion.usuario_creacion = 'Admin'; // Reemplaza 'valor_usuario_creacion' con el valor deseado
    this.selectedSuscripcion.fecha_creacion = new Date().toISOString(); // Reemplaza 'valor_usuario_creacion' con el valor deseado
    this.selectedSuscripcion.usuario_actualizacion = 'Admin'; // Reemplaza 'valor_usuario_creacion' con el valor deseado
    this.selectedSuscripcion.fecha_actualizacion = new Date().toISOString(); // Reemplaza 'valor_usuario_creacion' con el valor deseado

    this.suscripcionService.crearSuscripcion(url, this.selectedSuscripcion).subscribe(
      (suscripcion: Suscripciones) => {
        this.suscripciones.push(suscripcion);
        this.selectedSuscripcion = {
          suscripciones_id: 0,
          id_usuario: 0,
          id_streaming: 0,
          perfiles_contratados: 0,
          cuenta_completa: false,
          usuario_servicio: '',
          password_servicio: '',
          fecha_creacion: '',
          usuario_creacion: '',
          fecha_actualizacion: '',
          usuario_actualizacion: ''
        };
        this.closeModal();
        Swal.fire('Éxito', 'La Suscripción se creó exitosamente.', 'success');
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        if (error.error && error.error.message) {
          Swal.fire('Error', error.error.message, 'error');
        } else {
          Swal.fire('Error', 'Hubo un error al crear la suscripción.', 'error');
        }
      }
    );
  }

  ngOnInit() {
    this.obtenerSuscripciones(); // Llamar al método para obtener las suscripciones al inicializar el componente
    this.obtenerUsuarios();
    this.obtenerStreamings();
  }

  modoCrear(): boolean {
    return !this.selectedSuscripcion || !this.selectedSuscripcion.suscripciones_id;
  }

  modoActualizar(): boolean {
    return this.selectedSuscripcion && this.selectedSuscripcion.suscripciones_id;
  }
  
  obtenerUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe(
      (response: Usuario[]) => {
        this.usuarios = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getNombreCompleto(usuarioId: number): string {
    const usuario = this.usuarios.find(u => u.usuario_id === usuarioId);
    if (usuario) {
      return usuario.primer_nombre + ' ' + usuario.primer_apellido;
    } else {
      return '';
    }
  }

  obtenerStreamings() {
    this.streamingService.obtenerStreaming().subscribe(
      (response: Streaming[]) => {
        this.streaming = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getNombreStreaming(streamingId: number): string {
    const streaming = this.streaming.find(u => u.streaming_id === streamingId);
    if (streaming) {
      return streaming.nombre;
    } else {
      return '';
    }
  }
}