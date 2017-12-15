return (
    <div className="App">
    <NavBar user={this.state.user} handleLogout={this.handleLogout}/>
      <Switch>
        <Route exact path='/' render={() =>
          <WelcomePage user={this.state.user}/>}
        />
        <Route exact path='/game' render={(props) => 
          userService.getUser() ?
          <Tetris 
            user={this.state.user}
            handleLogout={this.handleLogout}
            settings={{ blockSize: 4, 
            offset: 2, 
            rows: 20, 
            columns: 10, 
            blockBorderWidth: 5,
            boardColor:'black',
            intervalTimeInMiliSeconds: 1000,
            blockOutline:1,
            animation:false,
            boardBorderColor:'transparent'
          }} /> : <Redirect to='/login' />
        }/>
        <Route exact path='/help' render={() =>
          <Help />
        }/>
        <Route exact path='/login' render={(props) =>
          <LoginPage
          {...props}
          handleLogin={this.handleLogin}
          user={this.state.user}
          />  
        }/>
        <Route exact path='/signup' render={(props) => 
            <SignupPage 
              {...props}
              handleSignup={this.handleSignup}
              user={this.state.user}
            />
          }/>
        <Route exact path='/topscores' render={(props) => (
            userService.getUser() ? 
              <TopScoresPage user={this.state.user} points={this.state.points}/> : <Redirect to='/login' />
          )} />
        <Route exact path='/gameover' render={(props) => (
          <GameOver />
        )} />
      </Switch>
  </div>

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
          return this.gameOver()
        }
      }
      this.changeInterval()
    }
    const intervalId = setTimeout(() => this.mainLoop(), this.state.intervalTime)
    this.setState({tetrisblock, intervalId})
  }

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