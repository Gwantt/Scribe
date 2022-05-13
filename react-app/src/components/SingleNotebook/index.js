import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as notebookActions from '../../store/notebook'
import * as noteAction from '../../store/notes'
import './singlenote.css'
import Note from "../Note";


const SingleNotebook = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    // id of the notebook 1
    const { id } = useParams()
    const user = useSelector(state => state.session.user)
    const notebook = useSelector(state => state.notebooks)
    const notes = useSelector(state => state.notes)
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [errors, setErrors] = useState([])
    const [edit, setShowEdit] = useState(false)
    const [showNote, setShowNote] = useState(false)
    const [note, setNote] = useState()
    const [content, setContent] = useState()

    useEffect(async () => {
        await dispatch(notebookActions.loadOneThunk(id))
        await dispatch(noteAction.loadNotesThunk(id))
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

        if (title !== notebook[id]?.title || description !== notebook[id]?.description) {
            setShowEdit(true)
        } else {
            setShowEdit(false)
        }
    }, [title, description])

    const newNotePayload = {
        owner_id: user.id,
        notebook_id: id
    }

    const notesArray = Object.values(notes)
    console.log(notesArray)

    return (
        <div className="notebookNav">
            <div className="notebookformdiv">
                <form className="main" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: 'min-content', border: 'none' }}>
                    {errors && errors.map((error, idx) => (
                        <li style={{ color: 'red', listStyle: 'none' }} key={idx}>{error}</li>
                    ))}
                    <input
                        spellCheck='false'
                        type="input"
                        style={{ color: 'white', height: '100px', fontSize: '40px', border: 'none', focus: 'none', textDecoration: 'none', fontWeight: '600', border: 'none', outline: 'none', background: 'transparent' }}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <br>
                    </br>
                    <input
                        spellCheck='false'
                        style={{ color: 'white', border: 'none', width: '500px', background: 'transparent' }}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    {edit && (
                        <button style={{ width: 'min-content' }}>Update</button>
                    )}
                </form>
                <button className='main' onClick={() => {
                    dispatch(notebookActions.deleteNotebookThunk(id))
                    history.push('/')
                }}>Delete Notebook</button>
                <button onClick={() => dispatch(noteAction.createNoteThunk(id, newNotePayload))}>New Note</button>
            </div>
            <>
                <div className="secondMain">
                    {notesArray && notesArray.map(note => (
                        <>
                            <a onClick={() => {
                                setShowNote(true)
                                dispatch(noteAction.getNote(note?.id))
                                setContent(note.id.note)
                                setNote(note.id.title)
                            }} key={note?.id}>
                                <div className="note" key={note?.id}>
                                    <h3 style={{ color: 'white' }}>{note?.title ? note?.title : 'Untitled'}</h3>
                                </div>
                            </a>

                        </>
                    ))}

                    <div className="outerFormDiv">
                        <div className="innerFormDiv">
                            {showNote && (

                                <form className="noteForm">
                                    <input
                                        className="noteInput"
                                        value={note}
                                        placeholder='name'
                                        onChange={e => setNote(e.target.value)}
                                    />
                                    <textarea
                                        className="noteInput"
                                        value={content}
                                        placeholder='start writing...'
                                        onChange={e => setContent(content)}
                                    />
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </>
        </div>
    )


}

export default SingleNotebook
