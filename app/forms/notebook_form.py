from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class NotebookForm(FlaskForm):
    title = StringField('title')
    description = StringField('description')
