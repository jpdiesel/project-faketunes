import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';

const SEARCH_MINIMUN_CHAR = 2;

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      showSearchResult: false,
      searchInput: '',
      singerName: '',
      albuns: [],
    };
    this.enableSearchButton = this.enableSearchButton.bind(this);
    this.handleChanger = this.handleChanger.bind(this);
    this.requestAPI = this.requestAPI.bind(this);
  }

  handleChanger = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  enableSearchButton = () => {
    const { searchInput } = this.state;
    if (searchInput.length >= SEARCH_MINIMUN_CHAR) {
      return false;
    } return true;
  }

  requestAPI = async (inputValue) => {
    this.setState({ searchInput: '' });
    this.setState({ loading: true });
    this.setState({ albuns: await searchAlbumsAPI(inputValue) });
    this.setState({ loading: false });
    this.setState({ singerName: inputValue });
    this.setState({ showSearchResult: true });
  }

  render() {
    const {
      albuns,
      singerName,
      loading,
      showSearchResult,
      searchInput,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading
          ? <Carregando />
          : (
            <div>
              <input
                data-testid="search-artist-input"
                type="text"
                id=""
                name="searchInput"
                defaultValue={ searchInput }
                onChange={ this.handleChanger }
                placeholder="Insira o nome do álbum ou artista aqui"
              />
              <button
                data-testid="search-artist-button"
                type="submit"
                disabled={ this.enableSearchButton() }
                onClick={ () => this.requestAPI(searchInput) }
              >
                Pesquisar
              </button>
            </div>)}
        {showSearchResult
          ? (
            <div>
              <p>
                Resultado de álbuns de:
                {` ${singerName}`}
              </p>
              {albuns.length > 0
                ? albuns.map((albun, index) => (
                  <ul key={ index }>
                    <li>
                      <img
                        src={ albun.artworkUrl100 }
                        alt={ `Capa do álbum ${albun.collectionName}` }
                      />
                      <br />
                      <Link
                        data-testid={ `link-to-album-${albun.collectionId}` }
                        to={ `/album/${albun.collectionId}` }
                      >
                        {albun.collectionName}
                      </Link>
                      <h6>
                        {albun.artistName}
                      </h6>
                    </li>
                  </ul>
                ))
                : <p>Nenhum álbum foi encontrado</p> }
            </div>)
          : null }
      </div>
    );
  }
}
