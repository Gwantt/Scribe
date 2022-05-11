const LOAD = 'notebooks/LOAD'
const CREATE = 'notebooks/CREATE'
const LOAD_ONE = 'notebooks/LOAD_ONE'
const DELETE = 'notebooks/DELETE'
const UPDATE = 'notebooks/UPDATE'


const load = (notebooks) => ({
    type: LOAD,
    notebooks
})

const create = notebook => ({
    type: CREATE,
    notebook
})

const loadOne = notebook => ({
    type: LOAD_ONE,
    notebook
})

const deleteOne = id => ({
    type: DELETE,
    id
})

const updateOne = notebook => ({
    type: UPDATE,
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

export const loadOneThunk = id => async dispatch => {
    const res = await fetch(`/api/notebooks/single/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(res.ok) {
        const notebook = await res.json()
        dispatch(loadOne(notebook))
    }
}

export const deleteNotebookThunk = id => async dispatch => {
    const res = await fetch(`/api/notebooks/delete/${id}`, {
        method: 'DELETE',
    })
    if(res.ok) {
        dispatch(deleteOne(id))
    }
}

export const updateNotebookThunk = (id, payload) => async dispatch => {
    const res = await fetch(`/api/notebooks/update/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if(res.ok) {
        const updatedNotebook = await res.json()
        dispatch(updateOne(updatedNotebook))
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
        case LOAD_ONE:
            const singleBook = {}
            singleBook[action.notebook.notebook.id] = action.notebook.notebook;
            return {...state, ...singleBook}
        case DELETE:
            const deleteState = {...state}
            delete deleteState[action.id]
            return deleteState

        case UPDATE:
            const updateState = { ...state };
            updateState[action.notebook.id] = action.notebook;
            return updateState
        default:
            return state
    }
}

export default notebookReducer
