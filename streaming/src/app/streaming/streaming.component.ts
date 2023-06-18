import { Component, OnInit } from '@angular/core';
import { StreamingService } from './streaming.service';
import { Streaming } from './streaming.model';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-streaming',
  templateUrl: './streaming.component.html',
  styleUrls: ['./streaming.component.css']
})
export class StreamingComponent implements OnInit {

  showModal: boolean = false;
  streamings: Streaming[] = [];
  nuevoStreaming: Streaming = {
    streaming_id: 0,
    nombre: '',
    valor_servicio: 0,
    valor_perfil: 0,
    perfiles: 0,
    fecha_creacion: '',
    usuario_creacion: '',
    fecha_actualizacion: '',
    usuario_actualizacion: ''
  };
  selectedStreaming: any = {}; // Inicializar como un objeto vacío
  modoEdicion: boolean = false;

  constructor(private streamingService: StreamingService) {
    console.log(streamingService); // Verifica si se muestra el objeto del servicio en la consola
  }

  openModal(crear: boolean) {
    this.showModal = true;
    this.selectedStreaming = {};
  
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
          if (this.selectedStreaming) {
            const url = `http://localhost:5000/streamings/eliminar/${this.selectedStreaming.streaming_id}`;
            this.streamingService.eliminarStreaming(url).subscribe(
              (response: any) => {
                // Eliminación exitosa
                console.log(response);
                // Aquí puedes agregar lógica adicional si lo deseas, como mostrar un mensaje de éxito, recargar la lista de streamings, etc.
                this.obtenerStreaming();
                this.closeModal(); // Cierra la modal después de la eliminación exitosa
                swalWithBootstrapButtons.fire(
                  '¡Eliminado!',
                  'El archivo ha sido eliminado.',
                  'success'
                );
              },
              (error: any) => {
                // Error al eliminar el streaming
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

  // Método para obtener los streamings desde el backend
  obtenerStreaming() {
    this.streamingService.obtenerStreaming().subscribe(
      (response: Streaming[]) => {
        this.streamings = response; // Asignar directamente la respuesta a this.streamings
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  updateStreaming() {
    if (this.selectedStreaming) {
      const url = `http://localhost:5000/streamings/actualizar/${this.selectedStreaming.streaming_id}`;
      this.streamingService.actualizarStreaming(url, this.selectedStreaming).subscribe(
        (response: any) => {
          // Actualización exitosa
          console.log(response);
          Swal.fire('¡Actualizado!', 'La actualización del streaming fue exitosa.', 'success');
          // Aquí puedes agregar lógica adicional si lo deseas, como recargar la lista de streamings, etc.
        },
        (error: HttpErrorResponse) => {
          // Error al actualizar el streaming
          console.log(error);
          // Aquí puedes manejar el error de acuerdo a tus necesidades, mostrar un mensaje de error, etc.
          if (error.error && error.error.message) {
            Swal.fire('Error', error.error.message, 'error'); // Mostrar el mensaje de error devuelto por el servidor
          } else {
            Swal.fire('Error', 'Hubo un error al actualizar el streaming.', 'error');
          }
        }
      );
    }
  }

  // Método para seleccionar un streaming y mostrarlo en la ventana modal
  selectStreaming(streaming: Streaming) {
    this.selectedStreaming = streaming;
  }

  crearStreaming(): void {
    const url = `http://localhost:5000/streamings/crear`;
    this.selectedStreaming.usuario_creacion = 'Admin'; // Reemplaza 'valor_usuario_creacion' con el valor deseado
    this.selectedStreaming.fecha_creacion = new Date().toISOString(); // Reemplaza 'valor_usuario_creacion' con el valor deseado
    this.selectedStreaming.usuario_actualizacion = 'Admin'; // Reemplaza 'valor_usuario_creacion' con el valor deseado
    this.selectedStreaming.fecha_actualizacion = new Date().toISOString(); // Reemplaza 'valor_usuario_creacion' con el valor deseado
  
    this.streamingService.crearStreaming(url, this.selectedStreaming).subscribe(
      (streaming: Streaming) => {
        this.streamings.push(streaming);
        this.selectedStreaming = {
          streaming_id: 0,
          nombre: '',
          valor_servicio: 0,
          valor_perfil: 0,
          perfiles: 0,
          fecha_creacion: '',
          usuario_creacion: '',
          fecha_actualizacion: '',
          usuario_actualizacion: ''
        };
        this.closeModal();
        Swal.fire('Éxito', 'El streaming se creó exitosamente.', 'success');
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        if (error.error && error.error.message) {
          Swal.fire('Error', error.error.message, 'error');
        } else {
          Swal.fire('Error', 'Hubo un error al crear el streaming.', 'error');
        }
      }
    );
  }

  ngOnInit() {
    this.obtenerStreaming(); // Llamar al método para obtener los streamings al inicializar el componente
  }

  modoCrear(): boolean {
    return !this.selectedStreaming || !this.selectedStreaming.streaming_id;
  }
  
  modoActualizar(): boolean {
    return this.selectedStreaming && this.selectedStreaming.streaming_id;
  }
}