from flask import jsonify
from config import app, db, ma
from models.usuario_model import Usuario
from models.suscripcciones_model import Suscripcion
from models.pagos_model import Pago
from models.streaming_model import Streaming
from sqlalchemy import case

# Vista general de suscripciones y pagos
@app.route('/vistas/general', methods=['GET'])
def get_general_view():
    query = db.session.query(
        Usuario.primer_nombre,
        Usuario.primer_apellido,
        Streaming.nombre.label('nombre_streaming'),
        Streaming.valor_servicio,
        Streaming.valor_perfil,
        Suscripcion.perfiles_contratados,
        Suscripcion.cuenta_completa,
        Pago.mes,
        Pago.anio,
        db.func.sum(Pago.pago).label('total_pago'),
        case(
    (Suscripcion.cuenta_completa == 1, Streaming.valor_servicio),
    (Suscripcion.cuenta_completa == 0, Streaming.valor_perfil * Suscripcion.perfiles_contratados),
    else_=0
    ).label('total_pagar')
    ).join(Suscripcion, Suscripcion.id_usuario == Usuario.usuario_id).join(Pago, Pago.id_suscripcion == Suscripcion.suscripciones_id).join(Streaming, Streaming.streaming_id == Suscripcion.id_streaming).group_by(
        Usuario.primer_nombre,
        Usuario.primer_apellido,
        Streaming.nombre,
        Streaming.valor_servicio,
        Streaming.valor_perfil,
        Suscripcion.perfiles_contratados,
        Suscripcion.cuenta_completa,
        Pago.mes,
        Pago.anio
    ).all()

    result = []
    for row in query:
        data = {
            'primer_nombre': row[0],
            'primer_apellido': row[1],
            'nombre_streaming': row[2],
            'valor_servicio': row[3],
            'valor_perfil': row[4],
            'perfiles_contratados': row[5],
            'cuenta_completa': row[6],
            'mes': row[7],
            'anio': row[8],
            'total_pago': row[9],
            'total_pagar': row[10]
        }
        result.append(data)

    return jsonify(result)