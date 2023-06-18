from config import db

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    usuario_id = db.Column(db.Integer, primary_key=True)
    primer_nombre = db.Column(db.String(50))
    primer_apellido = db.Column(db.String(50))

    def __init__(self, primer_nombre, primer_apellido):
        self.primer_nombre = primer_nombre
        self.primer_apellido = primer_apellido

class Suscripcion(db.Model):
    __tablename__ = 'suscripciones'
    suscripciones_id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.usuario_id'))
    id_streaming = db.Column(db.Integer, db.ForeignKey('streaming.streaming_id'))
    perfiles_contratados = db.Column(db.Integer)
    cuenta_completa = db.Column(db.Boolean)

    def __init__(self, id_usuario, id_streaming, perfiles_contratados, cuenta_completa):
        self.id_usuario = id_usuario
        self.id_streaming = id_streaming
        self.perfiles_contratados = perfiles_contratados
        self.cuenta_completa = cuenta_completa

class Pago(db.Model):
    __tablename__ = 'pagos'
    pagos_id = db.Column(db.Integer, primary_key=True)
    id_suscripcion = db.Column(db.Integer, db.ForeignKey('suscripciones.suscripciones_id'))
    mes = db.Column(db.Integer)
    anio = db.Column(db.Integer)
    pago = db.Column(db.Float)

    def __init__(self, id_suscripcion, mes, anio, pago):
        self.id_suscripcion = id_suscripcion
        self.mes = mes
        self.anio = anio
        self.pago = pago

class Streaming(db.Model):
    __tablename__ = 'streaming'
    streaming_id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50))
    valor_servicio = db.Column(db.Float)
    valor_perfil = db.Column(db.Float)
    perfiles = db.Column(db.Integer)
    descuento = db.Column(db.Float)

    def __init__(self, nombre, valor_servicio, valor_perfil, perfiles, descuento):
        self.nombre = nombre
        self.valor_servicio = valor_servicio
        self.valor_perfil = valor_perfil
        self.perfiles = perfiles
        self.descuento = descuento