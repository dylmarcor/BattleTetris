import React, {Component} from 'react';
// import {Switch, Route, Router} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Tetris from './components/Game'
import NavBar from './components/NavBar/NavBar'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="App">
        <NavBar />
            <Tetris settings ={{ blockSize: 4, 
              offset: 2, 
              rows: 20, 
              columns: 10, 
              blockBorderWidth: 5,
              boardColor:'black',
              blockBorderRadius:'30%',
              intervalTimeInMiliSeconds: 1000,
              blockOutline:0,
              animation:false,
              boardBorderColor:'transparent'
            }} />
      </div>
    );
  }
}

export default App;
