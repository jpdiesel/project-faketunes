import { React, Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      redirect: false,
    };
    this.loginValidation = this.loginValidation.bind(this);
  }

  loginValidation = async (input) => {
    this.setState({ loading: true });
    await createUser({ name: input });
    this.setState({ loading: false, redirect: true });
  }

  render() {
    const { loading, redirect } = this.state;
    const {
      loginInput,
      enableLogin,
      handleChanger,
    } = this.props;

    return (
      <div data-testid="page-login">
        { loading ? <Carregando /> : null }
        { redirect ? <Redirect to="/search" /> : null }
        <input
          data-testid="login-name-input"
          type="text"
          dafaultvalue={ loginInput }
          id=""
          name="loginInput"
          onChange={ handleChanger }
          placeholder="Insira seu nome aqui"
        />
        <button
          data-testid="login-submit-button"
          type="submit"
          disabled={ enableLogin }
          onClick={ () => this.loginValidation(loginInput) }
        >
          {/* o onClick estava dando problema, dizendo que não era uma função, consegui resolver graças a esse link
          https://stackoverflow.com/questions/44833583/expected-onclick-listener-to-be-a-function-instead-got-type-object-react-redu */}
          Entrar
        </button>
      </div>
    );
  }
}

// Esse requisito foi feito com a ajuda do Gabriel Pinheiro, Samuel Gonçalves e do prof, o grande Braddock numa thread do Slack
// Também feito com a ajuda dos seguintes links:
// https://stackoverflow.com/questions/43556212/failed-form-proptype-you-provided-a-value-prop-to-a-form-field-without-an-on
// https://stackoverflow.com/questions/43230194/how-to-use-redirect-in-the-new-react-router-dom-of-reactjs/43230829#43230829

Login.propTypes = {
  enableLogin: PropTypes.bool,
  loginInput: PropTypes.func,
  handleChanger: PropTypes.func,
}.isRequired;
