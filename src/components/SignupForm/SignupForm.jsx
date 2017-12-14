import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import userService from '../../utils/userService';
import './SignupForm.css'

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConf: ''
    };
  }

  handleChange = (field, e) => {
    this.props.updateMessage('');
    this.setState({
      // Using ES2015 Computed Property Names
      [field]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    userService.signup(this.state)
      // successfully signed up - show GamePage
      .then(() => {
        this.props.handleSignup();
        this.props.history.push('/')
      })
      // invalid user data
      .catch(err => this.props.updateMessage(err.message));
  }

  isFormInvalid() {
    return !(this.state.name && this.state.email && this.state.password === this.state.passwordConf);
  }

  render() {
    return (
      <div className="main">
        <h3 className="container-signup">Sign Up</h3>&nbsp;&nbsp;&nbsp;&nbsp;
        <form className="form-signup" onSubmit={this.handleSubmit} >
          <div className="form-group">
            <div className="name">
              <input type="text" className="form-control" placeholder="Name" value={this.state.name} onChange={(e) => this.handleChange('name', e)} />
            </div>
          </div>
          <div className="form-group">
            <div className="email">
              <input type="email" className="form-control" placeholder="Email" value={this.state.email} onChange={(e) => this.handleChange('email', e)} />
            </div>
          </div>
          <div className="form-group">
            <div className="password">
              <input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={(e) => this.handleChange('password', e)} />
            </div>
          </div>
          <div className="form-group">
            <div className="password-confirmation">
              <input type="password" className="form-control" placeholder="Confirm Password" value={this.state.passwordConf} onChange={(e) => this.handleChange('passwordConf', e)} />
            </div>
          </div>
          <div className="login">
            <div className="confirm-button">
              <button className="btn btn-default" disabled={this.isFormInvalid()}>Sign Up</button>&nbsp;&nbsp;
              <Link to='/' className="signup-button">Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
};

export default SignupForm;