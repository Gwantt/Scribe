from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class NotebookForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(min=1, max=30)])
    description = StringField('description', validators=[DataRequired(), Length(min=1, max=100)])
