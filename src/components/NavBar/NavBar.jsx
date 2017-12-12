import React from 'react'
import {Link} from 'react-router-dom'
import './NavBar.css'

const NavBar = (props) => {
    return (
        <div className="container">
            <nav className="nav-container">
                <h3 className="logo">Logo</h3>
                <h3 className="title"><Link to='/' style={{textDecoration: 'none', color:'white'}}>Battle Tetris</Link></h3>
                <div className="dropdown">
                    <h3 className="dropbtn">Menu</h3>
                    <div className="dropdown-content">
                        <Link to='/signup'>Sign Up</Link>
                        <Link to='/login'>Log In</Link>
                        <Link to='/topscores'>High Scores</Link>
                        <Link to='/help'>Help</Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar
