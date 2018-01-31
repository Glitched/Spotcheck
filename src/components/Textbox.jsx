import React from 'react';
import styled, { css } from 'react-emotion'

const StyledInput = styled('input')`
  background: rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.4);
  border-radius: 4px;
  padding: 8px;
  color: white;
  outline: none;
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
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.onChange(this.props.id, event.target.value)
  }

  render() {
    return (
      this.props.autofocus ?
      <StyledInput value={this.state.value} onChange={this.handleChange} type={this.props.type} placeholder={this.props.placeholder} /> :
      <StyledInput value={this.state.value} onChange={this.handleChange} autoFocus={true} type={this.props.type} placeholder={this.props.placeholder} />
    );
  }
}

Textbox.defaultProps = { autofocus: false };

export default Textbox;
