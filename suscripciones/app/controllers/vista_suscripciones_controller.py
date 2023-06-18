from flask import jsonify
from config import app, db, ma
from models.suscripcciones_model import Suscripcion
from models.usuario_model import Usuario
from models.streaming_model import Streaming

# GET suscripciones with user and streaming details
@app.route('/vistas/suscripciones', methods=['GET'])
def get_suscripciones_vista():
    suscripciones = db.session.query(
        Usuario.primer_nombre,
        Usuario.primer_apellido,
        Streaming.nombre,
        Streaming.perfiles,
        Suscripcion.aplica_descuento,
        Suscripcion.usuario_servicio,
        Suscripcion.password_servicio
    ).join(Usuario, Usuario.usuario_id == Suscripcion.id_usuario).join(Streaming, Streaming.streaming_id == Suscripcion.id_streaming).all()

    result = []
    for suscripcion in suscripciones:
        suscripcion_data = {
            'primer_nombre': suscripcion[0],
            'primer_apellido': suscripcion[1],
            'nombre_streaming': suscripcion[2],
            'perfiles': suscripcion[3],
            'aplica_descuento': suscripcion[4],
            'usuario_servicio': suscripcion[5],
            'password_servicio': suscripcion[6]
        }
        result.append(suscripcion_data)

    return jsonify(result)