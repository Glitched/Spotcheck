import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Heading from './components/Heading'
import Textbox from './components/Textbox'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Heading>Spotcheck</Heading>
        <Textbox placeholder="Code"/>
        <Textbox placeholder="Username"/>
      </div>
    );
  }
}

export default App;
