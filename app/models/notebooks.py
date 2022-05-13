from .db import db

class Notebooks(db.Model):
    __tablename__ = 'notebooks'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String(100), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    notes = db.relationship('Notes', back_populates='notebook', cascade='all, delete-orphan')
    owner = db.relationship('User', back_populates='notebooks')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'owner_id': self.owner_id
        }
