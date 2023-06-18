from flask import Flask, request, jsonify, make_response
from config import app, db, ma
from models.pagos_model import Pago

# Esquema Pagos
class PagoSchema(ma.Schema):
    class Meta:
        fields = ('pagos_id', 'id_suscripcion', 'mes', 'anio', 'pago', 'fecha_creacion', 'usuario_creacion', 'fecha_actualizacion', 'usuario_actualizacion')

# Una sola respuesta
pago_schema = PagoSchema()
# Cuando sean muchas respuestas
pagos_schema = PagoSchema(many=True)

# GET all pagos
@app.route('/pagos', methods=['GET'])
def get_pagos():
    all_pagos = Pago.query.all()
    result = pagos_schema.dump(all_pagos)
    return jsonify(result)

# GET pago by ID
@app.route('/pagos/<pagos_id>', methods=['GET'])
def get_pago_by_id(pagos_id):
    pago = Pago.query.get(pagos_id)
    return pago_schema.jsonify(pago)

# POST create a pago
@app.route('/pagos/crear', methods=['OPTIONS'])
def handle_pagos_options():
    response = make_response()
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:4200')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST')
    return response

@app.route('/pagos/crear', methods=['POST'])
def insert_pago():
    data = request.get_json(force=True)
    id_suscripcion = data['id_suscripcion']
    mes = data['mes']
    anio = data['anio']
    pago = data['pago']
    usuario_creacion = data['usuario_creacion']
    usuario_actualizacion = data['usuario_actualizacion']

    nuevo_pago = Pago(id_suscripcion, mes, anio, pago, usuario_creacion, usuario_actualizacion)

    db.session.add(nuevo_pago)
    db.session.commit()
    return pago_schema.jsonify(nuevo_pago), 201

# PUT update a pago
@app.route('/pagos/actualizar/<pagos_id>', methods=['OPTIONS', 'PUT'])
def update_pago(pagos_id):
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'success'})
        response.headers.add('Access-Control-Allow-Methods', 'PUT')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response

    pago = Pago.query.get(pagos_id)

    data = request.get_json(force=True)
    pago.id_suscripcion = data['id_suscripcion']
    pago.mes = data['mes']
    pago.anio = data['anio']
    pago.pago = data['pago']
    pago.usuario_actualizacion = data['usuario_actualizacion']

    db.session.commit()

    return pago_schema.jsonify(pago)

# DELETE a pago
@app.route('/pagos/eliminar/<pagos_id>', methods=['DELETE'])
def delete_pago(pagos_id):
    pago = Pago.query.get(pagos_id)
    db.session.delete(pago)
    db.session.commit()
    return pago_schema.jsonify(pago)