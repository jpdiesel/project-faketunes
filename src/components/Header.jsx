import { React, Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <header data-testid="header-component">
        <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
        <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
      </header>
    );
  }
}
