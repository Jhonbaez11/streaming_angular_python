from config import db

class Pago(db.Model):
    __tablename__ = 'pagos'
    pagos_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_suscripcion = db.Column(db.Integer, db.ForeignKey('suscripciones.suscripciones_id'))
    mes = db.Column(db.Integer)
    anio = db.Column(db.Integer)
    pago = db.Column(db.Float)
    
    suscripcion = db.relationship('Suscripcion', backref=db.backref('pagos'))

    def __init__(self, id_suscripcion, mes, anio, pago):
        self.id_suscripcion = id_suscripcion
        self.mes = mes
        self.anio = anio
        self.pago = pago