import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import * as notebookActions from '../../store/notebook'
import './notebooks.css'
import { AiFillPlusCircle, AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import NotebookFormModal from "../NotebookForm/NotebookFormModal";

const Notebooks = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const notebooks = useSelector(state => state.notebooks)
    const [quotes, setQuotes] = useState()
    const [time, setTime] = useState(new Date());
    const arrayNotebooks = Object.values(notebooks)
    const [notes, setNotes] = useState([])
    const [timeArray, setTimeArray] = useState([])
    const [timeOfDay, setTimeOfDay] = useState("")
    const [hour, setHour] = useState('')
    const [day, setDay] = useState()


    useEffect(() => {
        const notes = arrayNotebooks[0]?.notes
        if(notes?.length <= 5) {
            setNotes(notes)
        } else {
            const sliced = notes?.slice(0, 5)
            setNotes(sliced)
        }
    }, [user.id, arrayNotebooks])

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


    useEffect(() => {
        setInterval(() => {
            setTime(new Date().toLocaleString());
        }, 1000);

    }, [])

    useEffect(() => {
        if(typeof(time) === 'string') {
            const split = time.split(' ')
            setTimeArray(split)
            setHour(split[1].split(':')[0])
            setDay(split[0])

            if(timeArray[2] === 'AM') {
                setTimeOfDay('Morning')
                return
            } else if (timeArray[2] === 'PM' && parseInt(hour) < 6) {
                setTimeOfDay('Afternoon')
                return
            } else {
                setTimeOfDay('Evening')
                return
            }
        }
    }, [time])


    return (
        <>
            <img style={{objectFit:'contain', height:'70%', width:'50%', position:'absolute', transform:'translate(50%, -7%)'}} src="https://res.cloudinary.com/daeopbcax/image/upload/v1652913929/feather/pohsun_lkk9gv.png"/>
            <img style={{objectFit:'contain', width:'20%', height:'20%', position:'absolute', transform:'translate(90%, 99%)', zIndex:'100'}}src='https://res.cloudinary.com/daeopbcax/image/upload/v1652915475/feather/reverse_top_hand_o0loqk.png' />
            <img style={{objectFit:'contain', width:'20%', height:'20%', position:'absolute', transform:'translate(365%, 98.9%)', zIndex:'100'}}src='https://res.cloudinary.com/daeopbcax/image/upload/v1652914261/feather/top_hand_xrvqjx.png' />
            <h3 style={{ color: 'white', marginLeft: '250px', marginBottom: '70px' }}>Good {timeOfDay}, {user.username}</h3>
            <h3 style={{ marginLeft: '250px', color: 'white', position: 'absolute', right: '0', top: '0', display: 'flex', flexDirection: 'column' }}>{`${time}`}</h3>
            <div className="splash-wrapper">
                <div className="notebooks">
                    <h5 style={{ color: 'white' }}>Notebooks</h5>
                    <div className="innerDiv">
                        {arrayNotebooks.map((notebook, idx) => (
                            <>
                                <a style={{ textDecoration: 'none', color: 'inherit', backgroundColor: 'transparent' }} href={`/notebook/${notebook.id}`} className='notebook' key={idx}>
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
                <div className="quoteWrapper">
                    <div className="quoteDiv">
                        <h3 style={{color:'white'}}>Random Famous Quote Of Wisdom</h3>
                        <p style={{ color: 'white', fontWeight: '600' }}>{quotes?.content}</p>
                        <h4 style={{color:'#babac0'}}>{quotes?.author}</h4>
                    </div>
                </div>
                <div className='notes'>
                    <h5 style={{ color: 'white' }}>Notes</h5>
                    <div className="innerDiv">
                        {notes?.map(note => (
                            <>
                                <a style={{ textDecoration: 'none', color: 'white', backgroundColor: 'transparent' }} href={`/notebook/${note.notebook_id}`} className='notebook'>
                                    <div className="notebookCard">
                                        <div className="notebookTitle">
                                            <p>{note?.title}</p>
                                        </div>
                                    </div>
                                </a>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notebooks
