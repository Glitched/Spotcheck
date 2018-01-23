import React, { Component } from 'react';
import Heading from '../components/Heading'
import Subheading from '../components/Subheading'
import Textbox from '../components/Textbox'
import ActionButton from '../components/ActionButton'
import styled, { css } from 'react-emotion'


const Number = styled('p')`
  font-family: Lato-Semibold;
  font-size: 144px;
  color: white;
  text-shadow: 4px 4px 4px #064140;
  margin: 60px 0;
`

class Countdown extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Heading>Round 1</Heading>
        <Subheading>Song 1</Subheading>
        <Number>3</Number>
      </React.Fragment>
    );
  }
}

export default Countdown;
