import React, { Component } from 'react';
import Heading from '../components/Heading'
import Textbox from '../components/Textbox'
import ActionButton from '../components/ActionButton'
import { Link } from 'react-router-dom'

class Pregame extends React.Component {
  handleClick = () => {
    var action = {
      "type": "START_GAME",
      "game": this.props.game,
      "sender": this.props.username
    }
    this.props.serverDispatch(action);
  }

  render() {
    return (
      <React.Fragment>
        <Heading>Spotcheck</Heading>
        <ActionButton action={this.handleClick} title="Start Game!"/>
      </React.Fragment>
    );
  }
}

export default Pregame;
