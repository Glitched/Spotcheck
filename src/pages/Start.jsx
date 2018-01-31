import React, { Component } from 'react';
import Heading from '../components/Heading'
import Textbox from '../components/Textbox'
import ActionButton from '../components/ActionButton'
import { Link } from 'react-router-dom'

class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "code": "",
      "username": ""
    }
  }

  handleClick = () => {
    var action = {
      "type": "REGISTER_USER",
      "game": this.state.code,
      "sender": this.state.username
    }
    this.props.serverDispatch(action);
  }

  updateInputState = (id, value) => {
    var stateDelta = {}
    stateDelta[id] = value;
    this.setState(stateDelta);
    this.props.updateSuperState(this.state);
  }


  render() {
    return (
      <React.Fragment>
        <Heading>Spotcheck</Heading>
        <Textbox id="code" type="tel" placeholder="Code" onChange={this.updateInputState} autofocus={true}/>
        <Textbox id="username" type="text" placeholder="Username" onChange={this.updateInputState} autofocus={false}/>
        <ActionButton action={this.handleClick} title="Let's Rock!"/>
      </React.Fragment>
    );
  }
}

export default Start;
