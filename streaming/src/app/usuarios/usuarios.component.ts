import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.model';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  showModal: boolean = false;
  usuarios: Usuario[] = [];
  nuevoUsuario: Usuario = {
    usuario_id: 0,
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    correo: '',
    telefono: 0,
    rol: 0,
    fecha_creacion: '',
    usuario_creacion: '',
    fecha_actualizacion: '',
    usuario_actualizacion: '',
    password: ''
  };
  selectedUsuario: any = {}; // Inicializar como un objeto vacío
  modoEdicion: boolean = false;

  constructor(private usuarioService: UsuarioService) {
    console.log(usuarioService); // Verifica si se muestra el objeto del servicio en la consola
  }

  openModal(crear: boolean) {
    this.showModal = true;
    this.selectedUsuario = {};
  
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
          if (this.selectedUsuario) {
            const url = `http://localhost:5000/usuarios/eliminar/${this.selectedUsuario.usuario_id}`;
            this.usuarioService.eliminarUsuario(url).subscribe(
              (response: any) => {
                // Eliminación exitosa
                console.log(response);
                // Aquí puedes agregar lógica adicional si lo deseas, como mostrar un mensaje de éxito, recargar la lista de usuarios, etc.
                this.obtenerUsuarios();
                this.closeModal(); // Cierra la modal después de la eliminación exitosa
                swalWithBootstrapButtons.fire(
                  '¡Eliminado!',
                  'El archivo ha sido eliminado.',
                  'success'
                );
              },
              (error: any) => {
                // Error al eliminar el usuario
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

  // Método para obtener los usuarios desde el backend
  obtenerUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe(
      (response: Usuario[]) => {
        this.usuarios = response; // Asignar directamente la respuesta a this.usuarios
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  updateUsuario() {
    if (this.selectedUsuario) {
      const url = `http://localhost:5000/usuarios/actualizar/${this.selectedUsuario.usuario_id}`;
      this.usuarioService.actualizarUsuario(url, this.selectedUsuario).subscribe(
        (response: any) => {
          // Actualización exitosa
          console.log(response);
          Swal.fire('¡Actualizado!', 'La actualización del usuario fue exitosa.', 'success');
          // Aquí puedes agregar lógica adicional si lo deseas, como recargar la lista de usuarios, etc.
        },
        (error: HttpErrorResponse) => {
          // Error al actualizar el usuario
          console.log(error);
          // Aquí puedes manejar el error de acuerdo a tus necesidades, mostrar un mensaje de error, etc.
          if (error.error && error.error.message) {
            Swal.fire('Error', error.error.message, 'error'); // Mostrar el mensaje de error devuelto por el servidor
          } else {
            Swal.fire('Error', 'Hubo un error al actualizar el usuario.', 'error');
          }
        }
      );
    }
  }

  // Método para seleccionar un usuario y mostrarlo en la ventana modal
  selectUsuario(usuario: Usuario) {
    this.selectedUsuario = usuario;
  }

  crearUsuario(): void {
    const url = `http://localhost:5000/usuarios/crear`;
    this.selectedUsuario.usuario_creacion = 'Admin'; // Reemplaza 'valor_usuario_creacion' con el valor deseado
    this.selectedUsuario.fecha_creacion = new Date().toISOString(); // Reemplaza 'valor_usuario_creacion' con el valor deseado
    this.selectedUsuario.usuario_actualizacion = 'Admin'; // Reemplaza 'valor_usuario_creacion' con el valor deseado
    this.selectedUsuario.fecha_actualizacion = new Date().toISOString(); // Reemplaza 'valor_usuario_creacion' con el valor deseado
  
    this.usuarioService.crearUsuario(url, this.selectedUsuario).subscribe(
      (usuario: Usuario) => {
        this.usuarios.push(usuario);
        this.selectedUsuario = {
          id_usuario: 0,
          primer_nombre: '',
          segundo_nombre: '',
          primer_apellido: '',
          segundo_apellido: '',
          correo: '',
          telefono: 0,
          rol: 0,
          fecha_creacion: '',
          usuario_creacion: '',
          fecha_actualizacion: '',
          usuario_actualizacion: '',
          password: ''
        };
        this.closeModal();
        Swal.fire('Éxito', 'El Usuario se creó exitosamente.', 'success');
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        if (error.error && error.error.message) {
          Swal.fire('Error', error.error.message, 'error');
        } else {
          Swal.fire('Error', 'Hubo un error al crear el usuario.', 'error');
        }
      }
    );
  }

  ngOnInit() {
    this.obtenerUsuarios(); // Llamar al método para obtener los usuarios al inicializar el componente
  }

  modoCrear(): boolean {
    return !this.selectedUsuario || !this.selectedUsuario.usuario_id;
  }
  
  modoActualizar(): boolean {
    return this.selectedUsuario && this.selectedUsuario.usuario_id;
  }
}