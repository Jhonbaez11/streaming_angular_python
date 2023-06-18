from config import app, db

class Pago(db.Model):
    __tablename__ = 'pagos'
    pagos_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_suscripcion = db.Column(db.Integer, db.ForeignKey('suscripciones.suscripciones_id'))
    mes = db.Column(db.Integer)
    anio = db.Column(db.Integer)
    pago = db.Column(db.Numeric(10, 2))
    fecha_creacion = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())
    usuario_creacion = db.Column(db.String(50))
    fecha_actualizacion = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    usuario_actualizacion = db.Column(db.String(50))

    def __init__(self, id_suscripcion, mes, anio, pago, usuario_creacion, usuario_actualizacion):
        self.id_suscripcion = id_suscripcion
        self.mes = mes
        self.anio = anio
        self.pago = pago
        self.usuario_creacion = usuario_creacion
        self.usuario_actualizacion = usuario_actualizacion

# Crea las tablas
with app.app_context():  
    db.create_all()