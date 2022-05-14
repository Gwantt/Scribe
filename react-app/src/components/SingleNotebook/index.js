import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as notebookActions from '../../store/notebook'
import * as notesAction from '../../store/notes'
import { loadOneNoteThunk } from "../../store/note";
import './singlenote.css'
import {AiFillCloseCircle} from 'react-icons/ai'

const SingleNotebook = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    // id of the notebook 1
    const { id } = useParams()
    const user = useSelector(state => state?.session?.user)
    const notebook = useSelector(state => state?.notebooks)
    const notes = useSelector(state => state?.notes)
    const selectedNote = useSelector(state => state?.note?.note)
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [errors, setErrors] = useState([])
    const [edit, setShowEdit] = useState(false)
    const [showNote, setShowNote] = useState(false)
    const [note, setNote] = useState()
    const [content, setContent] = useState()
    const [noteId, setNoteId] = useState()


    // need to figure out the reload for notebooks notes
    useEffect(() => {
        dispatch(notebookActions.loadOneThunk(id))
        dispatch(notesAction.loadNotesThunk(id))
    }, [dispatch, id, notebook.notes])

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

    const handleNoteSubmit = async (e) => {
        e.preventDefault()
        const notePayload = {
            title: note,
            note: content
        }

        dispatch(notesAction.updateNote(notePayload, noteId))
    }

    useEffect(() => {
        if(selectedNote) {
            setNoteId(selectedNote.id || '')
            setContent(selectedNote.note || '')
            setNote(selectedNote.title || '')
        }
    }, [selectedNote])
    console.log(notes, 'notes from state')
    console.log(notesArray, ' <-- notesArray ')
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
                <button onClick={() => dispatch(notesAction.createNoteThunk(id, newNotePayload))}>New Note</button>
            </div>
            <>
                <div className="secondMain">
                    {notesArray && notesArray?.map(note => (
                        <>
                            <a onClick={() => {
                                setShowNote(true)
                                console.log(note, '<0----')
                                dispatch(loadOneNoteThunk(note?.id || note?.note.id))
                            }} key={note?.id}>
                                <div className="note" key={note?.id}>
                                    <h3 style={{ color: 'white' }}>{note?.title ? note?.title : 'Untitled'}</h3>
                                    <button onClick={() => dispatch(notesAction.deleteNoteThunk(note?.id || note?.note.id))}>Delete</button>
                                </div>
                            </a>

                        </>
                    ))}

                    <div className="outerFormDiv">
                        <div className="innerFormDiv">
                            {showNote && (

                                <form onSubmit={handleNoteSubmit} className="noteForm">
                                    <input
                                        className="noteInput input"
                                        value={note}
                                        placeholder='name'
                                        onChange={e => setNote(e.target.value)}
                                    />
                                    <textarea
                                        className="noteInput textarea"
                                        value={content}
                                        placeholder='start writing...'
                                        onChange={e => setContent(e.target.value)}
                                    />
                                    <button>submit</button>
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
