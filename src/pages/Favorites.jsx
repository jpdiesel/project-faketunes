import React from 'react';
import Header from '../components/Header';
import * as api from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

export default class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteSongs: [],
      loading: false,
    };
    this.loadFavSongs = this.loadFavSongs.bind(this);
    this.handleChanger = this.handleChanger.bind(this);
    this.removeFavSong = this.removeFavSong.bind(this);
  }

  handleChanger = ({ target }) => {
    const { name } = target;
    const value = target.checked;
    this.setState({
      [name]: value,
    });
  }

  componentDidMount() {
    this.loadFavSongs()
  }

  loadFavSongs = async () => {
    this.setState({ loading: true });
    const songs =  await api.getFavoriteSongs();
    this.setState({ favoriteSongs: songs });
    this.setState({ loading: false })
  }

  removeFavSong = async (music) => {
    this.setState({ loading: true });
    await api.removeSong(music);
    this.loadFavSongs();
    this.setState({ loading: false })
  }

  render() {
    const {
      favoriteSongs,
      loading
    } = this.state
    const styles = { enableBackground: "new 0 0 512 512" } 
    return (
      <div data-testid="page-favorites">
        <Header />
        <div className='song-list'>
          { loading ? <Carregando/> : favoriteSongs.map((music, index) => (
            <div className='song' key={ index }>
              <p>{`${music.trackName} - ${music.artistName}`}</p>
              <audio id="song-player" src={music.previewUrl} controls>
                <track kind="captions"/>
              </audio>
              <div
                id="music-checkbox"
                name={ index }
                onChange={ this.handleChanger }
                onClick={ () => this.removeFavSong(music) }
              >
                <svg height="30px" id="Layer_1" style={ styles } version="1.1" viewBox="0 0 512 512" width="50px" space="preserve" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                  <path d="M340.8,83C307,83,276,98.8,256,124.8c-20-26-51-41.8-84.8-41.8C112.1,83,64,131.3,64,190.7c0,27.9,10.6,54.4,29.9,74.6  L245.1,418l10.9,11l10.9-11l148.3-149.8c21-20.3,32.8-47.9,32.8-77.5C448,131.3,399.9,83,340.8,83L340.8,83z"/>
                </svg>
              </div>  
            </div>
          ))}
          { favoriteSongs[0] ? null 
          : 
          <div className='no-songs-container'>
            <p className="no-songs-text">Sem músicas favoritas por enquanto</p>
            <svg height="150px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M175.1 240c17.8 0 32.09-14.25 32.09-32s-14.29-32-32.09-32c-17.68 0-31.97 14.25-31.97 32S158.3 240 175.1 240zM170.4 274.8c-11.38 15.38-36.33 50.63-36.33 68.13C134.1 365.6 152.8 384 175.1 384c23.25 0 42.02-18.38 42.02-41.13c0-17.5-24.95-52.75-36.33-68.13C178.7 271.1 173.2 271.1 170.4 274.8zM336 176c-17.8 0-32.09 14.25-32.09 32s14.29 32 32.09 32c17.68 0 31.97-14.25 31.97-32S353.7 176 336 176zM263.1 304c-13.2 0-23.98 10.75-23.98 24S250.8 352 263.1 352c23.86 0 46.26 10.5 61.64 28.75c8.113 9.875 23.13 12 33.79 3.125c10.17-8.5 11.62-23.62 3.027-33.75C337.1 320.8 302.1 304 263.1 304zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464z"/>
            </svg>
          </div>
          } 
        </div>
      </div>
    );
  }
}


