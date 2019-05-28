import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import axios from 'axios';
import './App.css';

class App extends Component {
  // Initialize state
  state = {}

  componentDidMount() {
    axios.get('/api/example').then((res) => {
        console.log(res);
    }).catch((e) => {
        console.log(e);
    })
  }

  render() {

    return (
      <div className="App">
        <Switch>
          <Route exact path='/' render={() => (
            <div>Root page route</div>
          )}/>
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
