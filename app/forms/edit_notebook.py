from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length


class EditNotebookForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(max=30)])
    description = StringField('description', validators=[DataRequired(), Length( max=100)])
