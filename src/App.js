import React, { Component } from 'react';
import './App.css';
import Start from './pages/Start'
import Pregame from './pages/Pregame'
import Wait from './pages/Wait'
import Players from './pages/Players'
import Guess from './pages/Guess'
import Countdown from './pages/Countdown'
import Socket from './components/Socket'
import { connect } from 'react-redux'

class App extends Component {
  serverDispatch = (action) => {
    console.log("Dispatching to socket");
    this.refs.ws.dispatchToServer(action);
    this.props.dispatchFromServer(action);
  };

  updateState = (stateDelta) => {
    console.log("UPDATING STATE")
    this.setState(stateDelta)
  }

  render() {
    return (
      <div className="App">
        {(() => {
          switch(this.props.appScreen.name) {
            case 'Start':
              return <Start
                serverDispatch={this.serverDispatch}
                updateSuperState={this.updateState}
                     />;
            case 'Pregame':
              return <Pregame
                serverDispatch={this.serverDispatch}
                username={this.props.username}
                game={this.props.game}
                     />;
            case 'Wait':
              return <Wait
                username={this.props.username}
                game={this.props.game}
                     />;
            case 'Guess':
              return <Guess
                serverDispatch={this.serverDispatch}
                username={this.props.username}
                game={this.props.game}
                     />;
            default:
              return null;
          }
        })()}
        <Socket ref="ws" reduxDispatch={this.props.dispatchFromServer}/>
      </div>
    );
  }
}

var mapStateToProps = function(state){
    return {appScreen:state.appScreen, username:state.username, game:state.game};
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchFromServer: action => {
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
