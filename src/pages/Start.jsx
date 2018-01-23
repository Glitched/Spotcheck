import React, { Component } from 'react';
import Heading from '../components/Heading'
import Textbox from '../components/Textbox'
import ActionButton from '../components/ActionButton'
import { Link } from 'react-router-dom'


class Start extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Heading>Spotcheck</Heading>
        <Textbox placeholder="Code" autofocus={true}/>
        <Textbox placeholder="Username" autofocus={false}/>
        <Link to="/Players">
          <ActionButton title="Let's Rock!"/>
        </Link>
      </React.Fragment>
    );
  }
}

export default Start;
