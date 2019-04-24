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

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeUsername(event) {
    this.setState({username: event.target.value, status: ''});
  }

  onChangePassword(event) {
    this.setState({password: event.target.value, status: ''});
  }

  onSubmit(event) {
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
        <form onSubmit={this.onSubmit}>
          <p>
            <label>Usuário:</label>
            <input type='text' name='username' value={this.state.username} onChange={this.onChangeUsername} />
          </p>
          <p>
            <label>Senha:</label>
            <input type='password' name='password' value={this.state.password} onChange={this.onChangePassword} />
            <br/>
            <small class='smooth'>Esqueceu sua senha? Entre em contato com o Suporte.</small>
          </p>
          <p><input type='submit' name='submit' value='Entrar' /></p>
        </form>
        <div className='status'>{this.state.status}</div>
        <div className='status2'>{this.state.status2}</div>
      </div>
    );
  }
}

export default LoginForm;
