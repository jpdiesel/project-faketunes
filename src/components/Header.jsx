import { React, Component } from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';

// Este requisito foi feito com a ajuda do Lucas Camargo e do Victor Hugo na minha thread do Slack

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      name: '',
    };
  }

  async componentDidMount() {
    const username = await getUser().then((data) => data.name);
    this.loadUsername(username);
  }

  loadUsername = async (username) => {
    this.setState({ name: username, loading: false });
  }

  render() {
    const { loading, name } = this.state;
    return (
      <header data-testid="header-component">
        { loading
          ? <Carregando />
          : (
            <p data-testid="header-user-name">
              Bem vindo(a),
              {` ${name}`}
            </p>) }
        <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
        <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
      </header>
    );
  }
}
