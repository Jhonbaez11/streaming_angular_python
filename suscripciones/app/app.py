from flask import jsonify
from config import app
#importa get_usuarios, get_usuario_by_id, insert_usuario, update_usuario, delete_usuario
from controllers.usuario_controller import *
from controllers.streaming_controller import *
from controllers.suscripciones_controller import *
from controllers.pagos_controller import *
from controllers.vista_suscripciones_controller import *
from controllers.vista_pagos_controller import *
from controllers.vista_general_controller import *


# Mensaje de Bienvenida - Página Inicial
@app.route('/', methods=['GET'])
def index():
    return jsonify({'Mensaje': 'Bienvenido a la API REST Python: Gestiónn de Suscripcciones'})

if __name__ == "__main__":
    app.run(debug=True)