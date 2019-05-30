import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Login from './containers/Login';
import Profile from './containers/Profile';

class App extends Component {
  // Initialize state
  state = {}

  render() {

    return (
      <div className="App">
        <Switch>
          <Route exact path='/' render={() => (
            <div>front root page</div>
          )}/>
          <Route path='/test' render={() => (
            <div>test route one</div>
          )}/>
          <Route path='/users/me' render={() => (
            <Profile/>
          )}/>
          <Route path='/users/login' render={() => (
            <Login/>
          )}/>
          <Route render={() => (
            <div>404</div>
          )}/>
        </Switch>
      </div>
    );
  }
}

export default App;
