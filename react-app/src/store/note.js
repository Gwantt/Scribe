const LOAD_ONE = 'note/LOAD_ONE'

const loadOne = note => ({
    type: LOAD_ONE,
    note
})


export const loadOneNoteThunk = id => async dispatch => {
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


const noteReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_ONE:
            const newState = {}
            newState['note'] = action.note.note
            return newState
        default:
            return state
    }
}

export default noteReducer;
