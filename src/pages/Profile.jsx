import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <Link to="/profile/edit">Editar Perfil</Link>
      </div>
    );
  }
}
