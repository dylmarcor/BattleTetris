import React from 'react'

const Controls = (props) => {
    const {buttonsBackgroundColor, buttonsColor, blockBorderWidth,
    blockSize, blockOutline, offset}
    = props.settings
    const fontSize = blockSize + blockBorderWidth + blockOutline + offset
    const button = {margin:'5px 0px', border:'none', width:'25%',
                    backgroundColor:buttonsBackgroundColor, color:buttonsColor,
                    borderRadius:'4px',padding:'5px 10px',fontSize:fontSize,
                    cursor:'pointer'
                }
    
    return (
        <div style={{display:'flex'},{justifyContent:'space-between'},{width:props.width}}>
            <button style={button} onKeyDown={props.moveDown}>⇣</button>
            <button style={button} onKeyDown={props.rotate}>⤾</button>
            <button style={button} onKeyDown={props.moveRight}>⇢</button>
            <button style={button} onKeyDown={props.moveUp}>⇡</button>
        </div>
    )
}

export default Controls