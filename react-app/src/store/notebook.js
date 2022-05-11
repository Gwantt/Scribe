const LOAD = 'notebooks/LOAD'
const CREATE = 'notebooks/CREATE'

const load = (notebooks) => ({
    type: LOAD,
    notebooks
})

const create = notebook => ({
    type: CREATE,
    notebook
})


export const loadAllNotebooksThunk = (id) => async dispatch => {
    const res = await fetch(`/api/notebooks/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(res.ok) {
        const notebooks = await res.json()
        dispatch(load(notebooks))
        return res
    }
}

export const createNotebookThunk = (id, payload) => async dispatch => {
    const res = await fetch(`/api/notebooks/${id}`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if(res.ok) {
        const createdNotebook = await res.json()
        dispatch(create(createdNotebook))
        return createdNotebook;
    }
}


const notebookReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD:
            const newState = {}
            action.notebooks.notebooks.forEach(notebook => {
                newState[notebook.id] = notebook
            })
            return {
                ...state,
                ...newState
            }
        case CREATE:
            if(!state[action.notebook.notebook.id]) {
                const newState = {
                    ...state,
                    [action.notebook.notebook.id]: action.notebook.notebook
                }
                return newState
            }
            return {
                ...state,
                [action.notebook.notebook.id]: {
                    ...state[action.notebook.notebook.id],
                    ...action.notebook.notebook
                }
            }
        default:
            return state
    }
}

export default notebookReducer
