"""empty message

Revision ID: 9962e3937486
Revises: 
Create Date: 2022-05-10 13:19:06.897466

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9962e3937486'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tags',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('profile_pic', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('notebooks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=30), nullable=False),
    sa.Column('description', sa.String(length=100), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('notes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('note', sa.String(), nullable=True),
    sa.Column('background_img', sa.String(), nullable=True),
    sa.Column('owner_id', sa.Integer(), nullable=True),
    sa.Column('notebook_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['notebook_id'], ['notebooks.id'], ),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('note_tags',
    sa.Column('tag_id', sa.Integer(), nullable=False),
    sa.Column('note_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['note_id'], ['notes.id'], ),
    sa.ForeignKeyConstraint(['tag_id'], ['tags.id'], ),
    sa.PrimaryKeyConstraint('tag_id', 'note_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('note_tags')
    op.drop_table('notes')
    op.drop_table('notebooks')
    op.drop_table('users')
    op.drop_table('tags')
    # ### end Alembic commands ###
