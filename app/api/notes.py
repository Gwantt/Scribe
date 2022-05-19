from flask import Blueprint, jsonify, session, request
from app.models import db, User, Notebooks, Notes
from flask_login import current_user
from app.forms import CreatingNotesForm

note_routes = Blueprint('notes', __name__)

@note_routes.route('/<int:id>')
def get_single_note(id):
    print('\n', id, '<---- \n')
    note = Notes.query.get(id)
    print(note.to_dict(), '<--- \n')
    return {'note': note.to_dict()}


@note_routes.route('/<int:id>/update', methods=['PATCH'])
def update_note(id):
    note = Notes.query.get(id)
    form = CreatingNotesForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data

        note.note = data['note']
        note.title = data['title']

        db.session.commit()

        return note.to_dict()
    return form.errors

@note_routes.route('/<int:id>/delete', methods=['DELETE'])
def delete_note(id):
    note = Notes.query.get(id)
    db.session.delete(note)
    db.session.commit()
    return note.to_dict()

# @note_routes.route('/<int:id>/user')
# def user_notes(id):
#     notes = Notes.query.first(id)
