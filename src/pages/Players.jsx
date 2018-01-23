import React, { Component } from 'react';
import Heading from '../components/Heading'
import PlayerList from '../components/PlayerList'
import ActionButton from '../components/ActionButton'
import { Link } from 'react-router-dom'


class Players extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Heading>Players</Heading>
        <PlayerList />
        <Link to="/Countdown">
          <ActionButton title="Start Game!"/>
        </Link>
      </React.Fragment>
    );
  }
}

export default Players;
