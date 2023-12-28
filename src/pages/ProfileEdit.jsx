import React from 'react';
import Header from '../components/Header';
import * as api from '../services/userAPI'
import Carregando from './Carregando';

export default class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loginInput: '',
      updateHeader: false,
      loading: false,
    }
    this.handleChanger = this.handleChanger.bind(this);
  }

  handleChanger = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  changeName = async (input) => {
    const { updateHeader } = this.state
    this.setState({ loading: true });
    const newName = { name: input };
    await api.updateUser(newName);
    if (updateHeader) {
      this.setState({ updateHeader: false });
    } else {
      this.setState({ updateHeader: true });
    }
    this.setState({ loading: false });
    this.setState({ loginInput: '' });
  }

  render() {
    const  { loginInput, updateHeader, loading } = this.state
    return (
      <div data-testid="page-profile-edit">
        { loading ? <Carregando /> : <Header key={ updateHeader } />}
        <div className='group'>
        <div className="input-container">
          <input
              data-testid="login-name-input"
              type="text"
              value={ loginInput }
              id="name"
              name="loginInput"
              onChange={ this.handleChanger }
              // placeholder="Insira seu nome aqui"
            />
            <label htmlFor="name">Trocar nome</label>
          <button
            className='login-button'
            type="submit"
            onClick={ () => this.changeName(loginInput) }
          >
            Salvar
          </button>
        </div>
        </div>  
      </div>
    );
  }
}
