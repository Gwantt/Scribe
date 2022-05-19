from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length


class EditNotebookForm(FlaskForm):
    title = StringField('title')
    description = StringField('description')
