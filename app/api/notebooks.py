from flask import Blueprint, jsonify, session, request
from app.models import db, User, Notebooks, Notes
from flask_login import current_user
from app.forms import NotebookForm, EditNotebookForm

notebook_routes = Blueprint('notebooks', __name__)

@notebook_routes.route('/<int:id>')
def get_all_notebooks(id):
    # get all notebooks associated to the current_user
    user = User.query.get(id)
    notebooks = user.notebooks
    print(notebooks, '<====\n')
    return { 'notebooks': [notebook.to_dict() for notebook in notebooks] }


@notebook_routes.route('/<int:id>', methods=["POST"])
def post_notebook(id):
    form = NotebookForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        notebook = Notebooks(
            title=data['title'],
            description=data['description'],
            owner_id=id
        )
        db.session.add(notebook)
        db.session.commit()

        return {'notebook': notebook.to_dict()}
    return form.errors


@notebook_routes.route('/single/<int:id>')
def get_one(id):
    notebook = Notebooks.query.get(id)
    return {'notebook': notebook.to_dict()}


@notebook_routes.route('/delete/<int:id>', methods=['DELETE'])
def delete_notebook(id):
    notebook = Notebooks.query.get(id)
    db.session.delete(notebook)
    db.session.commit()
    return notebook.to_dict()


@notebook_routes.route('/update/<int:id>', methods=['POST'])
def update_notebook(id):
    notebook = Notebooks.query.get(id)
    form = EditNotebookForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data

        notebook.title=data['title']
        notebook.description=data['description']

        db.session.commit()

        return notebook.to_dict()

    return form.errors
