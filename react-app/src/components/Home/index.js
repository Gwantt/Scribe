import React from "react";
import { useHistory } from "react-router-dom";
import './home.css'

const Home = () => {
    const history = useHistory()
    return (
        <div className="homeWrapper">
            <div style={{display:'flex', flexDirection:'column', justifyContent:'flex-start'}}>
                <img style={{objectFit:'contain', height:'100px', marginTop:'30px'}} src='https://res.cloudinary.com/daeopbcax/image/upload/v1652739383/feather/feather_cunzre.png' />
                <h3>Welcome to Scribe</h3>
                <p style={{ fontWeight:'bold'}}>Scribe is a note taking app based off of Evernote</p>
                <h1 style={{marginTop:'100px'}}>Get Started</h1>
                <div>
                    <button onClick={() => history.push('/sign-up')}>Sign Up</button>
                    <button onClick={() => history.push('/login')}>Log In</button>
                </div>
            </div>
        </div>
    )
}

export default Home
