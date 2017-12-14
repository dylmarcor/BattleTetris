import React from 'react'
import {Link, Route} from 'react-router-dom'
import './Help.css'

const Help = (props) => {
    return (
        <div>
            <div className="help">
                <p>How to play</p>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <ol className="rules">
                        <li>Use the arrow keys to guide the pieces</li>&nbsp;&nbsp;
                        <li>Press spacebar to send the piece to bottom instantly</li>&nbsp;&nbsp;
                        <li>When you complete a line it is eliminated and points are given</li>
                    </ol>
            </div>
        </div>
    )
}

export default Help