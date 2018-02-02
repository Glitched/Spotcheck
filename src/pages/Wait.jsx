import React, { Component } from 'react';
import Heading from '../components/Heading'
import Textbox from '../components/Textbox'
import ActionButton from '../components/ActionButton'
import { Link } from 'react-router-dom'

class Wait extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Heading>Spotcheck</Heading>
        <p>Please wait, <br/>{this.props.username}</p>
      </React.Fragment>
    );
  }
}

export default Wait;
