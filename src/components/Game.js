import React, {Component} from 'react'
import TetrisBlock from './TetrisBlock/TetrisBlock'
import Board from './Board/Board'
import Block from './Block/Block'
import Score from './Score'
import Settings from './Settings'
import {createMatrix, rotateMatrix} from './Helper'
import TetrisBlockModel from '../models/TetrisBlockModel'

class Tetris extends Component {
  constructor(props) {
    super(props)
    this.settings = Object.assign({}, Settings, props.settings)
    this.handleKeyboard()
    const tetrisblock = new TetrisBlockModel(3, 0, Math.random() * 7 | 0)
    this.state = {
      boardMatrix: this.initializeBoard(),
      tetrisblockArray: this.initializeTetrisBlockArray(),
      tetrisblock: tetrisblock,
      tetrisblockMatrix: tetrisblock.matrix,
      intervalId: 0,
      intervalTime: this.settings.intervalTimeInMiliSeconds,
      points: 0,
      completedLines: 0,
      level: 1,
      
      rotationAngle: 0,
      animation: this.settings.animation,
    }

  }

  // Create Board
  initializeBoard = () => {
    return createMatrix(this.settings.rows, this.settings.columns)
  }

  // Create random array of game pieces 
  initializeTetrisBlockArray = () => {
    const numberOfTetrisBlocks = TetrisBlockModel.getNumberOfTetrisBlocks()
    const tetrisblockArray = new Array(numberOfTetrisBlocks)
      .fill(null)
      .map(spot => Math.random() * numberOfTetrisBlocks | 0)
    return tetrisblockArray
  }

  getStartPoint = (matrix) => {
    let finalRow = 0, finalColumn = 0
    for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
      const row = matrix[rowIndex]
      if (row.some(cell => cell !== 0)) {
        const columnIndex = (this.state.boardMatrix[0].length / 2 - matrix.length / 2) | 0
        finalRow = 0 - rowIndex
        finalColumn = columnIndex
        return { row: finalRow, column: finalColumn }
      }
    }
    return { row: 0, column: 0 }
  }

  getNewTetrisBlock = () => {
    const {tetrisblockArray} = this.state
    const tetrisblockIndex = tetrisblockArray.shift()
    const startPoint = this.getStartPoint(TetrisBlockModel.getTetrisBlockArray()[tetrisblockIndex])
    const newTetrisBlock = new TetrisBlockModel(startPoint.column, startPoint.row, tetrisblockIndex)
    const tetrisblockMatrix = newTetrisBlock.matrix
    tetrisblockArray.push(Math.random() * TetrisBlockModel.getNumberOfTetrisBlocks() | 0)
    this.setState({ tetrisblockArray, tetrisblockMatrix, rotationAngle: 0 })

    return newTetrisBlock
  }
  getFreeBottomRow = () => {
    const tetrisblock = Object.assign(new TetrisBlockModel(), this.state.tetrisblock)
    const initialRow = tetrisblock.row
    tetrisblock.row++
    while (!tetrisblock.collidesWith(this.state.boardMatrix)) {
      tetrisblock.row++
    }
    const result = tetrisblock.row - initialRow - 1
    return result
  }

  moveTetrisBlock = (direction) => {
    let tetrisblock = Object.assign(new TetrisBlockModel(), this.state.tetrisblock)
    tetrisblock.collidesWith.bind(tetrisblock)
    let rowAdvance = 0, columnAdvance = 0
    let mustUpdate = true

    const {boardMatrix} = this.state
    switch (direction) {
      case 'DOWN':
        rowAdvance++
        break
      case 'LEFT':
        columnAdvance--
        break
      case 'RIGHT':
        columnAdvance++
        break
      case 'BOTTOM':
        rowAdvance += this.getFreeBottomRow()
        break
      default:
        console.log('Error. No such direction')
    }
    tetrisblock.row += rowAdvance
    tetrisblock.column += columnAdvance
    //If collided, move back
    if (tetrisblock.collidesWith(boardMatrix)) {

      tetrisblock.row -= rowAdvance
      tetrisblock.column -= columnAdvance
      mustUpdate = false
    }
    //restores animation
    if (mustUpdate) {
      this.setState({ tetrisblock, animation: true })
    }

  }

  rotateTetrisBlock = () => {
    let tetrisblock = Object.assign(new TetrisBlockModel(), this.state.tetrisblock)
    let rotationAngle = this.state.rotationAngle
    tetrisblock.matrix = rotateMatrix(tetrisblock.matrix, 'RIGHT')
    rotationAngle += 90
    if (tetrisblock.collidesWith(this.state.boardMatrix)) {
      if (tetrisblock.row < 0) {
        tetrisblock.row = 0
      } else if (tetrisblock.column < 0) {
        tetrisblock.column = 0
      } else if (tetrisblock.column + tetrisblock.matrix.length > this.settings.columns) {
        const tempColum = tetrisblock.column
        tetrisblock.column = this.settings.columns - tetrisblock.matrix.length
        if (tetrisblock.collidesWith(this.state.boardMatrix)) {
          tetrisblock.column = tempColum
          tetrisblock.matrix = rotateMatrix(tetrisblock.matrix, 'LEFT')
          rotationAngle -= 90
        }
      } else {
        tetrisblock.matrix = rotateMatrix(tetrisblock.matrix, 'LEFT')
        rotationAngle -= 90
      }
    }
    //restores animation
    this.setState({tetrisblock, rotationAngle, animation: true})
  }
  handleClick = (event, index) => {
    const newBoard = this.state.boardMatrix.slice()
    const content = newBoard[index.row][index.column] !== 0
      ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      : [0, 0, 0, 0, 0, 2, 2, 2, 0, 0]
    newBoard[index.row] = content
    this.setState(
      {
        boardMatrix: newBoard
      })
  }

  handleKeyboard = () => {
    window.addEventListener('keydown', e => {
      const key = Settings.keys
      //if e.keyCode is not one of the keys that operates Tetris Blocks, returns
      if (!Object.values(key).includes(e.keyCode)) return

      switch (e.keyCode) {
        case key.left:
          this.moveTetrisBlock('LEFT')
          break
        case key.right:
          this.moveTetrisBlock('RIGHT')
          break
        case key.down:
          this.moveTetrisBlock('DOWN')
          break
        case key.rotate:
          this.rotateTetrisBlock('RIGHT')
          break
        case key.pause:
          this.setState((prevState) => ({ paused: prevState.paused ? false : true }))
          return
        case key.bottom:
          this.moveTetrisBlock('BOTTOM')
          break
        default:
          console.log('Error. No such keyCode')
      }
    })
  }

  completedLines = () => {
    const linesArray = []
    this.state.boardMatrix.forEach((row, rowIndex) =>
      (row.some(column =>
        column === 0)
        ? null // Some elements are 0, so it's not empty
        : linesArray.push(rowIndex) // No element is 0, so it's full
      ))
    return linesArray
  }

  clearCompletedLines = (completedLines) => {
    const newBoard = this.state.boardMatrix.slice()
    for (let completedLine of completedLines) {
      newBoard.splice(completedLine, 1)
      newBoard.unshift(new Array(this.settings.columns).fill(0))
    }
    this.setState({
      boardMatrix: newBoard
    })
  }

  gameOver = () => {
    const boardMatrix = this.initializeBoard()
    this.setState({ boardMatrix })
  }

  insertTetrisBlockInBoard = () => {
    const boardMatrix = this.state.boardMatrix.slice()
    const {tetrisblock} = this.state
    tetrisblock.matrix.map((row, rowIndex) =>
      row.map((column, columnIndex) => {
        if (tetrisblock.matrix[rowIndex][columnIndex] !== 0) {
          try {
            boardMatrix[rowIndex + tetrisblock.row][columnIndex + tetrisblock.column] = tetrisblock.matrix[rowIndex][columnIndex]
          } catch (error) {
            alert(error)
          }
        }
      }
      ))
    this.setState({ boardMatrix, animation: false })
  }

  updatePoints = (completedLines) => {
    let {points} = this.state
    let extraPoints = 0
    for (let i = 0; i < completedLines; i++) {
      extraPoints += (i * 200)
    }
    points += extraPoints + this.settings.pointsPerLine * completedLines
    this.setState((prevState) => ({ points, completedLines: prevState.completedLines + completedLines }))
  }

  renderBoard = () => {
    return (
      this.state.boardMatrix.map((row, rowIndex) =>
        row.map((column, columnIndex) => {
          const content = this.state.boardMatrix[rowIndex][columnIndex]
          return (
            <Block
              backgroundColor={content !== 0 ?
                this.settings.tetrisblockColors[content - 1] :
                this.settings.boardColor
              }
              settings={this.settings}
              key={"key" + columnIndex + rowIndex}
              index={{ row: rowIndex, column: columnIndex }}
              content={content}
              id={"id" + columnIndex + rowIndex}
              onClick={this.handleClick}
              />)
        })
      )
    )
  }

  componentWillMount = () => {
    this.mainLoop()
  }

  changeInterval = () => {
    const intervalDecrement = this.state.intervalTime <= 500
      ? 0
      : 100
    this.setState((prev) => ({ intervalTime: prev.intervalTime - intervalDecrement }))
  }

  mainLoop = () => {
    clearInterval(this.state.intervalId)
    let tetrisblock = Object.assign(new TetrisBlockModel(), this.state.tetrisblock)
    if (!this.state.paused) {
      tetrisblock.row++
    }
    if (tetrisblock.collidesWith(this.state.boardMatrix)) {
      tetrisblock = this.getNewTetrisBlock()
      this.insertTetrisBlockInBoard()
      const completedLinesArray = this.completedLines()
      if (completedLinesArray.length > 0) {
        this.clearCompletedLines(completedLinesArray)
        this.updatePoints(completedLinesArray.length)
      } else {
        if (this.state.boardMatrix[1].some(x => x !== 0)) {
          this.gameOver()
        }
      }
      this.changeInterval()
    }

    const intervalId = setTimeout(() => this.mainLoop(), this.state.intervalTime)
    this.setState({ tetrisblock, intervalId })
  }

  renderScore = () => {
    return (
      <div style={{ color: 'black' }}>
        <div>{this.state.intervalTime}</div>
        <div>POINTS: {this.state.points}</div>
        <div>LINES: {this.state.completedLines}</div>
        <div>X: {this.state.tetrisblock.column}, Y: {this.state.tetrisblock.row}</div>
      </div>
    )
  }

  render() {
    const style = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 0,
      height: '100vh',
    }

    return (
      <div style={style}>
        <div>
          <Board settings={this.settings} matrix={this.state.boardMatrix}>
            <TetrisBlock
              {...this.state.tetrisblock}
              matrix={this.state.tetrisblockMatrix}
              index={this.state.tetrisblockArray[0]}
              settings={this.settings}
              angle={this.state.rotationAngle}
              animation={this.settings.animation}
              />
            <TetrisBlock
              {...this.state.tetrisblock}
              matrix={TetrisBlockModel.getTetrisBlockArray()[this.state.tetrisblockArray[0]]}
              row={10}
              column={11}
              index={this.state.tetrisblockArray[0]}
              settings={this.settings}
              angle={0}
            />
            <Score
              row={5}
              column={11}
              settings={this.settings}
              points={this.state.points}
              level = {this.state.level}
              lines = {this.state.completedLines}
            />
            </Board>
          </div>
      </div>
    )
  }
}

export default Tetris