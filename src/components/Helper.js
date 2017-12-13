import _ from 'lodash'

const transpose = matrix => _.unzip(matrix)
const reverse = matrix => _.cloneDeep(matrix).reverse()

let Rotation = 'LEFT' | 'RIGHT'

// returns a new matrix and the original matrix is not mutated 
export const rotateMatrix = (matrix, rotation) => {
  let transposedMatrix = transpose(matrix)
  return rotation === 'LEFT' ? reverse(transposedMatrix) : transposedMatrix.map(r => reverse(r))
}

// creates an Array of Arrays (rows * columns) filled with value or with 0
export const createMatrix = (rows, columns ,value)=> {
  let matrix = []
  for (let row = 0; row < rows; row++){
    matrix[row] = []
    for (let column = 0; column < columns; column++){
      matrix[row][column] = value
    }
  }
  return matrix
}
