import React, { Component } from 'react';
import './App.css';
import Start from './pages/Start'
import Pregame from './pages/Pregame'
import Players from './pages/Players'
import Countdown from './pages/Countdown'
import Socket from './components/Socket'
import { connect } from 'react-redux'

class App extends Component {
  serverDispatch = (action) => {
    console.log("Dispatching to socket");
    this.refs.ws.dispatch(action);
  };

  updateState = (stateDelta) => {
    console.log("UPDATING STATE")
    this.setState(stateDelta)
  }

  render() {
    return (
      <div className="App">
        <Start
          serverDispatch={this.serverDispatch}
          updateSuperState={this.updateState}
        />
        {/* <Pregame
          serverDispatch={this.serverDispatch}
          username={this.state.username}
          game={this.state.code}
        /> */}
        <Socket />
      </div>
    );
  }
}

var mapStateToProps = function(state){
    return {appScreen:state.appScreen};
};

connect(mapStateToProps)(App);

export default App;
