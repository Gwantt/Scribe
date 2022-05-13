from flask import Blueprint, jsonify, session, request
from app.models import db, User, Notebooks, Notes
from flask_login import current_user


note_routes = Blueprint('notes', __name__)

@note_routes.route('/<int:id>')
def get_single_note(id):
    note = Notes.query.get(id)
    return {'note': note.to_dict()}
