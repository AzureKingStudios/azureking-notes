import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';

class LoginPage extends Component {

  state = {
    email: '',
    password: '',
    confirmPassword: '',
    isLogin: true
  }

  handleChangeEmail = (event) => {
      this.setState({email: event.target.value});
  }

  handleChangePassword = (event) => {
      this.setState({password: event.target.value});
  }

  handleChangeConfirmPassword = (event) => {
      this.setState({confirmPassword: event.target.value});
  }

  loginToggle = () => {
      this.setState((prevState) => ({
        isLogin: !prevState.isLogin
      }));
  }

  handleSubmit = (event) => {
      event.preventDefault();

      const passwordMatch = this.state.password === this.state.confirmPassword; 

      if(!this.state.isLogin && !passwordMatch) {
        alert('passwords don\'t match');
        return;
      }

      const apiPath = this.state.isLogin ? '/api/users/login' : '/api/users/signup';
      axios.post(apiPath, {
        email: this.state.email,
        password: this.state.password
      }).then((res) => {
          localStorage.setItem('aks-tk', res.data.token);
          this.setState({
            email: '',
            password: ''
          });
          this.props.history.push(`/`);
      }).catch((e) => {
          console.log(e);
          if(this.state.isLogin) {
            alert('wrong email or password');
          } else {
            alert('email is already registered');
          }
      });
  }

  componentDidMount() {
    if(localStorage.getItem('aks-tk')) {
      this.props.history.push(`/`);
    }
  }

  render() {
    const loginTitle = this.state.isLogin ? 'Login' : 'Register';
    const loginSwitcher = this.state.isLogin ? 'Sign up for account' : 'Login in to existing account';
    const loginButton = this.state.isLogin ? 'Sign In' : 'Sign Up';
    return(
      <div>
        <Header {...this.props}/>
        <form className='login' onSubmit={this.handleSubmit}>
          <h3 className='login-title'>{loginTitle}</h3>
          <input placeholder='email' className='login-input' type="text" value={this.state.email} onChange={this.handleChangeEmail} required />
          <input placeholder='password' className='login-input' type="password" value={this.state.password} onChange={this.handleChangePassword} required />
          {!this.state.isLogin && 
            <input placeholder='confirm password' className='login-input' type="password" value={this.state.confirmPassword} onChange={this.handleChangeConfirmPassword} required />
          }
          <input className='login-btn' type="submit" value={loginButton} />
          <p onClick={this.loginToggle} className='login-signup'>{loginSwitcher}</p>
        </form>
      </div>
    )
  }
}

export default LoginPage;