import React from 'react'
import {Link} from 'react-router-dom'
import './WelcomePage.css'

const WelcomePage = (props) => {
    let user = props.user ? 
        <div className="welcome-container">
            <h1>Welcome to TETRIS!</h1>&nbsp;&nbsp;&nbsp;
            <div>
                <Link to='/game' className="login-link">Game On</Link>
            </div>
        </div>
        :
        <div className="welcome-container">
            <h1>Welcome to TETRIS!</h1>
            <p>Please sign in to play.</p>&nbsp;&nbsp;&nbsp;
            <Link to='/login' className="login-link">Login</Link>
        </div>
    return (
        <div>
            {user}
        </div>
    )

}

export default WelcomePage