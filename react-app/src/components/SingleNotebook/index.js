import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as notebookActions from '../../store/notebook'
import * as notesAction from '../../store/notes'
import { loadOneNoteThunk, deleteOneThunk } from "../../store/note";
import './singlenote.css'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState, convertFromHTML, convertToRaw, SelectionState, toHtml } from 'draft-js'
import draftToHtml from 'draftjs-to-html';
import RichTextEditor from 'react-rte';

const SingleNotebook = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const didMount = useRef(false)
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
    const [editorState, setEditorState] = useState(RichTextEditor.createEmptyValue())

    const onEditorStateChange = editorState => {
        moveSelectionToEnd(editorState)
        setEditorState(editorState)
        setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        // if (toHtml(editorState) === content) return
    }

    const moveSelectionToEnd = editorState => {
        const content = editorState.getCurrentContent();
        const blockMap = content.getBlockMap();

        const key = blockMap.last().getKey();
        const length = blockMap.last().getLength();

        const selection = new SelectionState({
            anchorKey: key,
            achorOffset: length,
            focusKey: key,
            focusOffset: length
        })
        return EditorState.forceSelection(editorState, selection)
    }

    useEffect(() => {
        setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(
            convertFromHTML(content ? content : '')
        )))
    }, [noteId, content])

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
        e?.preventDefault()
        const errors = []
        if (title?.length < 1 || title?.length > 30) errors.push('Title must be at least 1 character, and less than 30')
        if (description?.length > 100) errors.push('Description must be less than 100 characters')
        if (description?.length < 1) errors.push("Must have a description")
        if (errors?.length) {
            setErrors(errors)
            return
        }

        const payload = {
            title,
            description
        }
        setShowEdit(false)
        setErrors([])
        dispatch(notebookActions.updateNotebookThunk(id, payload))
    }

    useEffect(() => {

        if (title !== notebook[id]?.title || description !== notebook[id]?.description) {
            setShowEdit(true)
        } else {
            setShowEdit(false)
        }
    }, [title, description])

    let newNotePayload;
    if (user) {
        newNotePayload = {
            owner_id: user.id,
            notebook_id: id
        }
    }

    const notesArray = Object.values(notes)

    const handleNoteSubmit = async (e) => {
        e?.preventDefault()

        const notePayload = {
            title: note,
            note: content
        }

        dispatch(notesAction.updateNote(notePayload, noteId))
    }

    useEffect(() => {
        console.log('Autosaving')
        if (didMount.current) {
            handleNoteSubmit()
        } else {
            didMount.current = true;
        }
    }, [note, content, noteId, editorState])

    // ? Causing bugs
    // useEffect(() => {
    //     if (didMount.current) {
    //         handleSubmit()
    //     } else {
    //         didMount.current = true;
    //     }
    // }, [title, description])

    useEffect(() => {
        if (selectedNote) {
            setNoteId(selectedNote.id || '')
            setContent(selectedNote.note || '')
            setNote(selectedNote.title || '')
        } else {
            setNoteId(null)
            setContent(null)
            setNote(null)
        }
    }, [selectedNote])

    return (
        <div className="notebookNav">
            <div className="notebookformdiv" style={{ position: 'absolute', top: '0' }}>
                <form className="main" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: 'min-content', border: 'none' }}>
                    {errors && errors.map((error, idx) => (
                        <li style={{ color: 'red', listStyle: 'none', width: '250px', fontWeight: '400' }} key={idx}>{error}</li>
                    ))}
                    <input
                        spellCheck='false'
                        type="input"
                        style={{ color: 'white', height: '100px', fontSize: '17px', border: 'none', focus: 'none', textDecoration: 'none', fontWeight: '600', border: 'none', outline: 'none', background: 'transparent' }}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <br>
                    </br>
                    <input
                        spellCheck='false'
                        style={{ color: 'white', border: 'none', width: '300px', background: 'transparent', outline: 'none' }}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    {edit && (
                        <button style={{ width: 'min-content' }}>Update</button>
                    )}
                </form>
                <button className='main' onClick={async () => {
                    await dispatch(notebookActions.deleteNotebookThunk(id))
                    history.push('/')
                }}>Delete Notebook</button>
                <button onClick={() => dispatch(notesAction.createNoteThunk(id, newNotePayload))}>New Note</button>
            </div>
            <>
                <div className="secondMain" style={{ marginTop: '200px', display: 'block', position: 'absolute', zIndex: '1000' }}>
                    <div>
                        {notesArray && notesArray?.map(note => (
                            <div className="noteList" >
                                <a onClick={() => {
                                    setShowNote(true)
                                    dispatch(loadOneNoteThunk(note?.id || note?.note.id))
                                }} key={note?.id}>
                                    <div className="note" key={note?.id}>
                                        <h3 style={{ color: 'white' }}>{note?.title ? note?.title : 'Untitled'}</h3>
                                        <button onClick={async () => {
                                            setShowNote(false)
                                            await dispatch(notesAction.deleteNoteThunk(note?.id || note?.note.id))
                                            dispatch(deleteOneThunk())
                                        }}>Delete</button>
                                    </div>
                                </a>

                            </div>
                        ))}
                    </div>
                </div>
                <div className="outerFormDiv" style={{ marginLeft: '500px' }}>
                    <div className="innerFormDiv">
                        <div>

                        </div>
                        {showNote && noteId && (
                            <form onSubmit={handleNoteSubmit} className="noteForm">
                                <input
                                    className="noteInput input"
                                    style={{ border: 'none', outline: 'none', borderBottom: '1px solid #008F26' }}
                                    value={note || ''}
                                    placeholder='name'
                                    onChange={e => setNote(e.target.value)}
                                />
                                {/* almost works but showing up before the input  */}
                                {/* <Editor
                                    editorState={editorState}
                                    wrapperClassName="wrapper-class"
                                    editorClassName="editor-class"
                                    toolbarClassName="toolbar-class"
                                    onEditorStateChange={editorState => {
                                        setEditorState(editorState)
                                        setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
                                        moveSelectionToEnd(editorState)
                                    }}
                                /> */}
                                {/* <Editor
                                    editorState={editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={onEditorStateChange}
                                /> */}

                                <textarea
                                    className="noteInput textarea"
                                    value={content || ''}
                                    style={{ border: 'none', outline: 'none', resize: 'none' }}
                                    placeholder='start writing...'
                                    onChange={e => setContent(e.target.value)}
                                />
                                {/* <button onClick={handleNoteSubmit}>submit</button> */}
                            </form>
                        )}
                    </div>
                </div>
            </>
        </div>
    )


}

export default SingleNotebook
