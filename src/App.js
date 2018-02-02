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
    this.refs.ws.dispatchToServer(action);
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
                username={this.state.username}
                game={this.state.code}
                     />;
            default:
              return null;
          }
        })()}



        {/*  */}
        <Socket ref="ws" reduxDispatch={this.props.dispatchFromServer}/>
        <span>{this.props.appScreen.name}</span>
      </div>
    );
  }
}

var mapStateToProps = function(state){
    return {appScreen:state.appScreen};
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchFromServer: action => {
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
