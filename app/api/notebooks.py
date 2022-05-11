from flask import Blueprint, jsonify, session, request
from app.models import db, User, Notebooks, Notes
from flask_login import current_user
from app.forms import NotebookForm

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
