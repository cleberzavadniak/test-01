import React from 'react';
import LoginForm from './LoginForm';

var autobahn = require('autobahn');


class AutobahnApp extends React.Component {
  constructor(props) {
    super(props);

    var connection = new autobahn.Connection({
      url: 'ws://127.0.0.1:9090/ws',
      realm: 'world',
      authmethods: ["ticket"],
      authid: 'frontend',
      onchallenge: this.onchallenge
    });

    this.state = {
      connected: false,
      connection: connection,
      status: 'Connecting',
      session: null,
    };

    var that = this;
    connection.onopen = function(session) {
      that.on_connect(session);
    }

    connection.open()
  }

  onchallenge(session, method, extra) {
    if (method === "ticket") {
      return 'sou um usuario';
    } else {
      console.log("don't know how to authenticate using '" + method + "'");
    }
  }

  on_connect(session) {
    this.setState({connected: true, status: "Connected", session: session});
  }

  render() {
    if (this.state.session) {
      return (
        <div>
          <LoginForm session={this.state.session} />
          Status: <span className="status">{this.state.status}</span>
        </div>
      );
    }

    return (
      <div>
        Status: <span className="status">{this.state.status}</span>
      </div>
    );
  }
}

export default AutobahnApp;
