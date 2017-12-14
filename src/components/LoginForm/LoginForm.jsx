import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import userService from '../../utils/userService'
import './LoginForm.css'

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pw: ''
    }
  }

  handleChange = (field, e) => {
    // TODO: implement in an elegant way
    this.setState({
      [field]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    userService.login(this.state)
    .then(() => {
      this.props.handleLogin();
      this.props.history.push('/game');
    })
    .catch(err => alert('Invalid credentials'));
  }

  render() {
    return (
      <div className="login-container">
        <h3 className="">Log In</h3>
        <form className="" onSubmit={this.handleSubmit} >
          <div className="">
            <div className="">
              <input type="email" className="form-control" placeholder="Email" value={this.state.email} onChange={(e) => this.handleChange('email', e)} />
            </div>
          </div>
          <div className="">
            <div className="">
              <input type="password" className="form-control" placeholder="Password" value={this.state.pw} onChange={(e) => this.handleChange('pw', e)} />
            </div>
          </div>
          <div className="">
            <div className="login">
              <button className="btn btn-default">Log In</button>&nbsp;&nbsp;&nbsp;
              <Link to='/' className="login-cancel">Cancel</Link>
            </div>
          </div>
        </form>
        <div className="nouser">
          <p>Not a user??&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link to='/signup' className="nouser-link">Sign up</Link></p>
        </div>
      </div>
    );
  }
};

export default LoginForm