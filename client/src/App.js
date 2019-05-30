import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import LoginPage from './containers/LoginPage';
import ProfilePage from './containers/ProfilePage';
import NotesPage from './containers/NotesPage';

class App extends Component {
  // Initialize state
  state = {}

  render() {

    return (
      <div className="App">
        <Switch>
          <Route exact path='/' render={(props) => (
            <NotesPage {...props}/>
          )}/>
          <Route path='/test' render={() => (
            <div>test route one</div>
          )}/>
          <Route path='/users/me' render={() => (
            <ProfilePage/>
          )}/>
          <Route path='/users/login' render={() => (
            <LoginPage/>
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
