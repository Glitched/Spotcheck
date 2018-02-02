import React, { Component } from 'react';
import Heading from '../components/Heading'
import Textbox from '../components/Textbox'
import ActionButton from '../components/ActionButton'
import { Link } from 'react-router-dom'

class Guess extends React.Component {
  handleClick = () => {
    var action = {
      "type": "SUBMIT_GUESS",
      "game": parseInt(this.props.game),
      "sender": this.props.username,
      "content": this.state.guess
    }
    this.props.serverDispatch(action);
  }

  updateInputState = (id, value) => {
    this.setState({guess: value});
  }

  render() {
    return (
      <React.Fragment>
        <Heading>Spotcheck</Heading>
        <Textbox id="guess" type="text" placeholder="Song Title" onChange={this.updateInputState} autofocus={true}/>
        <ActionButton action={this.handleClick} title="Submit!"/>
        {this.props.appScreen && this.props.appScreen.content && (
          <p>{this.props.appScreen.content}</p>
        )}
      </React.Fragment>
    );
  }
}

export default Guess;
