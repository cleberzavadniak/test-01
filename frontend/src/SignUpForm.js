import React from 'react';


class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parent: props.parent,
      username: '',
      password: '',
      session: props.session,
      status: '',
      success: null
    };

    this.on_change_username = this.on_change_username.bind(this);
    this.on_change_password = this.on_change_password.bind(this);
    this.on_submit = this.on_submit.bind(this);
    this.go_back = this.go_back.bind(this);
  }

  on_change_username(event) {
    this.setState({
      username: event.target.value,
      status: ''
    });
  }

  on_change_password(event) {
    this.setState({
      password: event.target.value,
      status: ''
    });
  }

  on_submit(event) {
    event.preventDefault();

    var session = this.state['session'];
    var username = this.state['username'];
    var password = this.state['password'];

    var that = this;

    session.call('sign_up', [username, password]).then(function(response) {
      console.log(response);
      var message = response.kwargs.message;

      that.setState({
        confirmation_token: message.token,
        user_id: message.id,
        status: "",
        success: true
      });
    }).catch(function(error) {
      var exc_type = error.kwargs.exc_type;
      var msg = error.kwargs.message
      that.setState({status: exc_type + ': ' + msg});
    });
  }

  go_back(event) {
    event.preventDefault();
    this.state.parent.setState({signup: false});
  }

  render() {
    if (this.state.success) {
      return (
        <div>
          <h3>Nova conta criada com sucesso</h3>
          <p>
            Se essa aplicação fosse quente, você receberia
            um e-mail contendo um link mágico que serviria
            para confirmar sua conta.
          </p>
          <p>
            O token <strong>de confirmação</strong> seria o {this.state.confirmation_token}.
          </p>
          <p>
            Mas, por ora, basta você <a href='#' onClick={this.go_back}>clicar aqui</a> e
            experimentar logar-se usando as credenciais que acabou de criar.
          </p>
          <div className='status'>{this.state.status}</div>
        </div>
      )
    }

    return (
      <div>
        <h3>Criar nova conta</h3>
        <form onSubmit={this.on_submit}>
          <label>Usuário:</label>
          <input type='text' name='username' value={this.state.username} onChange={this.on_change_username} /><br/>
          <label>Senha:</label>
          <input type='password' name='password' value={this.state.password} onChange={this.on_change_password} /><br/>
          <input type='submit' name='submit' value='Criar' />
        </form>
        <div className='status'>{this.state.status}</div>
      </div>
    );
  }
}

export default SignUpForm;
