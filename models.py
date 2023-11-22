from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Experiencia(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    apellido = db.Column(db.String(50), nullable=False)
    correo = db.Column(db.String(100), nullable=False)
    comentario = db.Column(db.Text, nullable=False)
    lugar = db.Column(db.String(100), nullable=False)
    comentario_experiencia = db.Column(db.Text, nullable=False)
