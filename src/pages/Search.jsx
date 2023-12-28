import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';
import '../styles/Search.css'

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

  requestAPI = async (inputValue, clicked, event) => {
    if(event.key === 'Enter' || clicked === 'click') {
      this.setState({ searchInput: '' });
      this.setState({ loading: true });
      this.setState({ albuns: await searchAlbumsAPI(inputValue) });
      this.setState({ loading: false });
      this.setState({ singerName: inputValue });
      this.setState({ showSearchResult: true });
    }
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
            <div id="search-div">
              <input
                data-testid="search-artist-input"
                type="text"
                id="search-input"
                name="searchInput"
                defaultValue={ searchInput }
                onChange={ this.handleChanger }
                placeholder="Insira o nome do álbum ou artista aqui"
                onKeyDown={ (event) => this.requestAPI(searchInput, '', event) }
              />
              <button
                id="search-button"
                data-testid="search-artist-button"
                type="submit"
                disabled={ this.enableSearchButton() }
                onClick={ (event) => this.requestAPI(searchInput, 'click', event) }
              >
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 50 50">
                  <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
                </svg>
              </button>
            </div>)}
        {showSearchResult
          ? (
            <div>
              <p id="results">
                Resultado para álbuns de:
                {` ${singerName}`}
              </p>
              <div className='all-albums'>
              {albuns.length > 0
                ? albuns.map((albun, index) => (
                  <Link
                    data-testid={ `link-to-album-${albun.collectionId}` }
                    to={ `/album/${albun.collectionId}` }
                  >
                    <ul className="album" key={ index }>
                      <li>
                        <img
                          src={ albun.artworkUrl100 }
                          alt={ `Capa do álbum ${albun.collectionName}` }
                        />
                        <br />
                        <p className='album-title'>
                          {albun.collectionName}
                        </p>
                        <h6 className='artist-name'>
                          {albun.artistName}
                        </h6>
                      </li>
                    </ul>
                  </Link>
                ))
                : <p>Nenhum álbum foi encontrado</p> }
              </div>
            </div>)
          : null }
      </div>
    );
  }
}
