import React from 'react';
import './AutobahnApp.css';

import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

var autobahn = require('autobahn');


class AutobahnApp extends React.Component {
  constructor(props) {
    super(props);

    var connection = new autobahn.Connection({
      url: 'ws://127.0.0.1:9090/ws',
      realm: 'world',
      authmethods: ["ticket"],
      authid: 'frontend',
      onchallenge: this.onChallenge
    });

    var that = this;
    connection.onopen = function(session) {
      that.onConnect(session);
    }

    this.state = {
      connected: false,
      connection: connection,
      status: 'Connecting',
      session: null,
      signup: false
    };

    this.showSignupForm = this.showSignupForm.bind(this);

    connection.open()
  }

  onChallenge(session, method, extra) {
    if (method === "ticket") {
      return 'sou um usuario';
    } else {
      console.log("don't know how to authenticate using '" + method + "'");
    }
  }

  onConnect(session) {
    this.setState({connected: true, status: "Connected", session: session});
  }

  showSignupForm(event) {
    event.preventDefault();
    this.setState({signup: true});
  }

  render() {
    if (this.state.connected) {
      if (this.state.signup) {
        return (
          <div className='autobahn-app connected'>
            <h2>Nova plataforma de cotação de apólices</h2>
            <SignUpForm session={this.state.session} parent={this} />
          </div>
        );
      }

      return (
        <div className='autobahn-app connected'>
          <h2>Nova plataforma de cotação de apólices</h2>
          <LoginForm session={this.state.session} />
          <small><a href='#' onClick={this.showSignupForm}>Sou novo aqui</a></small>
        </div>
      );
    }

    return (
      <div className='autobahn-app disconnected'>
        <h2>Nova plataforma de cotação de apólices</h2>
        <p>Conectando...</p>
      </div>
    );
  }
}

export default AutobahnApp;
