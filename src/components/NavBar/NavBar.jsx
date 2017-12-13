import React from 'react'
import {Link} from 'react-router-dom'
import './NavBar.css'
import {icon} from '../../icon.svg'

const NavBar = (props) => {
    console.log(props.user)
    let nav = props.user ?
        <div className="container">
            <nav className="nav-container">
                <h3 src={icon} alt="My Logo" className="logo">Logo</h3>
                <h3 className="title"><Link to='/game' style={{textDecoration: 'none', color:'white'}}>Battle Tetris</Link></h3>
                <div className="dropdown">
                    <h3 className="dropbtn">Menu</h3>
                    <div className="dropdown-content">
                        <Link to='/signup'>Sign Up</Link>
                        <Link to='/' onClick={props.handleLogout}>Log Out</Link>
                        <Link to='/topscores'>High Scores</Link>
                        <Link to='/help'>Help</Link>
                    </div>
                </div>
            </nav>
        </div>
        :
        <div className="container">
            <nav className="nav-container">
                <h3 src={icon} alt="My Logo" className="logo">Logo</h3>
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
    return (
        <div className='NavBar'>
            {nav}
        </div>
    )
}

export default NavBar
