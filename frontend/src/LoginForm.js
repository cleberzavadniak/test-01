import React from 'react';


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {username: '', password: '', session: props.session};

    this.on_change_username = this.on_change_username.bind(this);
    this.on_change_password = this.on_change_password.bind(this);
    this.on_submit = this.on_submit.bind(this);
  }

  on_change_username(event) {
    this.setState({username: event.target.value});
  }

  on_change_password(event) {
    this.setState({password: event.target.value});
  }

  on_submit(event) {
    console.log(this.state);
    var session = this.state['session'];
    var username = this.state['username'];
    var password = this.state['password'];

    session.call('authenticate', [username, password]).then(function(response) {
      console.log(response);
    });
    event.preventDefault();
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
      </div>
    );
  }
}

export default LoginForm;
