import React from 'react';
import styled, { css } from 'react-emotion'

const List = styled('ul')`
  background: rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.4);
  border-radius: 4px;
  padding: 8px;
  color: white;
  font-family: Lato;
  font-weight: 400;
  font-size: 18px;
  transition: all 0.2s ease;
  margin: 8px auto;
  display: block;
  text-align: left;
  width: 280px;
  list-style-type: none;
  li {
    padding: 4px;
  }
`

class PlayerList extends React.Component {
  render() {
    return (
      <List>
        <li>Slamajama</li>
        <li>Clubmine</li>
        <li>Samwise Gamgee</li>
        <li>Daft Hunk</li>
      </List>
    );
  }
}

export default PlayerList;
