import React, {Component} from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Tetris from './components/Game'
import NavBar from './components/NavBar/NavBar'
import Help from './components/Help/Help'
import userService from './utils/userService'
import LoginPage from './components/LoginPage/LoginPage'

class App extends Component {
  constructor(props) {
    super(props)
  }



  /* Life Cycle Methods */

  componentDidMount() {
    let user = userService.getUser();
    this.setState({user});
  }

  render() {
    return (
      <div className="App">
      <NavBar />
      <Router>
        <Switch>
          <Route exact path='/' render={() => 
            <Tetris settings={{ blockSize: 4, 
              offset: 2, 
              rows: 20, 
              columns: 10, 
              blockBorderWidth: 5,
              boardColor:'black',
              intervalTimeInMiliSeconds: 1000,
              blockOutline:1,
              animation:false,
              boardBorderColor:'transparent'
            }} />
          }/>
          <Route exact path='/help' render={() =>
            <Help />
          }/>
          <Route exact path='/login' render={() =>
            <LoginPage />  
          }/>
        </Switch>
      </Router>
    </div>
    );
  }
}

export default App;
