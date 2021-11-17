import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';

export default class Search extends React.Component {
  render() {
    const {
      enableSearchButton,
      searchInput,
      handleChanger,
    } = this.props;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          data-testid="search-artist-input"
          type="text"
          id=""
          name="searchInput"
          defaultValue={ searchInput }
          onChange={ handleChanger }
          placeholder="Insira o nome do álbum ou artista aqui"
        />
        <button
          data-testid="search-artist-button"
          type="submit"
          disabled={ enableSearchButton }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

Search.propTypes = {
  enableSearchButton: propTypes.bool,
  searchInput: propTypes.func,
  onInputChange: propTypes.func,
}.isRequired;
