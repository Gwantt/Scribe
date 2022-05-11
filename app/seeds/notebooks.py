from app.models import db, Notebooks

def seed_notebooks():
    demo = Notebooks(
        owner_id=1, title='Demo Notebook', description='Notebook for the demo user'
    )
    marnie = Notebooks(
        owner_id=2, title='Marnie\'s Notebook', description='Notebook for Bobbie'
    )
    bobbie = Notebooks(
        owner_id=3, title='Bobbie\'s Notebook', description='Notebook for Bobbie'
    )
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()

def undo_notebooks():
    db.session.execute('TRUNCATE notebooks RESTART IDENTITY CASCADE;')
    db.session.commit()
