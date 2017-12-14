import React, {Component} from 'react';
import {Switch, Redirect, Route, BrowserRouter as Router} from 'react-router-dom';
import icon from './icon.svg';
import './App.css';
import Tetris from './components/Game'
import NavBar from './components/NavBar/NavBar'
import Help from './components/Help/Help'
import userService from './utils/userService'
import LoginPage from './components/LoginPage/LoginPage'
import TopScoresPage from './components/TopScoresPage/TopScoresPage'
import SignupPage from './components/SignupPage/SignupPage'
import WelcomePage from './components/WelcomePage/WelcomePage'
import GameOver from './components/GameOver/GameOver'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
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
    );
  }
}

export default App;
