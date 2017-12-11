import React from 'react'
import {Link, Route} from 'react-router-dom'
import './NavBar.css'

const NavBar = (props) => {
    return (
        <div className="container">
            <nav>
                {/* <Link to='/'>Click ME!</Link> */}
                <h3>Battle Tetris</h3>
            </nav>
        </div>
    )
}

export default NavBar
