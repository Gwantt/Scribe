import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as notebookActions from '../../store/notebook'
import reducer from "../../store/session";

const SingleNotebook = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    // id of the notebook 1
    const { id } = useParams()
    const user = useSelector(state => state.session.user)
    const notebook = useSelector(state => state.notebooks)
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [errors, setErrors] = useState([])
    const [edit, setShowEdit] = useState(false)

    useEffect(async () => {
        await dispatch(notebookActions.loadOneThunk(id))
    }, [dispatch, id])

    if (!user) {
        history.push('/')
    }

    useEffect(() => {
        if (notebook) {
            setTitle(notebook[id]?.title)
            setDescription(notebook[id]?.description)
        }
    }, [notebook])

    const handleSubmit = async e => {
        e.preventDefault()
        const errors = []
        if (title.length < 1 || title.length > 30) errors.push('Title must be shorter than 30 characters but longer than 1 character')
        if (description.length > 100) errors.push('Description must be less than 100 characters')
        if (description.length < 1) errors.push("Must have a description")
        if (errors.length) {
            setErrors(errors)
            return
        }

        const payload = {
            title,
            description
        }
        setShowEdit(false)

        dispatch(notebookActions.updateNotebookThunk(id, payload))
    }
    useEffect(() => {

        if(title !== notebook[id]?.title || description !== notebook[id]?.description) {
            setShowEdit(true)
        } else {
            setShowEdit(false)
        }
    }, [title, description])

    return (
        <>
                <>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: 'min-content', border: 'none' }}>
                        {errors && errors.map((error, idx) => (
                            <li style={{color:'red', listStyle:'none'}}key={idx}>{error}</li>
                        ))}
                        <input
                            spellCheck='false'
                            type="input"
                            style={{ color:'white', height: '100px', fontSize: '40px', border: 'none', focus: 'none', textDecoration: 'none', fontWeight: '600', border:'none', outline:'none', background:'transparent' }}
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <br>
                        </br>
                        <input
                            spellCheck='false'
                            style={{ color:'white', border: 'none', width:'500px', background:'transparent' }}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        {edit && (
                            <button style={{width: 'min-content'}}>Update</button>
                        )}
                    </form>
                    <button onClick={() => {
                        dispatch(notebookActions.deleteNotebookThunk(id))
                        history.push('/')
                    }}>Delete Notebook</button>
                    <button onClick={() => dispatch(noteAction.createNoteThunk())}>New Note</button>
                </>
        </>
    )


}

export default SingleNotebook
