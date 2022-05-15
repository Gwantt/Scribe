import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import * as notebookActions from '../../store/notebook'
import './notebooks.css'
import { AiFillPlusCircle, AiFillGithub, AiFillLinkedin } from 'react-icons/ai'

const Notebooks = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session.user)
    const notebooks = useSelector(state => state.notebooks)

    const arrayNotebooks = Object.values(notebooks)

    useEffect(() => {
        dispatch(notebookActions.loadAllNotebooksThunk(user.id))
    }, [dispatch, user.id])
    let date;
    useEffect(() => {
        date = new Date().getHours()
    }, [])
    return (
        <>
            <h3 style={{ color: 'white', marginLeft: '250px' }}>Good {date < 12 ? 'Morning' : 'Evening'}, {user.username}</h3>
            <div className="splash-wrapper">
                <article className="notebooks">
                    <h5 style={{ color: 'white' }}>Notebooks</h5>
                    <div className="innerDiv">
                        {arrayNotebooks.map((notebook, idx) => (
                            <a style={{ textDecoration: 'none', color: 'inherit' }} href={`/notebook/${notebook.id}`} className='notebook' key={idx}>
                                <div className="notebookCard">
                                    <div className="notebookTitle">
                                        <p style={{ color: "white" }}>{notebook.title}</p>
                                    </div>
                                    <div className="notebookDescription">
                                        <p>{notebook.description}</p>
                                    </div>
                                </div>
                            </a>
                        ))}
                        <button style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} className="notebookCard" onClick={() => history.push('/new-notebook')}>
                            Create New Notebook
                            <AiFillPlusCircle style={{ fontSize: '40px', margin: '16px' }} />
                        </button>
                    </div>
                </article>
                <div className="grantLinks">
                    <p style={{ margin: '5px', color: 'white', padding: "5px", fontWeight: '600' }}>Created By Grant Walton</p>
                    <div className="myLinks">
                        <a style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:'100px'}} href='https://www.linkedin.com/in/grant-walton-795261235/' target="_blank">LinkedIn <AiFillLinkedin /> </a>
                        <a style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:'100px'}} href='https://github.com/Gwantt' target="_blank">Github <AiFillGithub /> </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notebooks
