import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import * as notebookActions from '../../store/notebook'
import './notebooks.css'
import { AiFillPlusCircle } from 'react-icons/ai'

const Notebooks = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session.user)
    const notebooks = useSelector(state => state.notebooks)

    const arrayNotebooks = Object.values(notebooks)

    useEffect(() => {
        dispatch(notebookActions.loadAllNotebooksThunk(user.id))
    }, [dispatch, user.id])

    return (
        <div className="splash-wrapper">
            <article className="notebooks">
                <h5>Notebooks</h5>
                <div className="innerDiv">
                    {arrayNotebooks.map((notebook, idx) => (
                        <a style={{textDecoration:'none', color:'inherit'}} href={`/notebook/${notebook.id}`} className='notebook' key={idx}>
                            <div className="notebookCard">
                                <div className="notebookTitle">
                                    <p>{notebook.title}</p>
                                </div>
                                <div className="notebookDescription">
                                    <p>{notebook.description}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                    <button style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}className="notebookCard" onClick={() => history.push('/new-notebook')}>
                        Create New Notebook
                        <AiFillPlusCircle style={{fontSize:'40px', margin:'16px'}}/>
                    </button>
                </div>
            </article>
        </div>
    )
}

export default Notebooks
