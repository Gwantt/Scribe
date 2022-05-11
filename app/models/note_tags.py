from .db import db

note_tags = db.Table(
    'note_tags',

    db.Column(
        'tag_id',
        db.Integer,
        db.ForeignKey('tags.id'),
        primary_key=True
    ),

    db.Column(
        'note_id',
        db.Integer,
        db.ForeignKey('notes.id'),
        primary_key=True
    )
)
