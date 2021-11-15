import { React, Component } from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
// import { Route } from 'react-router';
// import Search from './Search';
// import { createUser } from '../services/userAPI';

export default class Login extends Component {
  // constructor() {
  //   super();
  // }

  loginValidation = () => {

  }

  render() {
    const {
      loginInput,
      enableLogin,
      onInputChange,
    } = this.props;

    return (
      <div data-testid="page-login">
        <input
          data-testid="login-name-input"
          type="text"
          value={ loginInput }
          id=""
          name="loginInput"
          onChange={ onInputChange }
          placeholder="Insira seu nome aqui"
        />
        <button
          data-testid="login-submit-button"
          type="submit"
          disabled={ enableLogin }
          onClick={ this.loginValidation }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  enableLogin: PropTypes.bool,
  loginInput: PropTypes.func,
  onInputChange: PropTypes.func,
}.isRequired;
