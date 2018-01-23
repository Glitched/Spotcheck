import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Heading from './components/Heading'
import Textbox from './components/Textbox'
import ActionButton from './components/ActionButton'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Heading>Spotcheck</Heading>
        <Textbox placeholder="Code" autofocus={true}/>
        <Textbox placeholder="Username" autofocus={false}/>
        <ActionButton title="Let's Rock!"/>
      </div>
    );
  }
}

export default App;
