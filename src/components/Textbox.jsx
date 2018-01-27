import React from 'react';
import styled, { css } from 'react-emotion'

const StyledInput = styled('input')`
  background: rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.4);
  border-radius: 4px;
  padding: 8px;
  color: white;
  font-family: Lato;
  font-weight: 400;
  font-size: 18px;
  text-transform: uppercase;
  transition: all 0.2s ease;
  margin: 8px auto;
  display: block;
  &:hover,
  &:focus {
    border: 1px solid #3CCDCC;
    box-shadow: 0 2px 11px 0 #41D1BE;
    outline-width: 0;
  }
`

class Textbox extends React.Component {
  render() {
    return (
      this.props.autofocus ?
      <StyledInput type={this.props.type} placeholder={this.props.placeholder} /> :
      <StyledInput autoFocus={true} type={this.props.type} placeholder={this.props.placeholder} />
    );
  }
}

Textbox.defaultProps = { autofocus: false };

export default Textbox;
