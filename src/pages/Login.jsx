import { React, Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';
import '../styles/Login.css'

const LOGIN_MINIMUN_CHAR = 3;

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      redirect: false,
      loginInput: '',
    };
    this.handleChanger = this.handleChanger.bind(this);
    this.enableLoginButton = this.enableLoginButton.bind(this);
    this.loginValidation = this.loginValidation.bind(this);
  }

  handleChanger = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  enableLoginButton = () => {
    const { loginInput } = this.state;
    if (loginInput.length >= LOGIN_MINIMUN_CHAR) {
      return false;
    } return true;
  }

  loginValidation = async (input) => {
    this.setState({ loading: true });
    await createUser({ name: input });
    this.setState({ loading: false, redirect: true });
  }

  render() {
    const {
      loading,
      redirect,
      loginInput,
    } = this.state;

    return (
      <div data-testid="page-login" className="group">
        <div className="input-container">
          { loading ? <Carregando /> : null }
          { redirect ? <Redirect to="/search" /> : null }
          <input
            data-testid="login-name-input"
            type="text"
            defaultValue={ loginInput }
            id="name"
            name="loginInput"
            onChange={ this.handleChanger }
            // placeholder="Insira seu nome aqui"
          />
          <label htmlFor="name">Nome</label>
          <button
            className="login-button"
            data-testid="login-submit-button"
            type="submit"
            disabled={ this.enableLoginButton() }
            onClick={ () => this.loginValidation(loginInput) }
          >
            {/* o onClick estava dando problema, dizendo que não era uma função, consegui resolver graças a esse link
            https://stackoverflow.com/questions/44833583/expected-onclick-listener-to-be-a-function-instead-got-type-object-react-redu */}
            Entrar
          </button>

        </div>
      </div>
    );
  }
}

// Esse requisito foi feito com a ajuda do Gabriel Pinheiro, Samuel Gonçalves e do prof, o grande Braddock numa thread do Slack
// Também feito com a ajuda dos seguintes links:
// https://stackoverflow.com/questions/43556212/failed-form-proptype-you-provided-a-value-prop-to-a-form-field-without-an-on
// https://stackoverflow.com/questions/43230194/how-to-use-redirect-in-the-new-react-router-dom-of-reactjs/43230829#43230829
