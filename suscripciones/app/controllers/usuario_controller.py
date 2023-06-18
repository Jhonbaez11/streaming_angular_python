from flask import Flask, request, jsonify, make_response
from config import app, db, ma
from models.usuario_model import Usuario
from flask_jwt_extended import create_access_token, JWTManager

# Esquema Usuarios
# Esquema para poder interactuar
# Desde ma voy a crear un Esquema
class UsuarioSchema(ma.Schema):
    class Meta:
        fields = ('usuario_id', 'primer_nombre', 'segundo_nombre', 'primer_apellido', 'segundo_apellido', 'correo', 'telefono', 'password', 'rol', 'fecha_creacion', 'usuario_creacion', 'fecha_actualizacion', 'usuario_actualizacion')

# Una sola Respuesta
usuario_schema = UsuarioSchema()
# Cuando sean muchas respuestas
usuarios_schema = UsuarioSchema(many=True)

# Configurar JWT
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Cambia esto por una clave secreta fuerte
jwt = JWTManager(app)

# Endpoint de inicio de sesión
@app.route('/login', methods=['POST'])
def login():
    correo = request.json['correo']
    password = request.json['password']

    # Verificar el correo electrónico y la contraseña del usuario en la base de datos
    usuario = Usuario.query.filter_by(correo=correo).first()
    if usuario and usuario.password == password:
        # Generar un token de acceso
        access_token = create_access_token(identity=usuario.usuario_id)

        # Devolver el token y los datos adicionales, como el rol del usuario
        response = {
            'token': access_token,
            'rol': usuario.rol,
            'primer_nombre': usuario.primer_nombre,
            'mensaje': "inicio de sesión exitoso"
        }
        return jsonify(response), 200
    else:
        # Devolver un mensaje de error si el inicio de sesión falla
        return jsonify({'message': 'Correo electrónico o contraseña incorrectos'}), 401

# GET #####################################
@app.route('/usuarios', methods=['GET'])
def get_usuarios():
    all_usuarios = Usuario.query.all()
    result = usuarios_schema.dump(all_usuarios)
    return jsonify(result)

# GET X ID ###############################
@app.route('/usuarios/<usuario_id>', methods=['GET'])
def get_usuario_by_id(usuario_id):
    usuario = Usuario.query.get(usuario_id)
    return usuario_schema.jsonify(usuario)

# POST ##################################
@app.route('/usuarios/crear', methods=['OPTIONS'])
def handle_options():
    # Configurar las cabeceras CORS para la solicitud OPTIONS
    response = make_response()
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:4200')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST')
    return response

@app.route('/usuarios/crear', methods=['POST'])
def insert_usuario():
    # Manejo de la solicitud POST
    data = request.get_json(force=True)
    usuario_id = data['usuario_id']
    primer_nombre = data['primer_nombre']
    segundo_nombre = data.get('segundo_nombre')
    primer_apellido = data['primer_apellido']
    segundo_apellido = data.get('segundo_apellido')
    correo = data.get('correo')
    telefono = data.get('telefono')
    password = data.get('password')
    rol = data['rol']
    usuario_creacion = data['usuario_creacion']
    usuario_actualizacion = data['usuario_actualizacion']

    nuevo_usuario = Usuario(
        usuario_id,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        correo,
        telefono,
        password,
        rol,
        usuario_creacion,
        usuario_actualizacion
    )

    db.session.add(nuevo_usuario)
    db.session.commit()
    return usuario_schema.jsonify(nuevo_usuario), 201

# PUT ###################################
@app.route('/usuarios/actualizar/<usuario_id>', methods=['OPTIONS', 'PUT'])
def update_usuario(usuario_id):
    # Manejo de la solicitud OPTIONS
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'success'})
        response.headers.add('Access-Control-Allow-Methods', 'PUT')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response

    usuario = Usuario.query.get(usuario_id)

    data = request.get_json(force=True)
    usuario.usuario_id = data['usuario_id']
    usuario.primer_nombre = data['primer_nombre']
    usuario.segundo_nombre = data['segundo_nombre']
    usuario.primer_apellido = data['primer_apellido']
    usuario.segundo_apellido = data['segundo_apellido']
    usuario.correo = data['correo']
    usuario.telefono = data['telefono']
    usuario.password = data['password']
    usuario.rol = data['rol']
    usuario.usuario_actualizacion = data['usuario_actualizacion']

    db.session.commit()

    return usuario_schema.jsonify(usuario)

# DELETE ################################
@app.route('/usuarios/eliminar/<usuario_id>', methods=['DELETE'])
def delete_usuario(usuario_id):
    usuario = Usuario.query.get(usuario_id)
    db.session.delete(usuario)
    db.session.commit()
    return usuario_schema.jsonify(usuario)