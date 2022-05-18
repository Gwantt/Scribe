import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import * as notebookActions from '../../store/notebook'
import './notebooks.css'
import { AiFillPlusCircle, AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import NotebookFormModal from "../NotebookForm/NotebookFormModal";

const Notebooks = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session.user)
    const notebooks = useSelector(state => state.notebooks)
    const [quotes, setQuotes] = useState()

    const arrayNotebooks = Object.values(notebooks)

    useEffect(() => {
        dispatch(notebookActions.loadAllNotebooksThunk(user.id))
    }, [dispatch, user.id])

    const fetchQuote = async () => {
        const res = await fetch('https://api.quotable.io/random')
        const data = await res.json()
        console.log(data)
        setQuotes(data)
    }

    useEffect(() => {
        fetchQuote()
    }, [])

    let date;
    useEffect(() => {
        date = new Date().getHours()
    }, [])
    return (
        <>
            <h3 style={{ color: 'white', marginLeft: '250px' }}>Good Evening, {user.username}</h3>
            <div className="splash-wrapper">
                <div className="notebooks">
                    <h5 style={{ color: 'white' }}>Notebooks</h5>
                    <div className="innerDiv">
                        {arrayNotebooks.map((notebook, idx) => (
                            <>
                                <a style={{ textDecoration: 'none', color: 'inherit', backgroundColor:'transparent' }} href={`/notebook/${notebook.id}`} className='notebook' key={idx}>
                                    <div className="notebookCard">
                                        <div className="notebookTitle">
                                            <p style={{ color: "white" }}>{notebook.title}</p>
                                        </div>
                                        <div className="notebookDescription">
                                            <p>{notebook.description}</p>
                                        </div>
                                    </div>
                                </a>
                                <div className="dummy">&nbsp;</div>
                            </>
                        ))}
                        <NotebookFormModal />
                    </div>
                </div>
                <div className="grantLinks">
                    <p style={{ margin: '5px', color: 'white', padding: "5px", fontWeight: '600' }}>Created By Grant Walton</p>
                    <div className="myLinks">
                        <a style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100px' }} href='https://www.linkedin.com/in/grant-walton-795261235/' target="_blank">LinkedIn <AiFillLinkedin /> </a>
                        <a style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100px' }} href='https://github.com/Gwantt' target="_blank">Github <AiFillGithub /> </a>
                    </div>
                </div>
            </div>
            <div>
                <p style={{color:'white'}}>{quotes?.content}</p>
            </div>
        </>
    )
}

export default Notebooks
