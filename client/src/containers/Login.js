import React, { Component } from 'react';

class Login extends Component {

  state = {
    value: ''
  }

  handleChange = (event) => {
      this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
      event.preventDefault();
      this.props.history.push(`/user/me`);
  }

  render() {
    return(
      <div>
        <div>Login page</div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.value} onChange={this.handleChange} required />
            <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default Login;