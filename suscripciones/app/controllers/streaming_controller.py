from flask import Flask, request, jsonify, make_response
from config import app, db, ma
from models.streaming_model import Streaming

# Esquema Streaming
class StreamingSchema(ma.Schema):
    class Meta:
        fields = ('streaming_id', 'nombre', 'valor_servicio', 'valor_perfil', 'perfiles', 'fecha_creacion', 'usuario_creacion', 'fecha_actualizacion', 'usuario_actualizacion')

# Una sola respuesta
streaming_schema = StreamingSchema()
# Cuando sean muchas respuestas
streamings_schema = StreamingSchema(many=True)

# GET all streamings
@app.route('/streamings', methods=['GET'])
def get_streamings():
    all_streamings = Streaming.query.all()
    result = streamings_schema.dump(all_streamings)
    return jsonify(result)

# GET streaming by ID
@app.route('/streamings/<streaming_id>', methods=['GET'])
def get_streaming_by_id(streaming_id):
    streaming = Streaming.query.get(streaming_id)
    return streaming_schema.jsonify(streaming)

# POST create a streaming
@app.route('/streamings/crear', methods=['OPTIONS'])
def handle_streaming_options():
    response = make_response()
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:4200')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST')
    return response

@app.route('/streamings/crear', methods=['POST'])
def insert_streaming():
    data = request.get_json(force=True)
    nombre = data['nombre']
    valor_servicio = data['valor_servicio']
    valor_perfil = data['valor_perfil']
    perfiles = data['perfiles']
    usuario_creacion = data['usuario_creacion']
    usuario_actualizacion = data['usuario_actualizacion']

    nuevo_streaming = Streaming(nombre, valor_servicio, valor_perfil, perfiles, usuario_creacion, usuario_actualizacion)

    db.session.add(nuevo_streaming)
    db.session.commit()
    return streaming_schema.jsonify(nuevo_streaming), 201

# PUT update a streaming
@app.route('/streamings/actualizar/<streaming_id>', methods=['OPTIONS', 'PUT'])
def update_streaming(streaming_id):
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'success'})
        response.headers.add('Access-Control-Allow-Methods', 'PUT')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response

    streaming = Streaming.query.get(streaming_id)

    data = request.get_json(force=True)
    streaming.streaming_id = data['streaming_id']
    streaming.nombre = data['nombre']
    streaming.valor_servicio = data['valor_servicio']
    streaming.valor_perfil = data['valor_perfil']
    streaming.perfiles = data['perfiles']
    streaming.usuario_actualizacion = data['usuario_actualizacion']

    db.session.commit()

    return streaming_schema.jsonify(streaming)

# DELETE a streaming
@app.route('/streamings/eliminar/<streaming_id>', methods=['DELETE'])
def delete_streaming(streaming_id):
    streaming = Streaming.query.get(streaming_id)
    db.session.delete(streaming)
    db.session.commit()
    return streaming_schema.jsonify(streaming)