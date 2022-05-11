from .db import db
from .note_tags import note_tags

class Tags(db.Model):
    __tablename__='tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

    notes = db.relationship(
        'Notes',
        secondary=note_tags,
        back_populates='tags'
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }
