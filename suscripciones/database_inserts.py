from app import db
from app.models.usuario_model import Usuario
from app.models.streaming_model import Streaming
from app.models.suscripcciones_model import Suscripcion
from app.models.pagos_model import Pago

# Eliminar datos existentes
Usuario.query.delete()
Streaming.query.delete()
Suscripcion.query.delete()
Pago.query.delete()

# Tabla "usuarios"
usuarios_data = [
    {'usuario_id': 1, 'primer_nombre': 'John', 'segundo_nombre': 'Doe', 'primer_apellido': 'Smith', 'segundo_apellido': '', 'correo': 'john.doe@example.com', 'telefono': 123456789, 'password': 'password123', 'rol': 1, 'usuario_creacion': 'admin', 'usuario_actualizacion': 'admin'},
    {'usuario_id': 2, 'primer_nombre': 'Jane', 'segundo_nombre': '', 'primer_apellido': 'Johnson', 'segundo_apellido': '', 'correo': 'jane.johnson@example.com', 'telefono': 123456789, 'password': 'password456', 'rol': 2, 'usuario_creacion': 'admin', 'usuario_actualizacion': 'admin'},
    {'usuario_id': 3, 'primer_nombre': 'Michael', 'segundo_nombre': '', 'primer_apellido': 'Brown', 'segundo_apellido': '', 'correo': 'michael.brown@example.com', 'telefono': 123456789, 'password': 'password789', 'rol': 2, 'usuario_creacion': 'admin', 'usuario_actualizacion': 'admin'},
    {'usuario_id': 4, 'primer_nombre': 'Emily', 'segundo_nombre': '', 'primer_apellido': 'Davis', 'segundo_apellido': '', 'correo': 'emily.davis@example.com', 'telefono': 123456789, 'password': 'password123', 'rol': 2, 'usuario_creacion': 'admin', 'usuario_actualizacion': 'admin'},
    {'usuario_id': 5, 'primer_nombre': 'Daniel', 'segundo_nombre': '', 'primer_apellido': 'Miller', 'segundo_apellido': '', 'correo': 'daniel.miller@example.com', 'telefono': 123456789, 'password': 'password456', 'rol': 2, 'usuario_creacion': 'admin', 'usuario_actualizacion': 'admin'},
    {'usuario_id': 6, 'primer_nombre': 'Olivia', 'segundo_nombre': '', 'primer_apellido': 'Wilson', 'segundo_apellido': '', 'correo': 'olivia.wilson@example.com', 'telefono': 123456789, 'password': 'password789', 'rol': 2, 'usuario_creacion': 'admin', 'usuario_actualizacion': 'admin'},
    {'usuario_id': 7, 'primer_nombre': 'James', 'segundo_nombre': '', 'primer_apellido': 'Taylor', 'segundo_apellido': '', 'correo': 'james.taylor@example.com', 'telefono': 123456789, 'password': 'password123', 'rol': 2, 'usuario_creacion': 'admin', 'usuario_actualizacion': 'admin'}
]

for usuario_data in usuarios_data:
    usuario = Usuario(**usuario_data)
    db.session.add(usuario)

# Tabla "streaming"
streaming_data = [
    {'streaming_id': 1, 'nombre': 'Netflix', 'valor_servicio': 40000, 'valor_perfil': 10000, 'descripcion': 'Plataforma de streaming de películas y series.', 'usuario_creacion': 'admin', 'usuario_actualizacion': 'admin'},
    {'streaming_id': 2, 'nombre': 'Amazon Prime Video', 'valor_servicio': 35000, 'valor_perfil': 8000, 'descripcion': 'Plataforma de streaming de películas y series.', 'usuario_creacion': 'admin', 'usuario_actualizacion': 'admin'},
    {'streaming_id': 3, 'nombre': 'Disney+', 'valor_servicio': 30000, 'valor_perfil': 9000, 'descripcion': 'Plataforma de streaming de películas y series de Disney.', 'usuario_creacion': 'admin', 'usuario_actualizacion': 'admin'},
    {'streaming_id': 4, 'nombre': 'HBO Max', 'valor_servicio': 32000, 'valor_perfil': 10000, 'descripcion': 'Plataforma de streaming de películas y series.', 'usuario_creacion': 'admin', 'usuario_actualizacion': 'admin'},
    {'streaming_id': 5, 'nombre': 'Apple TV+', 'valor_servicio': 30000, 'valor_perfil': 8000, 'descripcion': 'Plataforma de streaming de películas y series de Apple.', 'usuario_creacion': 'admin', 'usuario_actualizacion': 'admin'}
]

for streaming_data in streaming_data:
    streaming = Streaming(**streaming_data)
    db.session.add(streaming)

# Tabla "suscripciones"
suscripciones_data = [
    {'suscripcion_id': 1, 'usuario_id': 2, 'streaming_id': 1, 'fecha_inicio': '2023-05-01', 'fecha_fin': '2023-06-01', 'estado': 'Activa', 'usuario_creacion': 'admin', 'usuario_actualizacion': 'admin'},
    {'suscripcion_id': 2, 'usuario_id': 3, 'streaming_id': 2, 'fecha_inicio': '2023-05-01', 'fecha_fin': '2023-06-01', 'estado': 'Activa', 'usuario_creacion': 'admin', 'usuario_actualizacion': 'admin'},
    {'suscripcion_id': 3, 'usuario_id': 4, 'streaming_id': 3, 'fecha_inicio': '2023-05-01', 'fecha_fin': '2023-06-01', 'estado': 'Activa', 'usuario_creacion': 'admin', 'usuario_actualizacion': 'admin'},
    {'suscripcion_id': 4, 'usuario_id': 5, 'streaming_id': 4, 'fecha_inicio': '2023-05-01', 'fecha_fin': '2023-06-01', 'estado': 'Activa', 'usuario_creacion': 'admin', 'usuario_actualizacion': 'admin'},
    {'suscripcion_id': 5, 'usuario_id': 6, 'streaming_id': 5, 'fecha_inicio': '2023-05-01', 'fecha_fin': '2023-06-01', 'estado': 'Activa', 'usuario_creacion': 'admin', 'usuario_actualizacion': 'admin'}
]

for suscripcion_data in suscripciones_data:
    suscripcion = Suscripcion(**suscripcion_data)
    db.session.add(suscripcion)

# Tabla "pagos"
pagos_data = [
    {'pago_id': 1, 'suscripcion_id': 1, 'valor': 40000, 'fecha_pago': '2023-05-01', 'estado': 'Pagado', 'usuario_creacion': 'admin', 'usuario_actualizacion': 'admin'},
    {'pago_id': 2, 'suscripcion_id': 2, 'valor': 35000, 'fecha_pago': '2023-05-01', 'estado': 'Pagado', 'usuario_creacion': 'admin', 'usuario_actualizacion': 'admin'},
    {'pago_id': 3, 'suscripcion_id': 3, 'valor': 30000, 'fecha_pago': '2023-05-01', 'estado': 'Pagado', 'usuario_creacion': 'admin', 'usuario_actualizacion': 'admin'},
    {'pago_id': 4, 'suscripcion_id': 4, 'valor': 32000, 'fecha_pago': '2023-05-01', 'estado': 'Pagado', 'usuario_creacion': 'admin', 'usuario_actualizacion': 'admin'},
    {'pago_id': 5, 'suscripcion_id': 5, 'valor': 30000, 'fecha_pago': '2023-05-01', 'estado': 'Pagado', 'usuario_creacion': 'admin', 'usuario_actualizacion': 'admin'}
]

for pago_data in pagos_data:
    pago = Pago(**pago_data)
    db.session.add(pago)

# Guardar los cambios en la base de datos
db.session.commit()