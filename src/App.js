import React, { Component } from 'react';
import './App.css';
import { Route, Router, Link } from 'react-router-dom'
import Start from './pages/Start'
import Players from './pages/Players'
import Countdown from './pages/Countdown'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Start} />
        <Route exact path="/Players" component={Players} />
        <Route exact path="/Countdown" component={Countdown} />
      </div>
    );
  }
}

export default App;
