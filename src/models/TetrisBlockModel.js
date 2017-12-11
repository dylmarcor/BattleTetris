import {rotateMatrix} from '../components/Helper'
import {Settings} from '../components/Settings'

type Direction = 'LEFT' | 'RIGHT' | 'DOWN' | 'UP'
type Rotation = 'LEFT' | 'RIGHT'

class TetrisBlockModel {
  constructor(column, row, index) {
    this.matrix = TetrisBlockModel.getTetrisBlockArray()[index]
    this.row = row
    this.column = column
    this.name = name
  }
  static getTetrisBlockArray() {
    return [
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 0],
        [0, 2, 2],
        [2, 2, 0],
      ],
      [
        [0, 0, 0],
        [3, 3, 0],
        [0, 3, 3],
      ],
      [
        [4, 4],
        [4, 4],
      ],
      [
        [0, 0, 0],
        [5, 5, 5],
        [0, 5, 0],
      ],
      [
        [0, 0, 0],
        [6, 0, 0],
        [6, 6, 6],
      ],
      [
        [0, 0, 0],
        [0, 0, 7],
        [7, 7, 7],
      ],

    ]
  }
  static getNumberOfTetrisBlocks(): number {
    //there are 6 Tetris Blocks

    return this.getTetrisBlockArray().length
  }
  
  move(direction:Direction) {
    switch (direction) {
      case 'DOWN':
        this.row = this.row + 1
        break
    }
  }
  rotate = (rotation:Rotation) => {
    const newMatrix = rotateMatrix(this.matrix, rotation)
    return newMatrix
  }
    collidesWith (board:[][]): boolean  {
    for (let row = 0; row < this.matrix.length; row++) {
        for (let column = 0; column < this.matrix.length; column++) {
        if (this.matrix[row][column] !== 0) {
            //board boundaries
            if (row + this.row >= settings.rows
            || row + this.row <= 0
            || column + this.column >= settings.columns
            || column + this.column < 0) {
                return true
            }
            //board is occuppied
            if (board[row + this.row][column + this.column] !== 0) {
            return true
            }
        }
        }
    }
    return false
    }
    }

export default TetrisBlockModel