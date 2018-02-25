import React from 'react';
import styled, { css } from 'react-emotion'

const Page = styled('div')`
  transition: all 0.18s cubic-bezier(0.4, 0.0, 0.2, 1);;
  opacity: ${props =>
		props.go ? '1' : '0'};
`

class AnimatedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { "go": false }
  }

  render() {
    return (<Page go={this.state.go}>{this.props.children}</Page>);
  }

  // Ugly hack, but necessary.
  // Only way to set the prop after the initial browser render
  // ComponentDidMount batches the render so the browser doesn't transition
  componentDidMount = () => {
    var component = this;
    setTimeout(function () {
       window.requestAnimationFrame(function() {
         component.setState({go: true})
       })
   }, 80)
  }

  // componentWillUnmount = () => {
  //   var component = this;
  //   setTimeout(function() {
  //     component.setState({go: false})
  //   }, 3000)
  // }
}


export default AnimatedPage;
