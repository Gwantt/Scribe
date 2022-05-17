import React from "react";
import { useHistory } from "react-router-dom";
import './home.css'

const Home = () => {
    const history = useHistory()
    return (
        <div className="homeWrapper">
            <h1>Get Started</h1>
            <button onClick={() => history.push('/sign-up')}>Sign Up</button>
            <button onClick={() => history.push('/login')}>Log In</button>
        </div>
    )
}

export default Home
