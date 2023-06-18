from flask import Flask, request, jsonify, make_response
from config import app, db, ma
from models.suscripcciones_model import Suscripcion

# Esquema Suscripciones
class SuscripcionSchema(ma.Schema):
    class Meta:
        fields = ('suscripciones_id', 'id_usuario', 'id_streaming', 'perfiles_contratados', 'cuenta_completa', 'usuario_servicio', 'password_servicio', 'fecha_creacion', 'usuario_creacion', 'fecha_actualizacion', 'usuario_actualizacion')

# Una sola respuesta
suscripcion_schema = SuscripcionSchema()
# Cuando sean muchas respuestas
suscripciones_schema = SuscripcionSchema(many=True)

# GET all suscripciones
@app.route('/suscripciones', methods=['GET'])
def get_suscripciones():
    all_suscripciones = Suscripcion.query.all()
    result = suscripciones_schema.dump(all_suscripciones)
    return jsonify(result)

# GET suscripcion by ID
@app.route('/suscripciones/<suscripciones_id>', methods=['GET'])
def get_suscripcion_by_id(suscripciones_id):
    suscripcion = Suscripcion.query.get(suscripciones_id)
    return suscripcion_schema.jsonify(suscripcion)

# POST create a suscripcion
@app.route('/suscripciones/crear', methods=['OPTIONS'])
def handle_suscripcciones_options():
    response = make_response()
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:4200')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST')
    return response

@app.route('/suscripciones/crear', methods=['POST'])
def insert_suscripcion():
    data = request.get_json(force=True)   
    id_usuario = data['id_usuario']
    id_streaming = data['id_streaming']
    perfiles_contratados = data['perfiles_contratados']
    cuenta_completa = data.get('cuenta_completa', 0)
    usuario_servicio = data['usuario_servicio']
    password_servicio = data['password_servicio']
    usuario_creacion = data['usuario_creacion']
    usuario_actualizacion = data['usuario_actualizacion']

    nueva_suscripcion = Suscripcion(id_usuario, id_streaming, perfiles_contratados, cuenta_completa, usuario_servicio, password_servicio, usuario_creacion, usuario_actualizacion)

    db.session.add(nueva_suscripcion)
    db.session.commit()
    return suscripcion_schema.jsonify(nueva_suscripcion), 201

# PUT update a suscripcion
@app.route('/suscripciones/actualizar/<suscripciones_id>', methods=['OPTIONS', 'PUT'])
def update_suscripcion(suscripciones_id):
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'success'})
        response.headers.add('Access-Control-Allow-Methods', 'PUT')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response

    suscripcion = Suscripcion.query.get(suscripciones_id)

    data = request.get_json(force=True)
    suscripcion.id_usuario = data['id_usuario']
    suscripcion.id_streaming = data['id_streaming']
    suscripcion.perfiles_contratados = data['perfiles_contratados']
    suscripcion.cuenta_completa = data['cuenta_completa']
    suscripcion.usuario_servicio = data['usuario_servicio']
    suscripcion.password_servicio = data['password_servicio']
    suscripcion.usuario_actualizacion = data['usuario_actualizacion']

    db.session.commit()

    return suscripcion_schema.jsonify(suscripcion)

# DELETE a suscripcion
@app.route('/suscripciones/eliminar/<suscripciones_id>', methods=['DELETE'])
def delete_suscripcion(suscripciones_id):
    suscripcion = Suscripcion.query.get(suscripciones_id)
    db.session.delete(suscripcion)
    db.session.commit()
    return suscripcion_schema.jsonify(suscripcion)