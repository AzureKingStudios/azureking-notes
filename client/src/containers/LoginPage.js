import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';

class LoginPage extends Component {

  state = {
    email: '',
    password: ''
  }

  handleChangeEmail = (event) => {
      this.setState({email: event.target.value});
  }
  handleChangePassword = (event) => {
      this.setState({password: event.target.value});
  }

  handleSubmit = (event) => {
      event.preventDefault();
      axios.post('/api/users/login', {
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
          alert('wrong email or password');
      });
  }

  componentDidMount() {
    if(localStorage.getItem('aks-tk')) {
      this.props.history.push(`/`);
    }
  }

  render() {
    return(
      <div>
        <Header {...this.props}/>
        <form className='login' onSubmit={this.handleSubmit}>
          <h3 className='login-title'>Login</h3>
          <input placeholder='email' className='login-input' type="text" value={this.state.email} onChange={this.handleChangeEmail} required />
          <input placeholder='password' className='login-input' type="password" value={this.state.password} onChange={this.handleChangePassword} required />
          <input className='login-btn' type="submit" value="Sign In" />
        </form>
      </div>
    )
  }
}

export default LoginPage;