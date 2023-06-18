from config import db

class Suscripcion(db.Model):
    __tablename__ = 'suscripciones'
    suscripciones_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.usuario_id'))
    id_streaming = db.Column(db.Integer, db.ForeignKey('streaming.streaming_id'))
    perfiles_contratados = db.Column(db.Integer)
    aplica_descuento = db.Column(db.Boolean)
    usuario_servicio = db.Column(db.String(50))
    password_servicio = db.Column(db.String(100))
    fecha_creacion = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())
    usuario_creacion = db.Column(db.String(50))
    fecha_actualizacion = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    usuario_actualizacion = db.Column(db.String(50))

    def __init__(self, id_usuario, id_streaming, perfiles_contratados, aplica_descuento, usuario_servicio, password_servicio, usuario_creacion, usuario_actualizacion):
        self.id_usuario = id_usuario
        self.id_streaming = id_streaming
        self.perfiles_contratados = perfiles_contratados
        self.aplica_descuento = aplica_descuento
        self.usuario_servicio = usuario_servicio
        self.password_servicio = password_servicio
        self.usuario_creacion = usuario_creacion
        self.usuario_actualizacion = usuario_actualizacion