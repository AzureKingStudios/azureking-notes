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
        <div>Login page</div>
        <form onSubmit={this.handleSubmit}>
          email:
          <input type="text" value={this.state.email} onChange={this.handleChangeEmail} required />
          password:
          <input type="password" value={this.state.password} onChange={this.handleChangePassword} required />
            <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default LoginPage;