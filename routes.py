# routes.py
from flask import render_template, request, jsonify
from api import app, db, Experiencia

def setup_routes():
    @app.route('/')
    def index():
        return render_template('index.html')

    @app.route('/experiencias', methods=['POST'])
    def crear_experiencia():
        try:
            data = request.get_json()
            nueva_experiencia = Experiencia(**data)
            db.session.add(nueva_experiencia)
            db.session.commit()
            return jsonify({'status': 'Experiencia creada exitosamente'}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

    @app.route('/experiencias', methods=['GET'])
    def obtener_experiencias():
        experiencias = Experiencia.query.all()
        experiencias_json = [{'id': experiencia.id, 'nombre': experiencia.nombre, 'apellido': experiencia.apellido,
                              'correo': experiencia.correo, 'comentario': experiencia.comentario,
                              'lugar': experiencia.lugar, 'comentario_experiencia': experiencia.comentario_experiencia}
                             for experiencia in experiencias]
        return jsonify(experiencias_json)

    @app.route('/experiencias/<int:experiencia_id>', methods=['PUT'])
    def actualizar_experiencia(experiencia_id):
        experiencia = Experiencia.query.get_or_404(experiencia_id)
        data = request.get_json()
        for key, value in data.items():
            setattr(experiencia, key, value)
        db.session.commit()
        return jsonify({'status': 'Experiencia actualizada exitosamente'}), 200

    @app.route('/experiencias/<int:experiencia_id>', methods=['DELETE'])
    def eliminar_experiencia(experiencia_id):
        experiencia = Experiencia.query.get_or_404(experiencia_id)
        db.session.delete(experiencia)
        db.session.commit()
        return jsonify({'status': 'Experiencia eliminada exitosamente'}), 200

# app.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from routes import setup_routes

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://usuario_mysql:contraseña_mysql@localhost/nombre_de_la_base_de_datos'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Configuración y registro de rutas
setup_routes()
