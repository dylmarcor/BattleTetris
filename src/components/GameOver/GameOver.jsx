import React from 'react'
import {Link} from 'react-router-dom'
import './GameOver.css'

const GameOver = (props) => {
    return (
        <div className="gameover-container">
            <div className="gameover-title">Game Over!</div>
            <div className="home">
                <Link to='/'>Go Home</Link>
            </div>
        </div>
        
    )
}

export default GameOver