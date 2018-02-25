import React, { Component } from 'react';
import Heading from '../components/Heading'
import Textbox from '../components/Textbox'
import ActionButton from '../components/ActionButton'
import { Link } from 'react-router-dom'
import { TransitionMotion, spring } from 'react-motion'

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
    stateDelta[id] = value.toUpperCase();
    this.setState(stateDelta);
    this.props.updateSuperState(this.state);
  }

  willLeave = (key, style) => {
  return {
    opacity: spring(0),
    translateX: style.translateX,
    translateY: spring(-300),
  }
}

  render() {
    return (
      <TransitionMotion willLeave={this.willLeave}>
        <Heading>Spotcheck</Heading>
        <Textbox id="code" type="tel" placeholder="Code" onChange={this.updateInputState} autofocus={true}/>
        <Textbox id="username" type="text" placeholder="Username" onChange={this.updateInputState} autofocus={false}/>
        <ActionButton action={this.handleClick} title="Let's Rock!"/>
      </TransitionMotion>
    );
  }
}

export default Start;
