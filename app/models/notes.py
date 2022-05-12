from .db import db
from .note_tags import note_tags

class Notes(db.Model):
    __tablename__='notes'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=True)
    note = db.Column(db.String, nullable=True)
    background_img = db.Column(db.String, nullable=True)

    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    notebook_id=db.Column(db.Integer, db.ForeignKey('notebooks.id'))

    notebook = db.relationship('Notebooks', back_populates='notes')

    tags = db.relationship(
        'Tags',
        secondary=note_tags,
        back_populates='notes'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'note': self.note,
            'background_img': self.background_img,
            'owner_id': self.owner_id,
            'notebook_id': self.notebook_id
        }
