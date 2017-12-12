import React, {Component} from 'react';
import {Switch, Redirect, Route, BrowserRouter as Router} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Tetris from './components/Game'
import NavBar from './components/NavBar/NavBar'
import Help from './components/Help/Help'
import userService from './utils/userService'
import LoginPage from './components/LoginPage/LoginPage'
import TopScoresPage from './components/TopScoresPage/TopScoresPage'
import SignupPage from './components/SignupPage/SignupPage'

class App extends Component {
  constructor(props) {
    super(props)
  }

  /* User Methods */

  handleLogin = () => {
    this.setState({user: userService.getUser()});
  }

  handleLogout = () => {
    userService.logout();
    this.setState({user: null});
  }

  handleSignup = () => {
    this.setState({user: userService.getUser()});
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
        <Switch>
          <Route exact path='/' render={() => 
            <Tetris 
              // user={this.state.user}
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
            }} />
          }/>
          <Route exact path='/help' render={() =>
            <Help />
          }/>
          <Route exact path='/login' render={() =>
            <LoginPage />  
          }/>
          <Route exact path='/signup' render={(props) => 
              <SignupPage 
                {...props}
                handleSignup={this.handleSignup}
              />
            }/>
          <Route exact path='/topscores' render={() => (
              userService.getUser() ? 
                <TopScoresPage />
                :
                <Redirect to='/login' />
            )} />
        </Switch>
    </div>
    );
  }
}

export default App;
