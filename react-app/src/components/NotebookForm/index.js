import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as notebookActions from '../../store/notebook'
import './notebookform.css'

const NotebookForm = ({ closeModal }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session.user)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState([])

    if(!user) {
        history.push('/forbidden')
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const errors = []

        if(title.length < 1 || title.length > 30) errors.push('Title must be longer than 1, but shorter than 30 characters')
        if(!description) errors.push('Please enter a description')
        if(description.length > 100) errors.push('Description must be less than 100 characters')


        if(errors.length ) {
            setErrors(errors)
            return;
        }

        const payload = {
            title,
            description
        }

        const newNotebook = await dispatch(notebookActions.createNotebookThunk(user.id, payload))

        if(newNotebook) {
            closeModal()
        //    history.push(`/`)
        }
    }

    return (
        <div className="logWrapper">
            <form className="mainForm notebookform" onSubmit={handleSubmit}>
                <ul className="errors">
                    {errors && errors.map((error, idx) => (
                        <li key={idx} style={{color:'red', fontWeight:'bold', listStyle:'none', marginBottom:'10px'}}>{error}</li>
                    ))}
                </ul>
                <h1>Create A New Notebook</h1>
                <div>
                    <input
                        type="input"
                        name='title'
                        placeholder="Title"
                        onChange={e => setTitle(e.target.value)}
                    />
                    <input
                        type='input'
                        name='description'
                        placeholder="Description"
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <button>Create Notebook</button>
            </form>
        </div>
    )
}

export default NotebookForm
