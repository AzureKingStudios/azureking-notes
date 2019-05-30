import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {

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
      // this.props.history.push(`/user/me`);
      console.log(this.state.email + "/" + this.state.password);
      axios.post('/api/users/login', {
        email: this.state.email,
        password: this.state.password
      }).then((res) => {
          console.log(res.data.token);
          localStorage.setItem('aks-tk', res.data.token);
      }).catch((e) => {
          console.log(e);
          alert('wrong email or password');
      });
  }

  render() {
    return(
      <div>
        <div>Login page</div>
        <form onSubmit={this.handleSubmit}>
          email:
          <input type="text" value={this.state.email} onChange={this.handleChangeEmail} required />
          password:
          <input type="text" value={this.state.password} onChange={this.handleChangePassword} required />
            <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default Login;