import React from 'react';


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      session: props.session,
      status: '',
      status2: ''
    };

    this.on_change_username = this.on_change_username.bind(this);
    this.on_change_password = this.on_change_password.bind(this);
    this.on_submit = this.on_submit.bind(this);
  }

  on_change_username(event) {
    this.setState({username: event.target.value, status: ''});
  }

  on_change_password(event) {
    this.setState({password: event.target.value, status: ''});
  }

  on_submit(event) {
    event.preventDefault();

    var session = this.state['session'];
    var username = this.state['username'];
    var password = this.state['password'];

    var that = this;

    session.call('authenticate', [username, password]).then(function(response) {
      var message = response.kwargs.message;

      that.setState({
        status: "Sucesso!",
        status2: "Token: " + message.token,
      });
    }).catch(function(error) {
      var exc_type = error.kwargs.exc_type;
      var msg = error.kwargs.message
      that.setState({status: exc_type + ': ' + msg});
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.on_submit}>
          <label>Usuário:</label>
          <input type='text' name='username' value={this.state.username} onChange={this.on_change_username} /><br/>
          <label>Senha:</label>
          <input type='password' name='password' value={this.state.password} onChange={this.on_change_password} /><br/>
          <input type='submit' name='submit' value='Entrar' />
        </form>
        <div className='status'>{this.state.status}</div>
        <div className='status2'>{this.state.status2}</div>
      </div>
    );
  }
}

export default LoginForm;
