from flask import Blueprint, jsonify, session, request
from app.models import db, User, Notebooks, Notes
from flask_login import current_user
from app.forms import CreatingNotesForm

note_routes = Blueprint('notes', __name__)

@note_routes.route('/<int:id>')
def get_single_note(id):
    note = Notes.query.get(id)
    return {'note': note.to_dict()}


@note_routes.route('/<int:id>/update')
def update_note(id):
    note = Notes.query.get(id)
    form = CreatingNotesForm()

    if form.validate_on_submit():
        data = form.data

        note['note'] = data['note']
        note['title'] = data['title']

        db.session.commit()

        return note.to_dict()
    return form.errors
