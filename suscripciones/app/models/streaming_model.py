from config import app, db

# Creacion de Tabla Streaming
# Datos de mi tabla, definir sus propiedades los mismos que la de BD
class Streaming(db.Model):
    __tablename__ = 'streaming'
    streaming_id = db.Column(db.Integer, primary_key=True, autoincrement=True, unique=True, nullable=False)
    nombre = db.Column(db.String(100))
    valor_servicio = db.Column(db.Numeric(10, 0))
    valor_perfil = db.Column(db.Numeric(10, 0))
    perfiles = db.Column(db.Integer)
    fecha_creacion = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())
    usuario_creacion = db.Column(db.String(50))
    fecha_actualizacion = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    usuario_actualizacion = db.Column(db.String(50))

    def __init__(self, nombre, valor_servicio, valor_perfil, perfiles, usuario_creacion, usuario_actualizacion):
        self.nombre = nombre
        self.valor_servicio = valor_servicio
        self.valor_perfil = valor_perfil
        self.perfiles = perfiles
        self.usuario_creacion = usuario_creacion
        self.usuario_actualizacion = usuario_actualizacion

# Crea las tablas
with app.app_context():
    db.create_all()