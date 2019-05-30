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
          <Route exact path='/' component={NotesPage}/>
          <Route path='/users/me' component={ProfilePage}/>
          <Route path='/users/login' component={LoginPage}/>
          <Route path='/test' render={() => (
            <div>test route one</div>
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
