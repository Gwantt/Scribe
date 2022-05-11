import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as notebookActions from '../../store/notebook'

const SingleNotebook = () => {
    const dispatch = useDispatch()
    const history  = useHistory()

    const { id } = useParams()
    useEffect(() => {
        dispatch(notebookActions.loadOneThunk(id))
    }, [dispatch])

    const user = useSelector(state => state.session.user)
    const notebook = useSelector(state => state.notebooks.notebook)

   

    if(!user) {
        history.push('/')
    }


    return (
        // <h1>{notebook.title}</h1>
        <h1>hello</h1>
    )


}

export default SingleNotebook
