import React, { Component } from 'react';
import { connect } from 'react-redux'

class Socket extends React.Component {

  constructor(props) {
    super(props);
    this.state = { actions: [] };
  }

  componentDidMount(){
  	this.connection = new WebSocket('ws://localhost:8999');
    this.connection.onmessage = evt => {
      const parsedAction = JSON.parse(evt.data);
    	this.setState({
      	actions : this.state.actions.concat([ parsedAction ]),
        lastAction: parsedAction
      })
      this.props.reduxDispatch(parsedAction);
    };
  };

  dispatchToServer(action) {
    console.log("Dispatching to server");
    this.connection.send(JSON.stringify(action));
    console.log(action)
  };

    // for testing purposes: sending to the echo service which will send it back back
    // setInterval( _ =>{
    // 	this.connection.send( Math.random() )
    // }, 2000 )

  render() {
    // slice(-5) gives us the five most recent messages
    return <ul className="debug">{ this.state.actions.map(function(action, index) {
      return <li key={index}>
        {action.type}
      </li>;
    })} </ul>;
  };
};

export default Socket;
