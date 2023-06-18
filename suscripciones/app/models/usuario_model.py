from config import app, db

# Creacion de Tabla Usuarios
# Datos de mi tabla, definir sus propiedades los mismos que la de BD
class Usuario(db.Model):
    __tablename__ = 'usuarios'
    usuario_id = db.Column(db.Integer, primary_key=True, unique=True, nullable=False, autoincrement=False)
    primer_nombre = db.Column(db.String(50))
    segundo_nombre = db.Column(db.String(50), nullable=True)
    primer_apellido = db.Column(db.String(50))
    segundo_apellido = db.Column(db.String(50), nullable=True)
    correo = db.Column(db.String(100), nullable=True)
    telefono = db.Column(db.Integer, nullable=True)
    password = db.Column(db.String(100), nullable=True)
    rol = db.Column(db.Integer)
    fecha_creacion = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())
    usuario_creacion = db.Column(db.String(50))
    fecha_actualizacion = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    usuario_actualizacion = db.Column(db.String(50))

    # Constructor cada vez que se instancia la clase
    # Al recibir asignar los datos
    def __init__(self, usuario_id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, correo, telefono, password, rol, usuario_creacion, usuario_actualizacion):
        self.usuario_id = usuario_id
        self.primer_nombre = primer_nombre
        self.segundo_nombre = segundo_nombre
        self.primer_apellido = primer_apellido
        self.segundo_apellido = segundo_apellido
        self.correo = correo
        self.telefono = telefono
        self.password = password
        self.rol = rol
        self.usuario_creacion = usuario_creacion
        self.usuario_actualizacion = usuario_actualizacion
        # Modelo de Datos completado

# Crea las tablas
with app.app_context():  
    db.create_all()