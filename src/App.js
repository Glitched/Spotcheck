import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Heading from './components/Heading'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Heading>Spotcheck</Heading>
      </div>
    );
  }
}

export default App;
