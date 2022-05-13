from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField

class CreatingNotesForm(FlaskForm):
    title = StringField('title')
    background_img = StringField('background_img')
    note = TextAreaField('note')
    owner_id = IntegerField('owner_id')
    notebook_id = IntegerField('notebook_id')
