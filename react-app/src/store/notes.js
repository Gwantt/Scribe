const CREATE = 'notes/CREATE'
const LOAD = 'notes/LOAD'
const LOAD_ONE = 'notes/LOAD_ONE'
const UPDATE= 'notes/UPDATE'

const create = note => ({
    type: CREATE,
    note
})

const load = notes => ({
    type: LOAD,
    notes
})

const loadOne = note => ({
    type: LOAD_ONE,
    note
})

const update = note => ({
    type: UPDATE,
    note
})


export const createNoteThunk = (id, payload) => async dispatch => {
    const res = await fetch(`/api/notebooks/${id}/notes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })



    if(res.ok) {
        console.log('res ok')
        const newNote = await res.json()
        dispatch(create(newNote))
    }
}

export const loadNotesThunk = id => async dispatch => {
    console.log('in the notes loading thunk')
    const res = await fetch(`/api/notebooks/${id}/notes`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    // console.log()
    if(res.ok) {
        const notes = await res.json()
        console.log(notes)
        dispatch(load(notes))
    }
}

export const getNote = id => async dispatch => {
    const res = await fetch(`/api/notes/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(res.ok) {
        const note = await res.json()
        dispatch(loadOne(note))
    }
}

export const updateNote = (payload, id) => async dispatch => {
    const res = await fetch(`/api/notes/${id}/update`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if(res.ok) {
        const updatedNote = await res.json()
        dispatch(update(updatedNote))
    }
}

const notesReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE:
            console.log('action --->', action.note)
            if(!state[action.note.note.id]) {
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
            const allNotes = {};
            action.notes.notes.forEach(note => {
                allNotes[note.id] = note;
            })
            return {...allNotes, ...state}
        case LOAD_ONE:
            const newState = {}
            newState[action.note.note.id]=action.note.note
            return {
                ...state, ...newState
            }
        case UPDATE:
            const updatedState = {...state};
            updatedState[action.note.id] = action.note
            return updatedState;
        default:
            return state

    }
}

export default notesReducer
