const CREATE = 'notes/CREATE'
const LOAD = 'notes/LOAD'

const create = note => ({
    type: CREATE,
    note
})

const load = notes => ({
    type: LOAD,
    notes
})


export const createNoteThunk = id => async dispatch => {
    const res = fetch(`/api/notebooks/${id}/notes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    })

    if(res.ok) {
        const newNote = await res.json()
        dispatch(create(newNote))
    }
}

export const loadNotesThunk = id => async dispatch => {
    const res = fetch(`/api/notebooks/${id}/notes`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(res.ok) {
        const notes = await res.json()
        dispatch(load(notes))
    }
}

const notesReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE:
            if(!state[action.newNote.note.id]) {
                const newState = {
                    ...state,
                    [action.note.note.id]: action.newNote
                }
                return newState
            }
            return {
                ...state,
                [action.note.note.id]:{
                    ...state[action.note.note.id],
                    ...action.note.note
                }
            }

        case LOAD:
        default:
            return state

    }
}

export default notesReducer
