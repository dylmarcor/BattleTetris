import React from 'react'
import {Link} from 'react-router-dom'
import './NavBar.css'

const NavBar = (props) => {
    return (
        <div>
            <nav>
                <Link to='/' className='btn btn-left'>Home</Link>
                <h3>Battle Tetris</h3>
            </nav>
        </div>
    )
}

export default NavBar
