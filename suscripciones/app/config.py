from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

#Instancia de FLASK mi aplicacion
app = Flask(__name__)
CORS(app)
# Dando la configuracion a app Cadena de Conexion
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:sasa@localhost:3306/gestion_streaming'
# Configuracion por defecto para no alertar o warning
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# SQL alchemy pasar la configuracion
db = SQLAlchemy(app)
# Instanciar Marshmallow utiliza la instancion de app (Marshmallow sirve para esquema)
ma = Marshmallow(app)