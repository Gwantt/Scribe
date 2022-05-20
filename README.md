# Overvieww

Scribe is a note taking app based off of Evernote. It allows you to to create notes/notebooks and write down anything you wish in your notes.

# Application Architecture

Scribe is built on a React frontend with a Flask backend, using PostgreSQL as a database.

# Techonologies Used

## Frontend 
- React
- Redux
- JavaScript
- HTML
- CSS

## Backend
- Python
- Flask
- PostgreSQL 
- SQLAlchemy

# Scribe Setup
1. Clone this repository (https://github.com/Gwantt/Scribe)
2. Install dependencies - `pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt`
3. Crfeate a `.env` file based on the `.env.example` with proper settings required for development environment
4. Set up PostgreSQL user, password and database, make sure it matches with your `.env` file
5. In the root directory in the terminal run `pipenv shell` then run the following commands
   - `flask db upgrade`
   - `flask seed all`
   - `flask run`
6. To run the React App in development, checkout the README inside the `react-app` directory

# Features

# Notebooks/Notes

Users can view their notebooks when logged in. Users can also create notebooks using the create notebook button

![image](https://user-images.githubusercontent.com/65691441/169602593-dce343ba-3076-4c4e-92ff-110750e73b1b.png)

## Notebook Page

Upon Selecting a notebook users can view all their notes apart of said notebook, users on this page can also edit the title and description of their notebook if the choose to do so, users can also create notes through the create note button. A selected note will show up on the right side of the screen. Notes have autosave and can be deleted through their associated delete button

![image](https://user-images.githubusercontent.com/65691441/169602793-c8abb1ca-9a87-43bd-a8d9-8765a82d3aa5.png)


