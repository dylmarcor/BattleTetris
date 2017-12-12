import React from 'react'
import Settings from '../Settings'
import Block from '../Block/Block'

const Board = (props) => {
  
  const style ={
    width: props.settings.columns * (props.settings.blockSize+(2*props.settings.blockBorderWidth)+ 2*props.settings.offset ),
    height: props.settings.rows * (props.settings.blockSize+(2*props.settings.blockBorderWidth)+ 2*props.settings.offset),
    backgroundColor:props.settings.boardColor,
    paddingRight:props.settings.offset,
    paddingTop:props.settings.offset,
    position:'relative'
    
  }

  return (
    <div style={style}>
      {props.children}
      {props.matrix.map((row, rowIndex)=>row.map((column, columnIndex)=>{
        const content = props.matrix[rowIndex][columnIndex]
          return <Block
                      key={"key" + columnIndex + rowIndex}
                      content={content}
                      settings={props.settings}
                      backgroundColor={content !== 0 
                        ? props.settings.tetrisblockColors[content - 1]
                        : props.settings.boardColor
                      }
                  />
        }))
    }
    </div>
  )
}

export default Board