import React from 'react';
import styled, { css } from 'react-emotion'

const Btn = styled('button')`
  background-image: linear-gradient(-90deg, #49D6A7 3%, #3CCDCC 99%);
  box-shadow: 2px 2px 16px 0 rgba(67,210,186,0.35);
  border-radius: 8px;
  border: 0;
  outline: none;
  font-family: Lato-Bold;
  font-size: 20px;
  color: #FFFFFF;
  letter-spacing: 0.94px;
  display: inline-block;
  text-align: center;
  padding: 16px 32px;
  margin-top: 32px;
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.02) translateY(-2px);
    box-shadow: 6px 6px 16px 0 rgba(67,210,186,0.35);
  }
`

class ActionButton extends React.Component {
  render() {
    return (
      <Btn onClick={this.props.action}>{this.props.title}</Btn>
    );
  }
}

export default ActionButton;
