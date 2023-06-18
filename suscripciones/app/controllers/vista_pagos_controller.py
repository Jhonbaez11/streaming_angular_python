from flask import jsonify
from config import app, db
from models.pagos_model import Pago
from models.suscripcciones_model import Suscripcion
from models.usuario_model import Usuario
from models.streaming_model import Streaming

@app.route('/vistas/pagos/<int:usuario_id>', methods=['GET'])
def get_pagos_usuario_vista(usuario_id):
    pagos = db.session.query(
        Pago.pagos_id,
        Streaming.nombre,
        Pago.mes,
        Pago.anio,
        Pago.pago
    ).join(Suscripcion, Pago.id_suscripcion == Suscripcion.suscripciones_id).join(Usuario, Suscripcion.id_usuario == Usuario.usuario_id).join(Streaming, Suscripcion.id_streaming == Streaming.streaming_id).filter(Usuario.usuario_id == usuario_id).all()

    result = []
    for pago in pagos:
        pago_data = {
            'pagos_id': pago[0],
            'nombre_streaming': pago[1],
            'mes': pago[2],
            'anio': pago[3],
            'pago': pago[4]
        }
        result.append(pago_data)

    return jsonify(result)