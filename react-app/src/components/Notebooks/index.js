import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from "react-router-dom";
import * as notebookActions from '../../store/notebook'

const Notebooks = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session.user)
    const notebooks = useSelector(state => state.notebooks)

    const arrayNotebooks = Object.values(notebooks)

    useEffect(() => {
        dispatch(notebookActions.loadAllNotebooksThunk(user.id))
    }, [dispatch])

    return (
        <>
            <h1>Notebooks</h1>
            {arrayNotebooks.map((notebook, idx) => (
                <li key={idx}>
                    {notebook.title}
                </li>
            ))}
        </>
    )
}

export default Notebooks
